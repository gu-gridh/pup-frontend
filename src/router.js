import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Journal from "./views/Journal.vue";
import Article from "./views/Article.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/:journalName",
      name: "journal",
      component: Journal,
      props: true
    },
    {
      path: "/:journalName/:identifier/:revision",
      name: "article",
      component: Article,
      props: true
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});
