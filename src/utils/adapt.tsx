import React, { useState, useEffect, useMemo, useRef } from 'react';

export const connectComponent =
  (Comp) =>
  ({ data, inputs, outputs, slots, env, logger, title }) => {
    const [ioInputs, setIoInputs] = useState({});
    const [slotProps, setSlotProps] = useState({});
    const childUpdateProps = useRef({});
    const slotInput = useRef({});

    useEffect(() => {
      Object.keys(inputs || {}).forEach((propKey) => {
        inputs[propKey]((args) => {
          if (propKey === 'install') {
            return;
          }
          setIoInputs((c) => ({ ...c, [propKey]: args }));
        });
      });
    }, [inputs]);

    //[TODO] install必须每次都执行，不能放到useEffect里，不然没法获取到最新数据，slot io的bug
    typeof inputs.install === 'function' &&
      inputs.install((props) => {
        //[TODO] 这里不能直接set，每次都会执行，导致无限循环
        // console.log('laile ==>', props.cardData.rank, props.cardData.authorName)
        if (JSON.stringify(slotInput.current) !== JSON.stringify(props)) {
          // console.log('receive ==>', props.cardData.rank, props.cardData.authorName)
          setSlotProps(props);
          slotInput.current = props;
        }
      });

    // useEffect(() => {
    //   setSlotProps(slotInput.current)
    // }, [slotInput.current])

    const ioOutputs = useMemo(() => {
      const res = {};
      Object.keys(outputs || {}).forEach((funKey) => {
        res[funKey] = (...args) => {
          outputs[funKey](...args);
        };
      });
      return res;
    }, [outputs]);

    // schema slot部分的适配
    const childs = useMemo(() => {
      const res = {};
      Object.keys(slots || {}).forEach((childKey) => {
        res[childKey] = (props) => {
          // 每次inputs都不会触发组件的更新，只有fn会，需要保存下来每次重新render
          // typeof childUpdateProps.current[childKey] === 'function' &&
          //   childUpdateProps.current[childKey](props)

          return slots[childKey].render({
            inputs: {
              install(fn) {
                // childUpdateProps.current[childKey] = fn
                fn(props);
              },
            },
          });
        };
        res[childKey].size = slots[childKey].size;
      });
      return res;
    }, [slots]);

    return (
      <Comp {...data} {...slotProps} {...ioInputs} {...ioOutputs} {...childs} title={title} env={env} logger={logger} />
    );
  };

/** 保证子组件能跟着父组件更新而更新，仅schema slot使用 */
export const SchemaSlotRender = ({ props, slot }) => {
  const childUpdateFn = useRef<any>(() => {});
  childUpdateFn.current?.(props);
  return slot?.render?.({
    inputs: {
      install(fn) {
        childUpdateFn.current = fn;
        fn(props);
      },
    },
  });
};
