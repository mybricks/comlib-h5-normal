import { useEffect, useState } from 'react'

const usParentFocus = ({ isEdit = false, nodeRef }) => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!isEdit || !nodeRef) {
      return;
    }

    const wrapperEle = node?.parentNode?.parentNode;
    if (!wrapperEle) {
      return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach((item) => {
        if (item.attributeName === 'class') {
          setBool(item.target.className.indexOf('focus-') > -1 ? true : false);
        }
      });
    });

    observer.observe(wrapperEle, {
      attributes: true,
      attributeOldValue: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [isEdit]);

  return bool;
};

export default usParentFocus