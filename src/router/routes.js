
const routes = [
  {
    path: '/',
    component: () => import('layouts/SecondLayout.vue'),
    children: [
      {path: '/', component: () => import('pages/Index.vue') },
      {path: '/Login', component: () => import('pages/Login.vue')},
      {path: '/Admin', component: () => import('pages/Admin.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
