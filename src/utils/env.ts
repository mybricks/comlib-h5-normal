/**
 * 环境相关方法
*/


/* 判断是否为 edit 态 */
export function isEdit(env): Boolean {
  if (env?.edit) {
    return true;
  } else {
    return false;
  }
}


/* 判断是否在设计器中运行 */
export function isDesigner(env): Boolean {
  if (env?.edit || env?.runtime?.debug) {
    return true;
  } else {
    return false;
  }
} 