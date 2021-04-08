<template>
  <article v-if="article" class="full-article">
    <ArticleHeader />

    <ArticleAbstract />

    <div v-if="article.guplayId" class="VisualModule">
      <LazyArticleMainVideo :guplay-id="article.guplayId" />
    </div>

    <div v-if="article.downloads" class="container">
      <ArticleDownloads :downloads="article.downloads" />
    </div>

    <div v-if="article.images && article.images.length" class="VisualModule">
      <LazyArticleMainGallery :images="article.images" />
    </div>

    <div
      v-if="article.content && article.content.length"
      class="container article-content"
    >
      <LazyArticleContentSection
        v-for="section in article.content"
        :key="section.label"
        :section="section"
      />
    </div>

    <ArticleReferences
      v-if="article.references && article.references.length"
      :references="article.references"
      :extras="article.extras"
    />
  </article>
</template>

<script>
import { getArticle } from '@/assets/api'
import { mapState } from 'vuex'

export default {
  name: 'Article',
  async asyncData({ params, store }) {
    const article = await getArticle(params.identifier, params.revision)
    store.commit('setArticle', article)
    store.commit('setHeader', {
      route: `/${params.journalName}`,
      label: 'Biennial International Conference for the Craft Sciences 2021',
    })
  },
  head() {
    return {
      title: this.article.title,
    }
  },
  computed: {
    ...mapState(['article']),
  },
  deactivated() {
    this.$store.commit('setArticle', null)
  },
}
</script>

<style lang="scss" scoped>
.full-article {
  /* Make bottom margin match side margin */
  margin: 0 0 10vw;
}
</style>
