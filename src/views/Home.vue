<template>
  <div v-if="journal" class="home">
    <div class="top">
      <video id="videoBG" poster="/poster.jpg" autoplay muted loop playsinline>
        <source src="/introvideocompressed.mp4" type="video/mp4" />
      </video>

      <div class="container">
        <div class="journalheader">
          <img src="/biccs_2021-s.png" />
          <div class="title">{{ journal.title }}</div>
          <div class="home-menu">
            <div
              class="home-menu-item"
              @click="toggleJournalPage('about')"
              :class="{ active: journalPage === 'about' }"
            >
              About BICCS
            </div>
            <div
              class="home-menu-item"
              @click="toggleJournalPage('contact')"
              :class="{ active: journalPage === 'contact' }"
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="container journal-content">
        <TransitionExpand>
          <div v-if="journalPage === 'about'">
            <h2>About BICCS</h2>
            <div
              v-html="parseMarkdown(journal.presentation)"
              class="journalpresentation"
            />
          </div>
        </TransitionExpand>

        <TransitionExpand>
          <div v-if="journalPage === 'contact'">
            <h2>Contact</h2>
            <div v-html="parseMarkdown(journal.contact)" />
          </div>
        </TransitionExpand>
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
            @change="toggleGroupBy"
            :color="{ unchecked: '#333', checked: '#333' }"
            :sync="true"
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
import showdown from "showdown";
import { ToggleButton } from "vue-js-toggle-button";
import { getJournal, getArticles } from "@/assets/api";
import TransitionExpand from "@/components/TransitionExpand";
import Teaser from "@/components/Teaser";

const showdownConverter = new showdown.Converter();

export default {
  name: "Home",
  components: { TransitionExpand, ToggleButton, Teaser },
  data() {
    return {
      journal: null,
      journalPage: "",
      articles: null,
      grouping: "themes",
    };
  },
  computed: {
    groups() {
      return this.journal ? this.journal[this.grouping] : [];
    },
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      getJournal(1).then((journal) => {
        this.journal = journal;
        document.title = this.journal.title;
      });

      getArticles().then((articles) => (this.articles = articles));

      this.$store.commit("setHeader", {
        href: "https://craftsciencesconference.com/",
        label: "Biennial International Conference for the Craft Sciences",
      });
    },
    toggleJournalPage(name) {
      this.journalPage = this.journalPage === name ? "" : name;
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
    parseMarkdown(md) {
      return showdownConverter.makeHtml(md);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}

.top {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.2),
    0 6px 40px 0 rgba(0, 0, 0, 0.19);
  z-index: 100;
  opacity: 0.99;
  transform: translateZ(0);
  overflow: hidden;
}

.videocontainer {
  position: absolute;
  width: 100%;
  height: 100%;
}

#videoBG {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  transform: translateZ(0);
  overflow: hidden;
  z-index: -1;
}

.journalheader {
  padding: 50px 0px 20px 0px;

  img {
    display: block;
    width: 200px;
  }
}

.title {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  font-size: 200px;
  line-height: 0.75;
  margin-top: 60px;
  max-width: 1100px;
  margin-left: -0.05em;

  @media screen and (max-width: 1200px) {
    font-size: 14vw;
  }
}

.home-menu {
  margin-top: 20px;
  font-family: "Teko", sans-serif;
  line-height: 0.8;

  font-size: 40px;
  margin-left: -10px;
}

.home-menu-item {
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  border-radius: 5px;
  padding: 10px 10px 5px 10px;
}
.home-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.journal-content {
  padding: 2rem 0;
  color: white;
  font-size: 1.25rem;
  text-align: justify;
}

.journalpresentation {
  columns: 2;
  column-gap: 40px;

  ::v-deep & p:first-child {
    margin-top: 0;
  }

  ::v-deep & p:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 1500px) {
    columns: 1;
  }
}

.main {
  padding: 0 0px 4rem 0px;
  background-color: rgba(70, 70, 70, 1);
  z-index: 1;
  width: 100%;
}

.collections {
  font-family: "Teko", sans-serif;
  font-weight: 100;
}

.active {
  font-weight: 300;
  color: rgb(150, 240, 255);

  .top & {
    color: #009eb8;
  }
}

.grouping-select {
  font-family: "Teko", sans-serif;
  font-size: 25px;
  margin-top: 0px;
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
    width: 33.33%;
    margin: 0;

    @media screen and (max-width: 1700px) {
      width: 50%;
    }

    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }
}
</style>
