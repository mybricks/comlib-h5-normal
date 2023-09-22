import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import css from "./style.less";
import cx from "classnames";
import { isEmpty, isObject } from "./../utils/core";
import { Cell, Form, Field } from "brickd-mobile";
import { getFormItem, findFormItemIndex } from "./utils";
import { FormItems, RuleKeys } from "./types";

// @ts-ignore
const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB || Taro.getEnv() === "Unknown";

const formatRulesFromItem = (item) => {
  const rules = item?.rules ?? [];

  return rules
    .filter((rule) => rule.status)
    .map((rule) => {
      if (rule.key === RuleKeys.REQUIRED) {
        return {
          required: true,
          message: rule.message,
        };
      }
      /** TODO */
      return {
        required: true,
        message: rule.message,
      };
    });
};

/** 去除value为undefined场景的对象 */
const omitUndefinedKeys = (obj) => {
  const resWithoutUndefined = {}
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      resWithoutUndefined[key] = obj[key]
    }
  })
  return resWithoutUndefined
}

/** 代理fomrRef，因为组件库的setValues居然是增量的，不合理，这里代理成全量的 */
const useForm = ({ items, childrenInputs }) => {
  const formRef: any = useRef(null);

  const ref = useMemo(() => {
    return {
      getValues: () => {
        const res = formRef?.current?.getValues()
        return omitUndefinedKeys(res)
      },
      setFieldValue: ((name, value) => {
        const res = formRef?.current?.getValues();
        res[name] = value
        formRef?.current?.setValues(res)
      }),
      setValues: (val) => {
        const valuesWithUndefined = {}
        /** 设置表单项的value */
        items.forEach(item => {
          const itemValue = {...(val ?? {})}[item.name ?? item.id];
          childrenInputs.current[item.comName ?? item.id]?.['setValue']?.(itemValue);
          valuesWithUndefined[item.name ?? item.id] = itemValue !== undefined ? itemValue : undefined
        })

        formRef?.current?.setValues(valuesWithUndefined)
      },
      validate: () => new Promise((resolve, reject) => {
        formRef?.current?.validate()?.then(res => {
          resolve(omitUndefinedKeys(res))
        }).catch(e => reject(e))
      }) 
    }
  }, [])

  return [ref, formRef]
}

export default function ({ env, data, inputs, outputs, slots }) {
  const childrenInputs = useRef({});
  const [form, formRef] = useForm({ items: data.items, childrenInputs })

  // 提交表单
  inputs['submit']((val, outputRels) => {
    form?.validate()
      .then((res) => {
        outputRels["onSubmit"](res);
      })
      .catch((err) => {
        console.error("validate", err);
      });
  });

  //设置值
  useEffect(() => {
    inputs["setFieldsValue"]((val) => {
      if (isEmpty(val) || !isObject(val)) {
        return;
      }
      form.setValues(val)
      // 触发「表单数据输入」
      slots['content'].inputs["setFieldsValue"](val);
    });

    inputs["getFieldsValue"]((val, outputRels) => {
      const values = form.getValues();
      outputRels["returnValues"](values);
    });

    /** 下发表单项的onChange函数，用来收集表单项数据 */
    slots["content"]._inputs["onChange"](({ id, name, value }) => {
      const item = getFormItem(data.items, { id, name });

      if (item) {
        form.setFieldValue(item.name || item.label, value)
      }
    });
  }, []);

  const content = useMemo(() => {
    return (
      <View>
        {slots["content"].render({
          itemWrap(com: { id; jsx; name }) {
            // todo name
            const idx = findFormItemIndex(data.items, com);
            const item = data.items[idx] ?? ({} as FormItems);
            const rules = formatRulesFromItem(item);

            const showRequired = rules.findIndex((rule) => rule.required) > -1;

            // const isLast = data.items.length - 1 === idx
            const isLast = data.items.length - 1 === item.index;

            return (
              <Field
                className={cx(
                  "mybricks-field",
                  { ["border-bottom"]: !isLast },
                  { ["border-none"]: isLast },
                  { [css.hidden]: !env?.edit && item.hidden }
                )}
                required={showRequired}
                rules={rules}
                label={!item.hideLabel && item.label}
                name={item.name}
              >
                {com.jsx}
              </Field>
            );
          },
          wrap(comAray: { id; name; jsx; def; inputs; outputs; style }[]) {
            const items = data.items ?? [];

            const jsx = comAray?.map((com, idx) => {
              if (com) {
                let item = getFormItem(data.items, com);
                item.index = idx;

                if (!item) {
                  if (items.length === comAray.length) {
                    console.warn(`formItem comId ${com.id} formItem not found`);
                  }
                  return;
                }

                if (item.comName) {
                  childrenInputs.current[com.name] = com.inputs;
                } else {
                  childrenInputs.current[com.id] = com.inputs;
                }

                return com.jsx;
              }
            });

            return jsx;
          },
        })}
      </View>
    );
  }, []);


  const onCustomSubmit = useCallback(() => {
    if (env.runtime) {
      if (data.skipValidation) {
        outputs["onSubmit"](form?.getValues());
      } else {
        form
          ?.validate()
          .then((res) => {
            outputs["onSubmit"](res);
          })
          .catch((err) => {
            console.error("validate", err);
          });
      }
    }
  }, [data.skipValidation]);

  return (
    <Form className={cx(css.form, { [css.h5]: isH5 })} ref={formRef}>
      <Cell.Group bordered={false}>{content}</Cell.Group>
      {data.useSubmitButton ? (
        <View className={cx(css.foot, "mybricks-submit")}>
          <Button
            className="taroify-button"
            onClick={onCustomSubmit}
          >
            {data.submitButtonText}
          </Button>
        </View>
      ) : null}
    </Form>
  );
}
