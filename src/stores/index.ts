import { dialogsStore } from './modules/masters';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appStore: Record<string, any> = {};

/**
 * ストアを登録する。
 */
export const registerStore = (): void => {
  appStore.mastersStore = dialogsStore();
};

export default appStore;
