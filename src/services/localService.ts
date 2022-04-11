import { setLocalStorage, getLocalStorage, clearLocalStorage } from '@/utils/localStorageUtils';
import { Person, Prize } from '@/models';

const local = {
  personInfo: [] as Person[], // 人员情报
  prizeInfo: [] as Prize[] // 奖品情报
};

export const localService = new Proxy(local, {
  get(target, key): Person[] {
    return getLocalStorage(key as string);
  },
  set(target, key, value): boolean {
    setLocalStorage(key as string, value);
    return Reflect.set(target, key, value);
  }
});

export const clearLocal = (): void => {
  clearLocalStorage();
};
