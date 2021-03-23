export const state = () => ({
  header: {},
  article: null,
})

export const mutations = {
  setHeader(state, header) {
    state.header = header
  },
  setArticle(state, article) {
    state.article = article
  },
}
