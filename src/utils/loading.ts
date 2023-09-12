interface IAsyncFunc {
  (...params: any[]): Promise<any>;
}

const loadingState = {
  count: 0,
};

const showLoading = (yoda) => {
  loadingState.count++;
  yoda.ui.showLoading();
};

const hideLoading = (yoda) => {
  loadingState.count--;
  if (loadingState.count <= 0) {
    loadingState.count = 0;
    yoda.ui.hideLoading();
  }
};

export const withLoading = (asyncFunc: IAsyncFunc, yoda: any, option: { content: string }): IAsyncFunc =>
  async function (this: any, ...args) {
    showLoading(yoda);
    try {
      const res = await asyncFunc.call(this, ...args);
      return res;
    } finally {
      requestAnimationFrame(() => hideLoading(yoda));
    }
  };
