export default {
  '@init'({style, data}) {
    style.width = "100%";
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
