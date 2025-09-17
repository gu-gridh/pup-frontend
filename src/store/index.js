import { createStore } from "vuex";

export default createStore({
  state: {
    header: {},
    article: null,
    notFound: false,
  },
  mutations: {
    setHeader(state, header) {
      state.header = header;
    },
    setArticle(state, a) {
      state.article = {
        ...(a || {}),
        authors: Array.isArray(a?.authors) ? a.authors : [],
        keywords: Array.isArray(a?.keywords) ? a.keywords : [],
        references: Array.isArray(a?.references) ? a.references : [],
        attachments: Array.isArray(a?.attachments) ? a.attachments : [],
        }
    },
    reportNotFound(state) {
      state.notFound = true;
    },
    clearNotFound(state) {
      state.notFound = false;
    },
  },
});
