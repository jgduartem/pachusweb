
const routes = [
  {
    path: '/',
    component: () => import('layouts/SecondLayout.vue'),
    children: [
      {path: '/', component: () => import('pages/Index.vue') },
      {path: '/Login', component: () => import('pages/Login.vue')},
      {path: '/Admin', component: () => import('pages/newAdmin.vue')},
      {path: '/View', component: () => import('pages/ProductView.vue')},
      {path: '/Register', component: () => import('pages/Registration.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/MyAccount', component: () => import('pages/MyAccount.vue')},
      {path: '/Customize', component: () => import('pages/Personalization.vue')}
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
