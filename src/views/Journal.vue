<template>
  <div v-if="journal" class="journal">
    <div class="main">
      <div class="container">
        <h1 class="title">
          {{ journal.identifier }}
        </h1>
        <div class="body" v-html="journalHtml" />
      </div>
      <div class="collections container" style="margin-top:30px;">
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
          <!--<p :style="group.description && group.description.length > 250 ? 'column-count: 2;' : 'column-count: 1;'"> -->
          <p :style="group.description && group.description.length > 250 ? 'column-count: 2;' : 'column-count: 1;'">
            {{ group.description }}
          </p>
          <div v-if="articles" class="articles">
            <Teaser
              v-for="articlePartial of group.articles"
              :key="articlePartial.id"
              :journal-name="journalName"
              :article="
                articles.find(article => article.id === articlePartial.id) ||
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
      grouping: "themes"
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
    }
  },
  activated() {
    this.load();
  },
  methods: {
    ...mapMutations(["reportNotFound"]),
    load() {
      getJournal(this.journalName).then(journal => {
        if (!journal) {
          this.reportNotFound();
          return;
        }
        this.journal = journal;
        document.title = this.journal.title;
      });

      getArticles().then(articles => (this.articles = articles));

      this.$store.commit("setHeader", {
        route: "/",
        label: "Biennial International Conference for the Craft Sciences"
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
    }
  },
  metaInfo() {
    return {
      meta: this.journal
        ? [
            { property: "og:title", content: this.journal.title },
            { property: "og:type", content: "website" },
            {
              property: "og:image",
              content: "https://biccs.dh.gu.se/biccs_2021.png"
            },
            {
              property: "og:url",
              content: "https://biccs.dh.gu.se/"
            },
            { property: "og:description", content: this.journal.presentation },
            { property: "description", content: this.journal.presentation }
          ]
        : []
    };
  }
};
</script>

<style lang="scss" scoped>
.journal {
  background-color: rgba(240, 240, 240, 1);
  color: black;
  font-size: 25px;
  font-weight: 200;
}

.title {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  font-size: 200px;
  line-height: 0.75;
  color: black;
  font-size: 6rem;
  margin-bottom: 0rem;
}

.body {
  margin-top:20px;
  columns: 15em 2;
    :first-child {
       margin-top: 0;
     }
}

.active {
  font-weight: 300;
  color: rgb(100, 190, 215);
}

.grouping-select {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  font-size: 25px;
  margin-top: -20px;
  color: black;
}

.group {
  margin-top: 10px;
  color: black;
  font-size: 20px;
  font-weight: 200;
}
p {
  columns: 2;
  text-align: justify;
  column-gap: 40px;
  margin-top:20px;
   margin-bottom:30px;
   -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
               break-inside: avoid;
}

h1 {
  font-weight: 300;
  line-height: 1;
  margin-bottom: -10px;
}

.articles {
  font-family: "Yanone Kaffeesatz", sans-serif;
  display: flex;
  flex-wrap: wrap;
}

  .teaser {
    transition: all 0.2s ease-in-out;
    min-width: 400px;
    width: 20%;
    margin-bottom: 10px;

    @media screen and (max-width: 2500px) {
      width: 25%;
    }

    @media screen and (max-width: 2000px) {
      width: 33.3%;
    }

    @media screen and (max-width: 1700px) {
      width: 50%;
    }
  }


@media screen and (max-width: 1000px) {

  .title {

margin-top:50px;
}

  .grouping-select {
  margin-left:20px;
}


  .articles {
padding:20px;
}

.teaser:hover{
 transform:scale(1.02);
}

.teaser{
  min-width: 100px;
  width: 100% !important;
  height: 20rem;
  border-radius:8px;
  margin-bottom:30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
}



  .body {
    padding:0px 20px;
  margin-top:20px;
  columns: 1;
}

  h1{
    margin-top:10px;
    padding:0px 20px;

  }
  p {
    columns: 1 !important;
    font-size: 20px;
    padding:0px 20px;
    text-align:left;
  }
  .group {
   
  }
}
</style>
