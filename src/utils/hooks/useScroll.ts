import React, { useEffect, useMemo } from 'react';
import { useComEnv } from '../../utils/context';
import { throttle } from '../../utils';

const SAFE_DISTANCE = 300;

export interface ScrollListProps {
  loadMore: () => void;
  canLoad: boolean;
  scrollParent?: React.MutableRefObject<any>;
}

export default function useScroll({ loadMore, canLoad, scrollParent }: ScrollListProps) {
  const { env } = useComEnv();
  const onScroll = useMemo(() => {
    function _onScroll() {
      if (scrollParent?.current) {
        env?.lazyLoadImage();
      }

      if (!canLoad) {
        return;
      }

      let scrollTop, clientHeight, scrollHeight;
      if (scrollParent?.current) {
        scrollTop = scrollParent?.current.scrollTop;
        clientHeight = scrollParent?.current.clientHeight;
        scrollHeight = scrollParent?.current.scrollHeight;
      } else {
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
        clientHeight = window.innerHeight;
        scrollHeight = document.documentElement.scrollHeight;
      }

      if (scrollTop + clientHeight + SAFE_DISTANCE >= scrollHeight) {
        loadMore();
      }
    }
    return throttle(_onScroll, 300);
  }, [canLoad, loadMore, scrollParent]);

  useEffect(() => {
    if (scrollParent?.current) {
      scrollParent.current.addEventListener('scroll', onScroll, false);
      return () => {
        scrollParent.current?.removeEventListener?.('scroll', onScroll, false);
      };
    } else {
      window.addEventListener('scroll', onScroll, false);
      return () => {
        window.removeEventListener('scroll', onScroll, false);
      };
    }
  }, [scrollParent, onScroll]);
}
