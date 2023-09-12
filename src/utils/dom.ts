/**
 * 获取实际尺寸
 * @param x
 * @returns
 */
export const refineSize = (x) => {
  return (x / 375) * window.innerWidth;
};
