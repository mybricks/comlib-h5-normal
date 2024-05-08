export default {
  '@init'({style, data}) {
    style.width = 200;
    style.height = "auto";
  },
  '@resize': {
    options: ['width'],
  },
  ':root': [
    {
      items: [
        {
          title: '版权所有',
          type: 'text',
          value: {
            get({data}) {
              return data.copyright;
            },
            set({data}, value: string) {
              data.copyright = value;
            },
          }
        }
      ]
    }
  ],
};
