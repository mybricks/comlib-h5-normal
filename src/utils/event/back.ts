export function rawBack() {
  history?.back();
}

/**
 * 返回
 */
export default function back() {
  if ((window as any)._physicalBackCb) {
    (window as any)._physicalBackCb();
  } else {
    rawBack();
  }
}
