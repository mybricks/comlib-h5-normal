import { useEffect } from 'react';

/** 卡片数据变量名 */
const CARD_VARIABLE_NAME = `cardData`;
/** 存储卡片内部组件数据字段名 */
const FIELD_VARIABLE_NAME = `$cardFieldName$`;

/**
 * 卡片编辑器生成
 * @returns
 */
export const createCardEditorItem = () => {
  return {
    title: '卡片元素配置',
    items: [
      {
        title: '绑定字段名',
        type: 'text',
        options: {
          placeholder: '为空表示不绑定',
        },
        value: {
          // 组件内部可以通过data.field_variable_name拿到自己在cardData中的字段，从而获得对应元素数据
          // 为空表示不绑定
          get({ data }) {
            return data[FIELD_VARIABLE_NAME] || '';
          },
          set({ data }, value) {
            data[FIELD_VARIABLE_NAME] = value;
          },
        },
      },
    ],
  };
};

/**
 * 绑定卡片原子组件的数据
 * @param cardVariableName 卡片数据变量名，卡片应用内使用固定值，其他地方使用，可用该变量自定义
 * @param targetFieldName 绑定的卡片字段数据最终影响到data上的目标字段
 * @returns
 */
export const createUseCardField = (cardVariableName: string) => (data: any, inputs: any, targetFieldName: string) => {
  useEffect(() => {
    if (typeof data[targetFieldName] === 'undefined') {
      throw new Error('targetFieldName必须是data上的已有字段');
    }
    inputs?.install((installData) => {
      const cardData = installData?.[cardVariableName];
      if (typeof cardData === 'undefined') {
        throw new Error(`没有找到卡片变量: ${cardVariableName}`);
      }
      const fieldName = data?.[FIELD_VARIABLE_NAME] || '';
      if (!fieldName) return;
      const fieldData = cardData?.[fieldName];
      data[targetFieldName] = fieldData;
    });
  }, []);
};

export const useCardFeild = createUseCardField(CARD_VARIABLE_NAME);
