import { runJs, utils } from './sandbox';
import { Data } from './constants';

export default function ({ env, data, inputs, outputs, logger }: RuntimeParams<Data>) {
    const { runtime } = env;
    if (runtime) {
        const { fns, runImmediate } = data;
        if (fns) {
            try {
                if (runImmediate) {
                    runJs(fns, [{ undefined, outputs }, { ...env, utils}]);
                }
                inputs.input0(val => {
                    try {
                        let inputValue = val;
                        // fn.run({inputValue, outputs}, env);
                        runJs(fns, [{ inputValue, outputs }, { ...env, utils }]);
                    } catch (ex) {
                        console.error('js计算组件运行错误.', ex)
                        logger.error(`${ex}`);
                    }
                })
            } catch (ex) {
                console.error('js计算组件运行错误.', ex)
                logger.error(`${ex}`);
            }
        }
    } else {
        // 兼容区块在 edit 状态时的逻辑处理
        if (data.fns) {
            inputs.input0(val => {
                try {
                    let inputValue = val;
                    runJs(data.fns, [{ inputValue, outputs }, { ...env, utils }]);
                } catch (ex) {
                    console.error('js计算组件运行错误.', ex)
                    logger.error(`${ex}`);
                }
            })
        }
    }
}
