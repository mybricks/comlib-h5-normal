export const imageSchema = {
  type: "object",
  properties: {
    failedCount: {
      description: "失败的文件数量",
      type: "number",
    },
    type: {
      description: "选择的媒体类型，例如'image'",
      type: "string",
    },
    tempFiles: {
      description: "临时文件列表",
      type: "array",
      items: {
        description: "临时文件的详细信息",
        type: "object",
        properties: {
          tempFilePath: {
            description: "临时文件的路径",
            type: "string",
          },
          size: {
            description: "文件的大小，单位为字节",
            type: "number",
          },
          fileType: {
            description: "文件的类型，例如'image'",
            type: "string",
          },
        },
      },
    },
  },
};

export const videoSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  description: "定义了选择视频文件后的API响应结构",
  type: "object",
  properties: {
    errMsg: {
      description: "API调用的结果消息，成功时为'chooseMedia:ok'",
      type: "string",
    },
    failedCount: {
      description: "选择失败的文件数量",
      type: "integer",
    },
    type: {
      description: "选择的媒体类型，此处为'video'",
      type: "string",
    },
    tempFiles: {
      description: "选择的临时视频文件列表",
      type: "array",
      items: {
        type: "object",
        properties: {
          tempFilePath: {
            description: "视频文件的临时路径",
            type: "string",
          },
          size: {
            description: "视频文件的大小，单位为字节",
            type: "number",
          },
          fileType: {
            description: "视频文件的类型",
            type: "string",
          },
          duration: {
            description: "视频的时长，单位为秒",
            type: "number",
          },
          width: {
            description: "视频的宽度，单位为像素",
            type: "number",
          },
          height: {
            description: "视频的高度，单位为像素",
            type: "number",
          },
          thumbTempFilePath: {
            description: "视频缩略图的临时路径",
            type: "string",
          },
        },
      },
    },
  },
};
