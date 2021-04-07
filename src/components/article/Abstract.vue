<template>
  <div>
    <div class="container article-abstract">
      <h2>Abstract</h2>
      <div class="abstract-text" v-html="parseMarkdown(abstract)" />
    </div>

    <div class="container">
      <table class="meta-table">
        <tr>
          <th>Keywords:</th>
          <td>{{ keywords.map((keyword) => keyword.label).join(", ") }}</td>
        </tr>
        <tr>
          <th>Cite as:</th>
          <td>
            <template v-if="citeAs">
              {{ citeAs }}
            </template>
            <template v-else>
              {{ commaAnd(authors.map(lastnameFirst)) }}
              ({{ date.slice(0, 4) }})
              <em>{{ title }}.</em>
              Biennial International Conference for the Craft Sciences. Version
              {{ revision }}. https://biccs.dh.gu.se{{ $route.path }}
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import showdown from "showdown";
import { commaAnd, lastnameFirst } from "@/assets/util";

const showdownConverter = new showdown.Converter();

export default {
  computed: {
    ...mapState({
      abstract: (state) => state.article.abstract,
      keywords: (state) => state.article.keywords,
      citeAs: (state) => state.article.citeAs,
      authors: (state) => state.article.authors,
      date: (state) => state.article.date,
      title: (state) => state.article.title,
      revision: (state) => state.article.revision,
    }),
  },
  methods: {
    commaAnd,
    lastnameFirst,
    parseMarkdown(md) {
      return showdownConverter.makeHtml(md);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-abstract {
  .abstract-text {
    margin: 1rem 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 100;

    /* Deep selector needed for v-html. The >>> syntax does not work in scss. */
    ::v-deep p:first-child {
      margin-top: 0;
    }

    ::v-deep p:last-child {
      margin-bottom: 0;
    }

    @media screen and (min-width: 1000px) {
      column-count: 2;
      column-gap: 2rem;
    }
  }
}

.meta-table {
  text-align: left;

  th,
  td {
    padding: 0;
    vertical-align: top;
  }

  th {
    font-weight: 300;
    padding-right: 1rem;
  }

  tr:not(:last-of-type) {
    th,
    td {
      padding-bottom: 1rem;
    }
  }

  @media screen and (min-width: 800px) {
    width: 66.7%;
  }
}
</style>
