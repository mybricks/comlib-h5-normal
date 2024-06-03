export default {
  ":root": [
    {
      title: "说明",
      type: "editorRender",
      options: {
        render: (props) => {
          return (
            <div>
              <div>请确认所填写的接口域名在文件上传白名单中</div>
              <a
                target="_blank"
                href="https://docs.mybricks.world/docs/miniprogram/best-practices/to-upload-aliyun-oss/"
              >
                参考链接
              </a>
            </div>
          );
        },
      },
    },
  ],
};