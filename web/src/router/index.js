import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkindexView.vue';
import RecordIndexView from '../views/record/RecordindexView.vue';
import RankListIndexView from '../views/ranklist/RanklistindexView.vue';
import UserBotIndexView from '../views/user/bot/UserBotindexView.vue';
import NotFound from '../views/error/NotFound.vue';
import UserAccountLoginView from '../views/user/account/UserAccountLoginView.vue';
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView.vue';
import RecordContentView from '../views/record/RecordContentView.vue';
import store from '../store/index';

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/record/:recordId/",
    name: "record_content",
    component: RecordContentView,
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RankListIndexView,
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta:{
      requestAuth: false,
    },
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta:{
      requestAuth: false,
    },
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta:{
      requestAuth: true,
    },
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta:{
      requestAuth: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {

  let jwt_token=localStorage.getItem('jwt_token');
  if(jwt_token){
    store.dispatch("getInfo",jwt_token);
    next();
  }
  else if(to.meta.requestAuth&&!store.state.user.is_login){
    next({name: "user_account_login"});
  }
  else {
    next();
  }
})

export default router
