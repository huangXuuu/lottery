import { setLocalStorage, getLocalStorage, clearLocalStorage } from '@/utils/localStorageUtils';
import { User, Prize } from '@/models';

const local = {
  userInfo: [] as User[], // 用户情报
  prizeInfo: [] as Prize[] // 奖品情报
};

export const localService = new Proxy(local, {
  get(target, key): User[] {
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
