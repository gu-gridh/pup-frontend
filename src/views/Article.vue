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
        v-for="section in article.content"
        :key="section.label"
        :section="section"
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
import { apiUrl, getArticle, getImageAtLeast } from "@/assets/api";
import Header from "@/components/article/Header.vue";
import MainVideo from "@/components/article/MainVideo.vue";
import MainGallery from "@/components/article/MainGallery.vue";
import Abstract from "@/components/article/Abstract.vue";
import Downloads from "@/components/article/Downloads.vue";
import ContentSection from "@/components/article/ContentSection.vue";
import References from "@/components/article/References.vue";
import { mapMutations, mapState } from "vuex";
import { fullName } from "@/assets/util";

export default {
  name: "Article",
  components: {
    Header,
    MainVideo,
    MainGallery,
    Abstract,
    Downloads,
    ContentSection,
    References
  },
  props: ["journalName", "identifier", "revision"],
  computed: {
    ...mapState(["article"])
  },
  activated() {
    this.load();
  },
  created() {
    this.load();
  },
  deactivated() {
    this.$store.commit("setArticle", null);
  },
  methods: {
    ...mapMutations(["reportNotFound"]),
    async load() {
      this.$store.commit("setHeader", {
        route: `/${this.journalName}`,
        label: "Biennial International Conference for the Craft Sciences 2021"
      });
      const article = await getArticle(this.identifier, this.revision);
      if (!article) {
        this.reportNotFound();
        return;
      }
      this.$store.commit("setArticle", article);
      document.title = article.title;
      document.dispatchEvent(
        new Event("ZoteroItemUpdated", {
          bubbles: true,
          cancelable: true
        })
      );
    }
  },
  metaInfo() {
    return {
      meta: this.article
        ? [
            { property: "og:title", content: this.article.title },
            { property: "og:type", content: "article" },
            {
              property: "og:image",
              content: apiUrl(getImageAtLeast(this.article.image, 1000).url)
            },
            {
              property: "og:url",
              content: `https://biccs.dh.gu.se${this.$route.path}`
            },
            { property: "og:description", content: this.article.abstract },
            {
              property: "og:site_name",
              content:
                "Biennial International Conference for the Craft Sciences 2021"
            },
            {
              property: "article:published_time",
              content: this.article.date
            },
            {
              property: "article:modified_time",
              content: this.article.revisionDate
            },
            {
              name: "keywords",
              content: this.article.keywords
                .map(keyword => keyword.label)
                .join(", ")
            },
            { name: "description", content: this.article.abstract },
            ...this.article.authors.map(author => ({
              name: "author",
              content: fullName(author)
            }))
          ]
        : []
    };
  }
};
</script>

<style lang="scss" scoped>
.full-article {
  /* Make bottom margin match side margin */
  margin: 0 0 10vw;
}
</style>
