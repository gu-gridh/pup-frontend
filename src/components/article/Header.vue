<template>
  <header class="article-header">
    <div class="container">
      <div class="article-mainmeta">
        <MetaItem label="Publication date">{{ date }}</MetaItem>
        <MetaItem label="Version">
          {{ revision }} ({{ revisionDate }})
        </MetaItem>
      </div>

      <h1 class="article-title title">{{ title }}</h1>
      <h2 class="article-subtitle title">{{ subtitle }}</h2>

      <div class="article-authors">
        <div class="author-name">
          <CommaAnd :items="authors">
            <template v-slot:item="{ item }">
              {{ fullName(item)
              }}<sup v-if="affiliations.length > 1">{{
                affiliations.indexOf(item.affiliation) + 1
              }}</sup></template
            >
          </CommaAnd>
        </div>
        <div class="author-affiliation">
          <span v-for="(aff, i) in affiliations" :key="i">
            <sup v-if="affiliations.length > 1">{{ i + 1 }}</sup
            >{{ aff }}.
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import { apiUrl } from "@/assets/api";
import { commaAnd, fullName } from "@/assets/util";
import MetaItem from "@/components/article/MetaItem";
import CommaAnd from "@/components/CommaAnd";

export default {
  name: "Header",
  components: { MetaItem, CommaAnd },
  computed: {
    ...mapState({
      date: state => state.article.date,
      revision: state => state.article.revision,
      revisionDate: state => state.article.revisionDate,
      title: state => state.article.title,
      subtitle: state => state.article.subtitle,
      authors: state => state.article.authors
    }),
    affiliations() {
      return this.uniq(
        this.authors.map(author => author.affiliation).filter(Boolean)
      );
    }
  },
  methods: {
    apiUrl,
    commaAnd,
    fullName,
    /** Remove duplicates, keep order by first occurrence. */
    uniq: arr =>
      arr.reduce((arr2, x) => (arr2.includes(x) ? arr2 : [...arr2, x]), [])
  }
};
</script>

<style lang="scss" scoped>
.article-header {
  background-color: #f4f4f4;
  padding: 0px 20px;
  font-weight: 100;
  width:calc(100% + 40px);
  margin-left:-20px;
}

  .article-mainmeta {
    margin: 0 0 1.5rem;
    line-height: 1.5;
  }

  .article-title {
    font-family: "Yanone Kaffeesatz", sans-serif;
    margin: 3rem 0 0.5rem;
    text-align: left;
    width: 100%;
    font-weight: 100;
    font-style: normal;
    font-size: 60px;
    line-height: 1;
  }
  .article-subtitle {
    margin: 0.5rem 0 1rem;
    font-weight: 100;
    font-family: "Yanone Kaffeesatz", sans-serif;
  }

  @media screen and (max-width: 1000px) {
    .article-header {
    padding-left:20px;
    }
    .article-title {
      font-size: 3rem;
    
    }
    .article-subtitle {
      font-size: 2rem;

    }
  }

  .article-authors {
    font-size: 1.1rem;


    .author-name {
      font-size: 1.3rem;
      // line-height: 1.5;
      margin-bottom: 0.5rem;
      
    }
  }

</style>
