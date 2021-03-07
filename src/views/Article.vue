<template>
  <article v-if="article" class="full-article">
    <Header v-bind="article" />

    <Summary v-bind="article" />

    <div v-if="article.guplayId" class="VisualModule">
      <MainVideo :guplay-id="article.guplayId" />
    </div>

    <div class="container">
      <Downloads :downloads="article.downloads" />
    </div>

    <div v-if="article.images" class="VisualModule">
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
  data() {
    return {
      article: null,
    };
  },
  async created() {
    this.article = await getArticle(this.identifier, this.revision);
    this.$store.commit("setArticleData", this.article);
    document.title = this.article.title;
  },
};
</script>

<style lang="scss" scoped>
.full-article {
  /* Make bottom margin match side margin */
  margin: 0 0 10vw;
}

.container{
width:80%;
}

</style>
