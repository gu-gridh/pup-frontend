import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    header: {},
    article: null,
    notFound: false
  },
  mutations: {
    setHeader(state, header) {
      state.header = header;
    },
    setArticle(state, article) {
      state.article = article;
    },
    reportNotFound(state) {
      state.notFound = true;
    },
    clearNotFound(state) {
      state.notFound = false;
    }
  }
});
