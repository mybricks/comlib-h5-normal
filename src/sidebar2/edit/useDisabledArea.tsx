import React, { useEffect, useState } from 'react';
import { uuid } from './../../utils'


class DisabledStyle {

  styleEle = null
  id1 = uuid();
  id2 = uuid();

  conetent = ''

  
  styleEleId = `for_disable_focus_${uuid()}`

  constructor({ root }) {
    const _styleEle = document.createElement('style')
    _styleEle.id = `for_disable_focus_${uuid()}`;
    _styleEle.innerText = `
    #${this.id1} #${this.id2} .disabled-area, #${this.id1} #${this.id2} .disabled-area * {
      pointer-events: none !important;
    }
    .disabled-area {
      opacity: 0.4;
      filter: blur(0.8px);
    }
    `

    
    root.appendChild(_styleEle)

    this.unmount = () => {
      // const ele = root.getElementById?.(_styleEle.id)
      // if (ele) {
      //   ele.outerHTML = ''
      // }
    }
  }

  unmount = () => {}
}


export const useDisabledArea = () => {
  const [ids, setIds] = useState(['', ''])

  useEffect(() => {
    const shaowDom = document.getElementById('_mybricks-geo-webview_');
    const shaodowrooot = shaowDom?.shadowRoot
    const disabledStyle = new DisabledStyle({ root: shaodowrooot })

    setIds([disabledStyle.id1, disabledStyle.id2])

    return () => {
      disabledStyle.unmount()
    }
  }, [])


  return ({ children }) => (
    <div id={ids[0]}>
      <div id={ids[1]}>
        {children}
      </div>
    </div>
  )
}