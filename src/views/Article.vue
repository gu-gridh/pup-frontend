<template>
  <article v-if="article" class="full-article">
    <Header />

    <Abstract />

    <MainVideo
      v-for="guplayRef in article.guplayRef"
      :key="guplayRef.id"
      :guplay-id="guplayRef.guplayId"
      :title="guplayRef.title"
    />

    <div v-if="article.downloads" class="container">
      <Downloads :downloads="article.downloads" />
    </div>

    <div v-if="article.images && article.images.length" class="VisualModule">
      <MainGallery :images="article.images" />
    </div>

    <div
      v-if="article.content && article.content.length"
      class="container article-content"
    >
      <ContentSection
        v-for="(section, index) in article.content"
        :key="section.label"
        :section="section"
        :order="index + 1"
      />
    </div>

    <References
      v-if="article.references && article.references.length"
      :references="article.references"
      :extras="article.extras"
    />
  </article>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useStore, mapMutations, mapState } from 'vuex'
import { apiUrl, getArticle, getImageAtLeast } from '@/assets/api'
import { fullName } from '@/assets/util'

import Header from '@/components/article/Header.vue'
import MainVideo from '@/components/article/MainVideo.vue'
import MainGallery from '@/components/article/MainGallery.vue'
import Abstract from '@/components/article/Abstract.vue'
import Downloads from '@/components/article/Downloads.vue'
import ContentSection from '@/components/article/ContentSection.vue'
import References from '@/components/article/References.vue'

export default {
  name: 'Article',
  components: {
    Header,
    MainVideo,
    MainGallery,
    Abstract,
    Downloads,
    ContentSection,
    References,
  },

  // keep your props as-is
  props: ['journalName', 'identifier', 'revision'],

  // 🔹 Add setup only to manage <head> using the Vuex article state
  setup() {
    const store = useStore()
    const article = computed(() => store.state.article)

    useHead({
      title: computed(() => article.value?.title ?? 'Article'),
      meta: computed(() => {
        if (!article.value) return []

        const a = article.value
        const img = a.image ? apiUrl(getImageAtLeast(a.image, 1000).url) : undefined

        return [
          { property: 'og:title', content: a.title },
          { property: 'og:type', content: 'article' },
          ...(img ? [{ property: 'og:image', content: img }] : []),
          // If you previously relied on this.$route; we avoid it here to keep setup simple.
          // You can pass a canonical/absolute URL from props or store if needed.
          { property: 'og:description', content: a.abstract },
          {
            property: 'og:site_name',
            content: 'Biennial International Conference for the Craft Sciences 2021',
          },
          { property: 'article:published_time', content: a.date },
          { property: 'article:modified_time', content: a.revisionDate },
          {
            name: 'keywords',
            content: Array.isArray(a.keywords) ? a.keywords.map((k) => k.label).join(', ') : '',
          },
          { name: 'description', content: a.abstract },
          ...((a.authors || []).map((author) => ({
            name: 'author',
            content: fullName(author),
          })) || []),
        ]
      }),
    })

    return {}
  },

  computed: {
    ...mapState(['article']),
  },

  activated() {
    this.load()
  },
  created() {
    this.load()
  },
  deactivated() {
    this.$store.commit('setArticle', null)
  },

  methods: {
    ...mapMutations(['reportNotFound']),
    async load() {
      this.$store.commit('setHeader', {
        route: `/${this.journalName}`,
        label: 'Biennial International Conference for the Craft Sciences 2021',
      })

      const article = await getArticle(this.identifier, this.revision)
      if (!article) {
        this.reportNotFound()
        return
      }

      this.$store.commit('setArticle', article)

      // Title/meta are now handled by useHead; keep your custom event:
      document.dispatchEvent(
        new Event('ZoteroItemUpdated', {
          bubbles: true,
          cancelable: true,
        }),
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.full-article {
  /* Make bottom margin match side margin */
}

@media screen and (max-width: 1000px) {
  .full-article {
    /* Make bottom margin match side margin */
    padding: 0px 20px;
  }
}
</style>