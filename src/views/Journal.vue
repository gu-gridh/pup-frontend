<template>
  <div v-if="journal" class="journal">
    <div class="main">
      <div class="container">
        <h1 class="title">
          {{ journal.identifier }}
        </h1>
        <div class="body" v-html="journalHtml" />
      </div>
      <div class="collections container">
        <div class="grouping-select">
          <label>Order articles by:</label>
          <span
            :class="{ active: grouping === 'themes' }"
            @click="groupByThemes"
          >
            Theme
          </span>
          <ToggleButton
            :value="grouping === 'formats'"
            :color="{ unchecked: '#333', checked: '#333' }"
            :sync="true"
            @change="toggleGroupBy"
          />
          <span
            :class="{ active: grouping === 'formats' }"
            @click="groupByFormats"
          >
            Format
          </span>
        </div>
        <div v-for="group in groups" :key="group.id" class="group">
          <h1>{{ group.heading }}</h1>
          <p>{{ group.description }}</p>
          <div v-if="articles" class="articles">
            <Teaser
              v-for="articlePartial of group.articles"
              :key="articlePartial.id"
              :journal-name="journalName"
              :article="
                articles.find((article) => article.id === articlePartial.id) ||
                  article
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { ToggleButton } from "vue-js-toggle-button";
import { getJournal, getArticles } from "@/assets/api";
import { parseMarkdown } from "@/assets/markdown";
import Teaser from "@/components/Teaser";

export default {
  name: "Journal",
  components: { ToggleButton, Teaser },
  props: ["journalName"],
  data() {
    return {
      journal: null,
      articles: null,
      grouping: "themes",
    };
  },
  computed: {
    groups() {
      return this.journal ? this.journal[this.grouping] : [];
    },
    journalHtml() {
      return (
        parseMarkdown(this.journal.presentation) +
        parseMarkdown(this.journal.contact)
      );
    },
  },
  activated() {
    this.load();
  },
  methods: {
    ...mapMutations(["reportNotFound"]),
    load() {
      getJournal(this.journalName).then((journal) => {
        if (!journal) {
          this.reportNotFound();
          return;
        }
        this.journal = journal;
        document.title = this.journal.title;
      });

      getArticles().then((articles) => (this.articles = articles));

      this.$store.commit("setHeader", {
        route: "/",
        label: "Biennial International Conference for the Craft Sciences",
      });
    },
    groupByThemes() {
      this.grouping = "themes";
    },
    groupByFormats() {
      this.grouping = "formats";
    },
    toggleGroupBy({ value }) {
      this.grouping = value ? "formats" : "themes";
    },
  },
  metaInfo() {
    return {
      meta: this.journal
        ? [
            { property: "og:title", content: this.journal.title },
            { property: "og:type", content: "website" },
            {
              property: "og:image",
              content: "https://biccs.dh.gu.se/biccs_2021.png",
            },
            {
              property: "og:url",
              content: "https://biccs.dh.gu.se/",
            },
            { property: "og:description", content: this.journal.presentation },
            { property: "description", content: this.journal.presentation },
          ]
        : [],
    };
  },
};
</script>

<style lang="scss" scoped>
.journal {
  background-color: rgba(70, 70, 70, 1);
  color: white;
}

.title {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  font-size: 200px;
  line-height: 0.75;
  color: white;
  font-size: 6rem;
  margin-bottom: 2rem;
}

.body {
  columns: 15em 2;
  ::v-deep p:first-child {
    margin-top: 0;
  }
}

.active {
  font-weight: 300;
  color: rgb(150, 240, 255);
}

.grouping-select {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  font-size: 25px;
  margin-top: -20px;
  color: white;
}

.group {
  margin-top: 2rem;
  color: white;
  font-size: 20px;
}

.articles {
  display: flex;
  flex-wrap: wrap;

  .teaser {
    transition: all 0.2s ease-in-out;
    min-width: 400px;
    width: 33.3%;
    margin-bottom: 10px;

    @media screen and (max-width: 1700px) {
      width: 50%;
    }

    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }
}
</style>
