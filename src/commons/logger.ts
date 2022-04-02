import { createLogger } from 'vue-logger-plugin';

const isProduction = import.meta.env.MODE === 'production';

// eslint-disable-next-line no-console
console.debug = console.log;

/**
 * ロガーを作成する。
 */
const logger = createLogger({
  enabled: isProduction ? false : true,
  consoleEnabled: true,
  level: isProduction ? 'error' : 'debug'
});

export default logger;
