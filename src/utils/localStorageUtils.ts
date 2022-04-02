/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 将值设定至LocalStorage
 *
 * @param {string} key key
 * @param {Record<string, string>} value 值
 * @returns {void}
 */
export function setLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 从LocalStorage中取值
 *
 * @param {string} key key
 * @returns {any} 值
 */
export function getLocalStorage(key: string): any {
  if (!localStorage.getItem(key)) {
    return;
  }

  return JSON.parse(localStorage.getItem(key) || '{}');
}

/**
 * 清空LocalStorage
 *
 * @returns {void}
 */
export function clearLocalStorage(): any {
  localStorage.clear();
}
