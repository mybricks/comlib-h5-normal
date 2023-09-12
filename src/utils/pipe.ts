import { isArray, isFunction } from './core';

type TFn = (x: any) => any;
const pipe = (...fns: TFn[]) => {
  if (fns.length === 0) return (x) => x;
  return fns.reduce((res, fn) => {
    return (x) => fn(res(x));
  });
};
export default pipe;
