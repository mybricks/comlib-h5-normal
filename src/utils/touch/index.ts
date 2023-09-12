import { useEffect, useState, useRef } from 'react';
import Touch from './touch';

const useDidMount = () => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
};

export const useTouch = (ele, opt: TOption) => {
  const didMount = useDidMount();
  const touchRef = useRef<any>(null);

  useEffect(() => {
    // 手动更新options，防止options改一下就要重新new
    if (touchRef.current && touchRef.current.props) {
      touchRef.current.props = opt;
    }
  }, [opt]);

  useEffect(() => {
    if (!ele) return;
    const th = new Touch(ele, opt);
    touchRef.current = th;
    return () => {
      th.destroy();
    };
  }, [didMount]);
};
