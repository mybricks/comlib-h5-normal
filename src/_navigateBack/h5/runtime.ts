export default function ({ env, data, inputs, outputs }) {
  if (!env.runtime) {
    return;
  }

  inputs["navigateBack"]((val) => {
    let delta = data.delta;

    if (val?.delta) {
      delta = val.delta;
    }

    //runtime
    window.history.back?.()
  });
}
