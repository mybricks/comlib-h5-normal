import { mockCommodityList } from './mock';
import { ICommodity } from './constant';

interface IParams {
  id: string;
  carrierType: string;
  firstRequest: boolean;
  size?: number;
  intrudeIdListFromUrl?: boolean;
  idList?: number[];
}

//内部使用的方法
const fetchDataByDeliveryPackId = (params: IParams, env) => {
  return env.ajax(
    '/rest/h5/activity/traffic/c/delivery/resource/h5',
    {
      method: 'post',
      data: {
        pageCode: 'dailyMainPage',
        resource: [
          {
            resourceCode: 'itemListDailyCode',
            param: {
              // channel,
              size: params.size,
              deliveryPackId: params.id,
              firstRequest: params.firstRequest,
              carrierType: params.carrierType,
              idList: params.idList,
              photoPage: 'mfzspkp',
              // pageCode: env.getPageCode(),
            },
          },
        ],
      },
    },
    true,
  );
};
// 新版接口
export async function getDataByDeliveryPackId(
  params: IParams,
  env: any,
): Promise<
  Result<
    {
      itemList: ICommodity[];
      noMore: boolean;
    },
    string
  >
> {
  const { size = 6, id = '', firstRequest = false, carrierType } = params;
  const isEdit = !!env.edit;

  // mock数据，用于本地调试
  // return {
  //   value: {
  //     itemList: mockCommodityList.map((item) => {
  //       item.itemId = Math.random();
  //       item.itemName = Math.random().toString();
  //       return item;
  //     }),
  //     noMore: false,
  //   },
  //   error: null,
  // };

  if (!id) {
    return {
      value: {
        itemList: isEdit ? mockCommodityList : [],
        noMore: true,
      },
      error: '请选择商品投放包Id，当前为模拟数据',
    };
  }

  let idList: number[] = [];
  // if (intrudeIdListFromUrl && urlIdList) {
  //   try {
  //     urlIdList = decodeURIComponent(urlIdList)
  //     idList = urlIdList.split(',').map(Number)
  //   } catch (e) { }
  // }

  const data = await fetchDataByDeliveryPackId(
    {
      id,
      idList,
      carrierType,
      firstRequest,
      size,
    },
    env,
  );

  const itemList = data?.data?.itemListDailyCode?.extInfo?.itemList || [];
  // 目前后端接口返回字段为hasMore，其实是noMore
  const noMore = data?.data?.itemListDailyCode?.extInfo?.hasMore;

  if (data.result !== 1 || !Array.isArray(itemList)) {
    return {
      value: {
        itemList: isEdit ? mockCommodityList : [],
        noMore: true,
      },
      error: '接口返回数据格式出错，当前显示为模拟数据',
    };
  }

  if (itemList.length === 0 && firstRequest) {
    return {
      value: {
        itemList: isEdit ? mockCommodityList : [],
        noMore: true,
      },
      error: '接口返回数据为空，当前显示为模拟数据，请查看投放包设置！',
    };
  }

  return {
    value: {
      itemList,
      noMore: noMore || !itemList.length, // 后端接口不稳定，用返回结果来再次确认
    },
    error: null,
  };
}

//榜单商品列表数据获取

const getUrlParam = (value: string) => new URL(location.href).searchParams.get(value) || '';
const channel = getUrlParam('entry_src');
const useMock = getUrlParam('use_mock');

/**
 * 面向外部的方法
 * 根据编辑时还是运行时，返回不同数据，并注入error信息，用于反馈给操作人员
 * 信息一般用于debug，此处搭建方式可用于显示在组件ui上
 * @param params
 * @param env
 * @returns
 */
export const getRankCommondityData = async (rankingId, env, size): Promise<Result<ICommodity[], string>> => {
  const isEdit = !!env.edit;
  if (useMock) {
    return {
      value: mockCommodityList,
      error: '正在使用url的use_mock参数，当前为模拟数据',
    };
  }


  const data = await fetchDataByRankingId(rankingId, env, size);

  const itemList = data?.data?.itemRankDailyCode?.extInfo?.itemList;
  if (data.result !== 1 || !Array.isArray(itemList)) {
    return {
      value: isEdit ? mockCommodityList : [],
      error: '接口返回数据格式出错，当前显示为模拟数据',
    };
  }
  if (itemList.length === 0) {
    return {
      value: isEdit ? mockCommodityList : [],
      error: '接口返回数据为空，当前显示为模拟数据',
    };
  }
  return {
    value: itemList,
    error: null,
  };
};

//内部使用的方法
async function fetchDataByRankingId(rankingId, env: any, size) {
  // const { id, size } = params;
  return env.ajax(
    '/rest/h5/activity/traffic/c/delivery/resource/h5',
    {
      method: 'post',
      data: {
        pageCode: 'dailyMainPage',
        resource: [
          {
            resourceCode: 'itemRankDailyCode',
            param: {
              channel,
              size: size === 0 || size === undefined || size > 20 ? 20 : size,
              // size: size,
              deliveryPackId: rankingId,
              photoPage: 'mfzspkp',
              pageCode: env.getPageCode(),
            },
          },
        ],
      },
    },
    true,
  );
}
