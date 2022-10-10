<template>
  <section>
    <div class="top">
      <video id="videoBG" poster="/poster.jpg" autoplay muted loop playsinline>
        <source src="/introvideocompressed.mp4" type="video/mp4" />
      </video>

      <div class="container">
        <div class="journalheader">
          <img src="/biccs_2021-s.png" alt="BICCS 2021" title="Logo" />
          <div class="title">
            Biennial International Conference for the Craft Sciences
          </div>
          <div class="info-menu">
            <div
              class="info-menu-item"
              :class="{ active: tab === 'about' }"
              @click="toggleTab('about')"
            >
              About BICCS
            </div>
            <div
              class="info-menu-item"
              :class="{ active: tab === 'contact' }"
              @click="toggleTab('contact')"
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </div>

    <TransitionExpand>
      <div v-if="tab" class="info">
        <div class="container">
          <TransitionExpand>
            <div v-if="tab === 'about'">
              <h2>About BICCS</h2>
              Blah
              <!-- <div
                class="journalpresentation"
                v-html="parseMarkdown(journal.presentation)"
              /> -->
            </div>
          </TransitionExpand>
          <TransitionExpand>
            <div v-if="tab === 'contact'">
              <h2>Contact</h2>
              Bleh<br />
              Bleh<br />
              Bleh<br />Bleh
              <!-- <div v-html="parseMarkdown(journal.contact)" /> -->
            </div>
          </TransitionExpand>
        </div>
      </div>
    </TransitionExpand>

    <div class="main">
      <div class="journal-menu">
        <div class="container">
          <div
            v-for="journal in journals"
            :key="journal.id"
            class="journal-menu-item"
          >
            {{ journal.title }}
          </div>
        </div>
      </div>
      <div class="intro">
        <div class="container">
          <h2>Welcome</h2>
          <div class="body">
            <p>
              Löksås ipsum olika ordningens rännil sin räv om sällan, kanske som
              händer det dimmhöljd sin enligt sig sin, dimma när groda precis
              söka björnbär händer. Träutensilierna samma mot hans precis tiden
              både göras att åker äng på, annan där vad varit träutensilierna
              där mot lax faktor verkligen, det annan själv sista kunde kan
              kanske händer häst själv. Nu kom smultron kunde gör sjö vemod
              genom precis tidigare hans, har dock stig ordningens att kanske
              hela så kanske redan helt, regn vid det strand groda rännil därmed
              tid precis.
            </p>
            <p>
              Sig tid jäst dock hans vid groda del fram hans verkligen miljoner,
              dimma annat tiden där äng vid plats genom varit har hav, att tid
              hela annat år och jäst mjuka se vid.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import showdown from "showdown";
import TransitionExpand from "@/components/TransitionExpand";
import { getLatestJournal } from "@/assets/api";

const showdownConverter = new showdown.Converter();

export default {
  components: { TransitionExpand },
  data() {
    return {
      tab: "about",
      journals: null,
    };
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    async load() {
      this.$store.commit("setHeader", {
        href: process.env.BASE_URL,
        label: "Biennial International Conference for the Craft Sciences",
      });
      this.journals = [await getLatestJournal()];
    },
    toggleTab(name) {
      this.tab = this.tab === name ? "" : name;
    },
    gotoJournal(identifier) {
      if (!identifier) {
        throw new Error("Journal has no identifier");
      }
      this.$router.push(`/${identifier}`);
    },
    parseMarkdown(md) {
      return showdownConverter.makeHtml(md);
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          property: "og:title",
          content:
            "Biennial International Conference for the Craft Sciences (BICCS)",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: location.origin + location.pathname,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.top {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.2),
    0 6px 40px 0 rgba(0, 0, 0, 0.19);
  z-index: 100;
  position: relative;
  opacity: 0.99;
  transform: translateZ(0);
  overflow: hidden;
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
.info-menu {
  margin-top: 20px;
  font-family: "Teko", sans-serif;
  line-height: 0.8;

  font-size: 40px;
  margin-left: -10px;
}

.info-menu-item {
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  border-radius: 5px;
  padding: 10px 10px 5px 10px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  &.active {
    font-weight: 300;
    color: #009eb8;
  }
}

.info {
  background-color: rgba(70, 70, 70, 1);
  color: white;
  z-index: 1;
  width: 100%;
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

.journal-menu {
  margin-left: -0.05em;
  padding: 0.5rem 0 1rem;
  border-bottom: thin solid #f4f4f4;
  font-family: "Teko", sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 0.75;

  .journal-menu-item {
    color: #888;
    &:hover {
      color: inherit;
    }
  }
}

.intro {
  h2 {
    font-family: "Teko", sans-serif;
    font-size: 3rem;
    margin-block: 1rem;
  }
  .body {
    columns: 15em;
    :first-child {
      margin-top: 0;
    }
  }
}
</style>
