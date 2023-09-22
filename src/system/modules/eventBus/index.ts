(window as any).__eventBus__ = (window as any).__eventBus__ || [];
(window as any).__debug__ = (window as any).__debug__ || {};

export const on = (key, handler) => {
  (window as any).__eventBus__.push({ key, handler });
};

export const off = (key, handler) => {
  (window as any).__eventBus__ = (window as any).__eventBus__.filter((item) => {
    return item.key !== key || item.handler !== handler;
  });
};

export const emit = (key, value) => {
  (window as any).__eventBus__.forEach((item) => {
    if (item.key === key) {
      item.handler(value);
    }
  });

  return (window as any).__debug__[key] = value;
};

export const get = (key, defaultValue) => {
  return (window as any).__debug__[key] ?? defaultValue;
};

export const set = (key, value) => {
  return (window as any).__debug__[key] = JSON.parse(JSON.stringify(value));
};