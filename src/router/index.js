import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
// import Help from "../views/helpp.vue"
// import Memo from "../views/memo.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // {
  //   path: "/memo",
  //   name: "Memo",
  //   component: Memo,
  // },
  // {
  //   path: "/help",
  //   name: "Help",
  //   component: Help,
  // },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
