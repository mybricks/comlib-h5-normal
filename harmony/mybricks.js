const log = (...args) => {
  console.log(`[MyBricks]`, ...args)
}

/** 数据流 */
class Subject {
  _values = []
  _observers = new Set()

  constructor() {
  }

  get value() {
    return this._values[0]
  }

  next(value) {
    this._values[0] = value
    this._observers.forEach((observer) => observer(value))
  }

  subscribe(observer) {
    if (this._values.length) {
      observer(this._values[0])
    }
    this._observers.add(observer)
  }

  unsubscribe(observer) {
    this._observers.delete(observer)
  }
}

/** utils */
/**
 * 判断是否js多输入
 */
export const validateJsMultipleInputs = (input) => {
  return input.match(/\./); // input.xxx 为多输入模式
}

/** 组件的输入 */
const createReactiveInputHandler = (input, value, rels) => {
  if (value?.subscribe) {
    value.subscribe((value) => {
      input(value, new Proxy({}, {
        get(_, key) {
          return (value) => {
            (rels[key] || (rels[key] = new Subject())).next(value)
          }
        }
      }))
    })
  } else {
    input(value, new Proxy({},
      {
        get(_, key) {
          return (value) => {
            (rels[key] || (rels[key] = new Subject())).next(value)
          }
        }
      }
    ))
  }

  return new Proxy({},
    {
      get(_, key) {
        return rels[key] || (rels[key] = new Subject())
      }
    }
  )
}

// UI
export const inputs2 = (that, init = false) => {
  if (init) {
    /** 注册的输入 */
    const _inputEvents = {}
    /** 输入未完成注册，写入todo列表 */
    const _inputEventsTodo = {}

    const proxy = new Proxy({}, {
      get(_, key) {
        // 内置关键字
        if (key === "_inputEvents") {
          return _inputEvents;
        } else if (key === "_inputEventsTodo") {
          return _inputEventsTodo
        }
        return (value) => {
          if (!_inputEvents[key]) {
            // 组件未完成输入注册
            if (!_inputEventsTodo[key]) {
              _inputEventsTodo[key] = []
            }

            const rels = {}

            _inputEventsTodo[key].push({
              value,
              rels,
            });

            return new Proxy({}, {
              get(_, key) {
                return rels[key] || (rels[key] = new Subject())
              }
            })
          }

          return createReactiveInputHandler(_inputEvents[key], value, {})
        }
      }
    })

    return proxy;
  } else {
    const { controller } = that
    const { _inputEvents } = controller

    // 内置显示隐藏逻辑
    _inputEvents.show = (value) => {
      if (value?.subscribe) {
        value.subscribe(() => {
          that.columnVisibility = Visibility.Visible
        });
      } else {
        that.columnVisibility = Visibility.Visible
      }
    }
    _inputEvents.hide = (value) => {
      if (value?.subscribe) {
        value.subscribe(() => {
          that.columnVisibility = Visibility.None
        });
      } else {
        that.columnVisibility = Visibility.None
      }
    }
    _inputEvents.showOrHide = (value) => {
      if (value?.subscribe) {
        value.subscribe((value) => {
          that.columnVisibility = !!value ? Visibility.Visible : Visibility.None
        });
      } else {
        that.columnVisibility = !!value ? Visibility.Visible : Visibility.None
      }
    }

    const proxy = new Proxy(controller, {
      get(_, key) {
        return (input) => {
          if (!_inputEvents[key]) {
            // 第一次注册，处理TODO
            const _inputEventsTodo = controller._inputEventsTodo
            if (_inputEventsTodo[key]) {
              _inputEventsTodo[key].forEach(({ value, rels }) => {
                createReactiveInputHandler(input, value, rels)
              })
              Reflect.deleteProperty(_inputEventsTodo, key)
            }
          }

          _inputEvents[key] = input
        }
      }
    })

    return proxy
  }
}

// JS
export const inputs = (fn, props) => {
  let controller

  const inputs = new Proxy({}, {
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      }
    },
    ownKeys() {
      return props.inputs
    },
    get() {
      return (input) => {
        // 约定只有一个输入
        controller = input
      }
    }
  })

  const rels = {}

  const outputs = new Proxy({}, {
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      }
    },
    ownKeys() {
      return props.outputs
    },
    get(_, key) {
      return (value) => {
        (rels[key] || (rels[key] = new Subject())).next(value)
      }
    }
  })

  fn({
    data: props.data,
    inputs,
    outputs,
    logger: log,
  })

  const isJsMultipleInputs = props.inputs[0]
    ? validateJsMultipleInputs(props.inputs[0])
    : false;

  const exeOutputs = new Proxy(
    {},
    {
      get(_, key) {
        return rels[key] || (rels[key] = new Subject())
      },
    },
  )

  const exe = (...args) => {
    if (args.length) {
      // 调用输入
      if (isJsMultipleInputs) {
        // 多输入模式
        const length = args.length;
        let valueAry = {};
        args.forEach((value, index) => {
          if (value?.subscribe) {
            value.subscribe((value) => {
              valueAry[props.inputs[index]] = value
              if (Object.keys(valueAry).length === length) {
                createReactiveInputHandler(controller, valueAry, rels)
                // 触发输入后清除
                valueAry = {}
              }
            })
          } else {
            valueAry[props.inputs[index]] = value
            if (Object.keys(valueAry).length === length) {
              createReactiveInputHandler(controller, valueAry, rels)
              // 触发输入后清除
              valueAry = {}
            }
          }
        })
      } else {
        // 非多输入
        const value = args[0]
        if (value?.subscribe) {
          value.subscribe((value) => {
            createReactiveInputHandler(controller, value, rels)
          })
        } else {
          createReactiveInputHandler(controller, value, rels)
        }
      }
    }

    return exeOutputs;
  }

  return exe;
}
