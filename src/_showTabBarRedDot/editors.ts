export default {
  ":root": [
    {
      title: "aaaa",
      type: "_sceneSelect",
      value: {
        get({ data }) {
          return data.scene;
        },
        set({ data }, value) {
          data.scene = value;
        }
      }
    }
  ],
};
