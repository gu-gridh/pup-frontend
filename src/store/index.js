import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articleData: null,
    header: {}
  },
  mutations: {
    setArticleData(state, article) {
      state.articleData = article;
    },
    setHeader(state, header) {
      state.header = header;
    }
  }
});
