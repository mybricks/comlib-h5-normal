export function rawBack(yoda: any) {
  history?.back();
}

/**
 * 返回
 */
export default function back(yoda: any) {
  if ((window as any)._physicalBackCb) {
    (window as any)._physicalBackCb();
  } else {
    rawBack(yoda);
  }
}
