export default {
  '@init'({ style }) {
    style.width = "100%";
    style.height = 'auto';
  },
  '@resize': {
    options: ['width', 'height'],
  },
  ':root'({ data, output, style }, cate0, cate1, cate2) {
    cate0.title = '常规';
    cate0.items = [
      {
        items: [
          {
            title: '地址',
            type: 'imageSelector',
            value: {
              get({ data }) {
                return data.src;
              },
              set({ data }, src: string) {
                data.src = src;
              },
            },
          },
        ],
      },
    ];

    cate1.title = '样式';
    cate1.items = [
      {
        title: '样式',
        type: 'style',
        options: ['border'],
        value: {
          get({ data }) {
            return data.imgStyle;
          },
          set({ env, data }, val) {
            data.imgStyle = { ...data.imgStyle, ...val };
          },
        },
      },
      {
        title: '图片填充方式',
        type: 'Select',
        options: [
          { value: 'scaleToFill', label: '缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素' },
          { value: 'aspectFit', label: '缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。' },
          { value: 'aspectFill', label: '缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。' },
          { value: 'widthFix', label: '缩放模式，宽度不变，高度自动变化，保持原图宽高比不变' },
          { value: 'heightFix', label: '缩放模式，高度不变，宽度自动变化，保持原图宽高比不变' },
          { value: 'top', label: '裁剪模式，不缩放图片，只显示图片的顶部区域' },
          { value: 'bottom', label: '裁剪模式，不缩放图片，只显示图片的底部区域' },
          { value: 'center', label: '裁剪模式，不缩放图片，只显示图片的中间区域' },
          { value: 'left', label: '裁剪模式，不缩放图片，只显示图片的左边区域' },
          { value: 'right', label: '裁剪模式，不缩放图片，只显示图片的右边区域' },
          { value: 'top left', label: '裁剪模式，不缩放图片，只显示图片的左上边区域' },
          { value: 'top right', label: '裁剪模式，不缩放图片，只显示图片的右上边区域' },
          { value: 'bottom left', label: '裁剪模式，不缩放图片，只显示图片的左下边区域' },
          { value: 'bottom right', label: '裁剪模式，不缩放图片，只显示图片的右下边区域' },
        ],
        value: {
          get({ data }) {
            return data.mode;
          },
          set({ data }, value: string) {
            data.mode = value;
          },
        },
      },
    ];

    cate2.title = '动作';
    cate2.items = [
      {
        title: '单击',
        type: '_event',
        options: {
          outputId: 'click',
        },
      },
    ];
  },
};
