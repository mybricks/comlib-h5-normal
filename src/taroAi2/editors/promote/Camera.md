# Camera - 系统相机。

## 类型
```tsx
ComponentType<CameraProps>
```

## CameraProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | :---: | :---: | --- |
| mode | `keyof Mode` | `"normal"` | 否 | 模式，有效值为normal, scanCode |
| resolution | `keyof Resolution` | `"medium"` | 否 | 分辨率，不支持动态修改 |
| devicePosition | `keyof DevicePosition` | `"back"` | 否 | 摄像头朝向 |
| flash | `keyof Flash` | `"auto"` | 否 | 闪光灯 |
| frameSize | `keyof FrameSize` | `"medium"` | 否 | 指定期望的相机帧数据尺寸 |
| outputDimension | "360P" or "540P" or "720P" or "1080P" or "max" | `"720P"` | 否 | 相机拍照，录制的分辨率。 |
| onStop | `EventFunction` |  | 否 | 摄像头在非正常终止时触发，<br />如退出后台等情况 |
| onError | `EventFunction` |  | 否 | 用户不允许使用摄像头时触发 |
| onInitDone | `EventFunction<onInitDoneEventDetail>` |  | 否 | 相机初始化完成时触发 |
| onReady | `EventFunction<onInitDoneEventDetail>` |  | 否 | 相机初始化成功时触发。 |
| onScanCode | `EventFunction<onScanCodeEventDetail>` |  | 否 | 在成功识别到一维码时触发，<br />仅在 mode="scanCode" 时生效 |

### Mode

mode 的合法值

| 参数 | 说明 |
| --- | --- |
| normal | 相机模式 |
| scanCode | 扫码模式 |

### Resolution

resolution 的合法值

| 参数 | 说明 |
| --- | --- |
| low | 低 |
| medium | 中 |
| high | 高 |

### DevicePosition

device-position 的合法值

| 参数 | 说明 |
| --- | --- |
| front | 前置 |
| back | 后置 |

### Flash

flash 的合法值

| 参数 | 说明 |
| --- | --- |
| auto | 自动 |
| on | 打开 |
| off | 关闭 |
| torch | 常亮 |

### FrameSize

frame-size 的合法值

| 参数 | 说明 |
| --- | --- |
| small | 小尺寸帧数据 |
| medium | 中尺寸帧数据 |
| large | 大尺寸帧数据 |

### onInitDoneEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| maxZoom | `number` | 最大变焦 |

### onScanCodeEventDetail

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| charSet | `string` | 字符集 |
| rawData | `string` | 原始数据 |
| type | `string` | 码类型 |
| result | `string` | 识别结果 |
| fullResult | `string` | 识别结果(完整) |