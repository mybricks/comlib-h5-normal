import React, { useEffect } from 'react';
import { uuid } from '..';

class DisabledStyle {
  styleEle;
  styleEleId = `for_disable_focus_${uuid()}`;

  constructor({ root, id1, id2 }) {
    const _styleEle = document.createElement('style');
    _styleEle.id = this.styleEleId;
    _styleEle.innerText = `
    #${id1} #${id2} .disabled-area, #${id1} #${id2} .disabled-area * {
      pointer-events: none !important;
    }
    .disabled-area {
      opacity: 0.4;
      filter: blur(0.8px);
    }
    `;
    
    root.appendChild(_styleEle);
    this.styleEle = _styleEle;
  }

  unmount() {
    if (this.styleEle) {
      try {
        // 尝试直接移除元素
        this.styleEle.remove();
      } catch (e) {
        // 降级处理：如果 remove 不可用，使用父节点移除
        this.styleEle.parentNode?.removeChild(this.styleEle);
      }
      this.styleEle = null;
    }
  }
}

export const useDisabledArea = () => {
  // 直接生成 id
  const id1 = uuid();
  const id2 = uuid();
  
  useEffect(() => {
    const shadowDom = document.getElementById('_mybricks-geo-webview_');
    const shadowRoot = shadowDom?.shadowRoot;
    
    if (!shadowRoot) {
      console.warn('找不到shadowroot');
      return;
    }

    const disabledStyle = new DisabledStyle({ 
      root: shadowRoot,
      id1,
      id2
    });

    // 清理函数
    return () => {
      disabledStyle.unmount();
    }
  }, []);

  // 返回一个组件
  const DisabledArea = ({ children }) => (
    <div id={id1}>
      <div id={id2}>
        {children}
      </div>
    </div>
  );

  return DisabledArea;
}