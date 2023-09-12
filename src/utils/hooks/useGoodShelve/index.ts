import { useCallback, useEffect, useRef, useState } from 'react';
import { ICommodity } from './constant';
import { mockCommodityList } from './mock';
import { Unique } from '../../unique';
import { getDataByDeliveryPackId, getRankCommondityData } from './service';
import { parseModuleAndActionFromTitle } from '../../track';
import { useModuleExpose } from '../useModuleExpose';
import openPage from '../../event/openPage';

export enum STATUS {
  INITIAL = 'initial',
  LOADING = 'loading',
  AVAILABLE = 'available',
  NO_MORE = 'noMore',
  EMPTY = 'empty',
  ERROR = 'error',
}

const useGoodShelve = ({
  deliveryPack: _deliveryPack,
  carrierType,
  title,
  env,
}): {
  itemList: ICommodity[];
  status: STATUS;
  firstRequest: Boolean;
  onPress: (item: ICommodity, index: number) => void;
  onExpose: (item: ICommodity, index: number) => void;
  loadMore: () => void;
  switchTab: (tabId: any) => void;
  loadRanking: (rankingId, size: any) => void;
} => {
  const [deliveryPack, setDeliveryPack] = useState(_deliveryPack);

  const [itemList, setItemList] = useState<ICommodity[]>(env.edit ? mockCommodityList : []);

  const [status, setStatus] = useState<STATUS>(STATUS.INITIAL);
  const [firstRequest, setFirstRequest] = useState(true);

  const uniqueRef = useRef(new Unique('itemId'));

  //接受参数用于获取指定的选投包id列表
  const fetchData = useCallback(
    async (firstRequest: boolean, deliveryPackId: any) => {
      if (firstRequest) {
        uniqueRef.current.clear();
      }
      setFirstRequest(firstRequest);
      setStatus(STATUS.LOADING);
      const { value, error } = await getDataByDeliveryPackId(
        {
          id: deliveryPackId,
          carrierType,
          size: 6,
          firstRequest,
        },
        env,
      );

      if (error) {
        setStatus(STATUS.ERROR);
        setItemList(env.edit!! ? mockCommodityList : []);

        return;
      }

      let { itemList: newItemList = [], noMore } = value;
      newItemList = uniqueRef.current.filter(newItemList);

      if (firstRequest) {
        uniqueRef.current.clear();
        setItemList(newItemList);
      } else {
        setItemList([...itemList, ...newItemList]);
      }

      if (noMore) {
        setStatus(STATUS.NO_MORE);
      } else {
        setStatus(STATUS.AVAILABLE);
      }
    },
    [itemList, deliveryPack, carrierType],
  );

  const { moduleName, actionName } = parseModuleAndActionFromTitle(title);

  useModuleExpose(moduleName, !!itemList.length, env.weblog);

  const onExpose = useCallback(
    (item: ICommodity, index: number) => {
      if (!item?.itemId) {
        return;
      }
      env.weblog.collect('SHOW', {
        action: 'OP_ACTIVITY_COMMODITY_CARD',
        params: {
          commodity_id: item.itemId,
          screen_id: deliveryPack?.screen_id,
          release_id: deliveryPack?.release_id,
          action_name: actionName,
          module_name: moduleName,
          pos: index + 1,
          server_exp_tag: item.serverExpTag,
        },
      });
    },
    [moduleName, actionName, deliveryPack],
  );

  const onPress = useCallback(
    (item: ICommodity, index: number) => {
      if (!item?.itemId) {
        return;
      }

      env?.weblog?.collect?.('CLICK', {
        action: 'OP_ACTIVITY_COMMODITY_CARD',
        params: {
          commodity_id: item.itemId,
          action_name: actionName,
          module_name: moduleName,
          screen_id: deliveryPack?.screen_id,
          release_id: deliveryPack?.release_id,
          pos: index + 1,
          server_exp_tag: item.serverExpTag,
        },
      });

      if (env.runtime) openPage(item.itemUrl, env.yoda);
    },
    [moduleName, actionName, deliveryPack],
  );

  //点击加载更多按钮
  const loadMore = () => {
    if (status === STATUS.LOADING) {
      return;
    }
    fetchData(false, deliveryPack.deliveryPackId);
  };

  //切换tab
  const switchTab = (deliveryPack) => {
    setItemList([]);
    setDeliveryPack(deliveryPack);
    fetchData(true, deliveryPack.deliveryPackId);
  };

  //榜单数据获取
  const loadRanking = async (rankingId, size) => {
    let { value, error } = await getRankCommondityData(rankingId, env, size);
    setItemList(value);
  };

  return {
    itemList,
    status,
    firstRequest,
    onExpose,
    onPress,
    loadMore,
    switchTab,
    loadRanking,
  };
};

export default useGoodShelve;
