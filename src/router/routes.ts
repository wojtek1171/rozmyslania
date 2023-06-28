import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/content', component: () => import('src/pages/Content.vue') },
      { path: '/chapter/:number', component: () => import('pages/Chapter.vue') },
      { path: '/daily', component: () => import('pages/DailyQuote.vue') },
      { path: '/favourites', component: () => import('pages/Favourites.vue') },
      { path: '/info', component: () => import('pages/Info.vue') },
      { path: '/intro', component: () => import('pages/Introduction.vue') },
      { path: '/options', component: () => import('pages/Options.vue') },
      { path: '/quote/:number', component: () => import('pages/SingleQuote.vue') },
      { path: '/search', component: () => import('pages/Search.vue') },
      { path: '/search/:tag', component: () => import('pages/Search.vue') },
      { path: '/random', component: () => import('pages/Random.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
