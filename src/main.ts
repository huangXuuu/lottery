import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import logger from './commons/logger';
import eventBus from './commons/EventBus';
import router from './router';
import { registerStore } from './stores';

/**
 * Bootstrap
 *
 * @returns {void}
 */
function bootstrap(): void {
  // Create App
  const app = createApp(App);

  // Init VueLogger
  app.use(logger);

  // Init Event Bus
  app.provide('$eventBus', eventBus);
  app.config.globalProperties.$eventBus = eventBus;

  // Init Element
  app.use(ElementPlus);

  // Init Store
  app.use(createPinia());
  registerStore();

  // Init Router
  app.use(router);

  // Init App
  app.mount('#app');
}

// 起動する。
bootstrap();
