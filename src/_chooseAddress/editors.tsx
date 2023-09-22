export default {
  "@init"({ data, isAutoRun }) {
    if (isAutoRun()) {
      data.runImmediate = true;
    }
  },
  ":root": [],
};