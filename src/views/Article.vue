<template>
  <article v-if="article" class="full-article">
    <Header />

    <Summary />

    <div v-if="article.guplayId" class="VisualModule">
      <MainVideo :guplay-id="article.guplayId" />
    </div>

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
import { getArticle } from "@/assets/api";
import Header from "@/components/article/Header";
import MainVideo from "@/components/article/MainVideo";
import MainGallery from "@/components/article/MainGallery";
import Summary from "@/components/article/Summary";
import Downloads from "@/components/article/Downloads";
import ContentSection from "@/components/article/ContentSection";
import References from "@/components/article/References";
import { mapState } from "vuex";

export default {
  name: "Article",
  components: {
    Header,
    MainVideo,
    MainGallery,
    Summary,
    Downloads,
    ContentSection,
    References,
  },
  props: ["identifier", "revision"],
  computed: {
    ...mapState(["article"]),
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
    async load() {
      this.$store.commit("setHeader", {
        route: "/",
        label: "Biennial International Conference for the Craft Sciences 2021",
      });
      const article = await getArticle(this.identifier, this.revision);
      this.$store.commit("setArticle", article);
      document.title = article.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.full-article {
  /* Make bottom margin match side margin */
  margin: 0 0 10vw;
}
</style>
