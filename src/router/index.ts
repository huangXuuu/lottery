import { createRouter, createWebHistory } from 'vue-router';

import { MenuItem } from '@/commons/constants';
import Lottery from '@/views/Lottery.vue';
import Person from '@/views/Person.vue';
import Prize from '@/views/Prize.vue';
import History from '@/views/History.vue';

/**
 * ルートインスタントを生成する。
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Lottery
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    },
    {
      path: `/${MenuItem.LOTTERY}`,
      name: MenuItem.LOTTERY,
      component: Lottery
    },
    {
      path: `/${MenuItem.PERSON}`,
      name: MenuItem.PERSON,
      component: Person
    },
    {
      path: `/${MenuItem.PRIZE}`,
      name: MenuItem.PRIZE,
      component: Prize
    },
    {
      path: `/${MenuItem.HISTORY}`,
      name: MenuItem.HISTORY,
      component: History
    }
  ]
});

export default router;
