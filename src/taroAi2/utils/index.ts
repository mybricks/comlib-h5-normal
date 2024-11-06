export { isNumber } from './type';


export function compareIO(previousValue, currentValue): any {
  // const previousIdSet = new Set(previousValue.map(item => item.id));
  // const currentIdSet = new Set(currentValue.map(item => item.id));

  // const deleteIds = [...previousIdSet].filter(id => !currentIdSet.has(id));
  // const addIdsMap = [...currentIdSet].reduce((acc: any, id: any) => {
  //     if (!previousIdSet.has(id)) {
  //       acc[id] = true
  //     };
  //     return acc;
  // }, {});

  const previousIdSet = new Set(previousValue.map(item => item.key));
  const currentIdSet = new Set(currentValue.map(item => item.key));

  const deleteIds = [...previousIdSet].filter(key => !currentIdSet.has(key));
  const addIdsMap = [...currentIdSet].reduce((acc: any, key: any) => {
      if (!previousIdSet.has(key)) {
        acc[key] = true
      };
      return acc;
  }, {});

  return { deleteIds, addIdsMap };
}
