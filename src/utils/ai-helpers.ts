/**
 * AI提示词公共工具函数
 * 用于处理组件modifyTptJson中的通用逻辑
 */

/**
 * 安全执行modifyTptJson函数
 * @param fn 要执行的函数
 * @param component 组件配置对象
 * @param componentName 组件名称（用于错误日志）
 */
export function safeModifyTptJson(
  fn: (component: any) => void,
  component: any,
  componentName: string
): void {
  try {
    fn(component);
  } catch (error) {
    console.error(`[AI] ${componentName} modifyTptJson error:`, error);
  }
}

/**
 * 转换表单输入组件的样式选择器
 * 适用于formInput、formPassword等输入类组件
 * @param component 组件配置对象
 * @param selectors 选择器映射配置
 */
export function transformFormInputSelectors(
  component: any,
  selectors: {
    input?: string[];
    text?: string[];
    placeholder?: string[];
  } = {}
): void {
  const defaultSelectors = {
    input: [".mybricks-input", ".mybricks-h5Input .taroify-native-input"],
    text: [".mybricks-input", ".mybricks-h5Input .taroify-native-input"],
    placeholder: [
      ".mybricks-input .taroify-input__placeholder",
      ".mybricks-h5Input .taroify-native-input::placeholder",
    ],
    ...selectors,
  };

  component?.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === ".input" && defaultSelectors.input) {
      style.selector = defaultSelectors.input;
    }
    if (style.selector === ".text" && defaultSelectors.text) {
      style.selector = defaultSelectors.text;
    }
    if (style.selector === ".placeholder" && defaultSelectors.placeholder) {
      style.selector = defaultSelectors.placeholder;
    }
  });
}

/**
 * 转换表单选择组件的样式选择器
 * 适用于formSelect等选择类组件
 * @param component 组件配置对象
 */
export function transformFormSelectSelectors(component: any): void {
  const componentId = component?.id;

  component?.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === ".input") {
      style.selector = [".mybricks-select", ".mybricks-h5Select"];
    }
    if (style.selector === ".text") {
      style.selector = `#a-${componentId} .mybricks-input`;
    }
    if (style.selector === ".placeholder") {
      style.selector = `#a-${componentId} .mybricks-placeholder`;
    }
  });
}

/**
 * 转换复选框/单选框组件的样式选择器
 * 适用于formCheckbox、formRadio组件
 * @param component 组件配置对象
 * @param type 'checkbox' | 'radio'
 */
export function transformCheckableSelectors(
  component: any,
  type: "checkbox" | "radio"
): void {
  const labelSelector =
    type === "checkbox"
      ? ".taroify-checkbox__label"
      : ".mybricks-label";

  component?.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === ".title-active") {
      style.selector = `.mybricks-active ${labelSelector}`;
    }
    if (style.selector === ".title-inactive") {
      style.selector = `.mybricks-inactive ${labelSelector}`;
    }
    if (style.selector === ".icon-active" || style.selector === ".icon-acitive") {
      style.selector = ".mybricks-active .taroify-icon";
      style.css = {
        ...style.css,
        borderRadius: style.css?.borderRadius ?? "3px",
      };
    }
    if (style.selector === ".icon-inactive") {
      style.selector = ".mybricks-inactive .taroify-icon";
      style.css = {
        ...style.css,
        borderRadius: style.css?.borderRadius ?? "3px",
      };
    }
  });
}

/**
 * 初始化组件样式数组
 * @param component 组件配置对象
 * @param defaultStyle 默认样式配置
 */
export function initStyleAry(
  component: any,
  defaultStyle: { selector: string; css: Record<string, any> }
): void {
  if (!component?.style) {
    component.style = {};
  }

  let hasConfigStyle = false;

  component.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === defaultStyle.selector) {
      hasConfigStyle = true;
    }
  });

  if (!hasConfigStyle) {
    if (!Array.isArray(component.style?.styleAry)) {
      component.style.styleAry = [];
    }
    component.style.styleAry.push({
      selector: defaultStyle.selector,
      css: { ...defaultStyle.css },
    });
  }
}

/**
 * 处理文本组件居中的宽度调整
 * @param component 组件配置对象
 */
export function handleTextCenterAlign(component: any): void {
  const isConfigCenter = component?.data?.styleAry?.some(
    (s: any) => s.css?.textAlign === "center"
  );

  // 配置了center代表肯定要居中，此时不能配置非100%，不然不会居中
  if (isConfigCenter && component?.layout?.width !== "100%") {
    if (!component.layout) {
      component.layout = {};
    }
    component.layout.width = "100%";
  }

  // 自动设置行高
  if (component?.style?.styleAry) {
    component.style.styleAry.forEach((item: any) => {
      if (!item.css) {
        item.css = {};
      }
      if (item.css?.fontSize) {
        const realFontSize =
          String(item.css.fontSize)?.indexOf("px") > -1
            ? parseFloat(item.css.fontSize)
            : item.css.fontSize;
        if (realFontSize > 14) {
          item.css.lineHeight = `${realFontSize + 6}px`;
        }
      }
    });
  }
}

/**
 * 转换搜索框组件的样式选择器
 * @param component 组件配置对象
 */
export function transformSearchBarSelectors(component: any): void {
  component?.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === ".searchBar") {
      style.selector = ".mybricks-searchBar";
    }
    if (style.selector === ".text") {
      style.selector = ".mybricks-searchBar-input .taroify-native-input";
    }
    if (style.selector === ".placeholder") {
      style.selector =
        ".mybricks-searchBar-input .taroify-native-input::placeholder";
    }
    if (style.selector === ".button") {
      style.selector = ".mybricks-searchButton";
    }
  });
}

/**
 * 转换标签页组件的样式选择器
 * @param component 组件配置对象
 */
export function transformTabsSelectors(component: any): void {
  let configHeight: any;
  const componentId = component?.id;

  component?.style?.styleAry?.forEach?.((style: any) => {
    if (style.selector === ".taroify-tabs") {
      style.selector = ".taroify-tabs__wrap .taroify-tabs__wrap__scroll";
      if (style?.css?.height) {
        configHeight = style?.css?.height;
      }
    }
    if (style.selector === ".taroify-tabs__tab") {
      style.selector = `.taroify-tabs__tab:not(.taroify-tabs__tab--active):not(#{id} *[data-isslot="1"] *)`;
    }
    if (style.selector === ".taroify-tabs__tab--active") {
      style.selector = `.taroify-tabs__tab--active:not(#{id} *[data-isslot="1"] *)`;
    }
    if (style.selector === ".taroify-tabs__line") {
      style.selector = `.taroify-tabs__line:not(#{id} *[data-isslot="1"] *)`;
    }
  });

  if (configHeight) {
    component.style.styleAry.push({
      selector: ".taroify-tabs__wrap",
      css: {
        height: configHeight,
      },
    });
  }
}
