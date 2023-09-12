// 按照/切割模块
const parseModuleAndActionFromTitle = (title: string) => {
  const index = title.indexOf('/');
  if (index === -1) {
    return {
      moduleName: title,
      actionName: title,
    };
  } else {
    return {
      moduleName: title.substring(0, index),
      actionName: title.substring(index + 1),
    };
  }
};

export { parseModuleAndActionFromTitle };
