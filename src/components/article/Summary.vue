<template>
  <div>
    <div class="container article-summary">
      <h2>Summary</h2>
      <div class="summary-text" v-html="parseMarkdown(summary)" />
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
            {{ commaAnd(authors.map(lastnameFirst)) }}
            ({{ date.slice(0, 4) }})
            <em>{{ title }}.</em>
            Biennial International Conference for the Craft Sciences. Version
            {{ revision }}. https://&lt;url&gt;{{ $route.path }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import showdown from "showdown";
import { commaAnd, lastnameFirst } from "@/assets/util";
import MetaItem from "@/components/article/MetaItem";

const showdownConverter = new showdown.Converter();

export default {
  props: ["summary", "keywords", "authors", "date", "title", "revision"],
  components: {
    MetaItem,
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
.article-summary {
  .summary-text {
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
  width: 66.7%;
  font-weight: 100;
  font-family: 'Yanone Kaffeesatz', sans-serif;
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
}
</style>
