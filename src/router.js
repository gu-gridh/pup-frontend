import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Journal from "./views/Journal.vue";
import Article from "./views/Article.vue";
import NotFound from "./views/NotFound.vue";

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
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});
