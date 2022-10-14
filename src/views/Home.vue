<template>
  <section v-if="venue">
    <div class="top">
      <video id="videoBG" poster="/poster.jpg" autoplay muted loop playsinline>
        <source src="/introvideocompressed.mp4" type="video/mp4" />
      </video>

      <div class="container">
        <div class="header">
          <img src="/biccs.png" alt="BICCS" title="Logo" />
          <div class="title">
            {{ venue.title }}
          </div>
          <div class="info-menu">
            <div
              v-for="page in venue.pages"
              :key="page.id"
              class="info-menu-item"
              :class="{ active: tab === page.id }"
              @click="toggleTab(page.id)"
            >
              {{ page.heading }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <TransitionExpand>
      <div v-if="tab" class="info">
        <div class="container">
          <TransitionExpand v-for="page in venue.pages" :key="page.id">
            <div v-if="tab === page.id">
              <h2>{{ page.heading }}</h2>
              <div v-html="parseMarkdown(page.body)" />
            </div>
          </TransitionExpand>
        </div>
      </div>
    </TransitionExpand>

    <div class="main">
      <div v-if="venue.journals.length" class="journal-menu">
        <div class="container">
         Past editions: 
          <router-link
            v-for="journal in venue.journals"
            :key="journal.id"
            :to="`/${journal.identifier}`"
            class="journal-menu-item"
          >
            {{ journal.identifier }}
          </router-link>
        </div>
      </div>

      <div v-if="venue.introduction || venue.files.length" class="intro">
        <div class="container">
          <h2>BICCS 2023</h2>
          <div class="introduction" style="" v-html="parseMarkdown(venue.introduction)" />
          <Downloads :downloads="venue.files" class="venue-downloads" />
        </div>
      </div>

      <div v-if="venue.images.length" class="gallery">
        <CaptionedImage
          v-for="image in venue.images"
          :key="image.id"
          :src="imageUrl(image.image)"
          :caption="image.caption"
        />
      </div>

    

      <footer v-if="venue.footer" class="venue-footer">
        <div class="container">
          <h2>{{ venue.footer.heading }}</h2>
          <div v-html="venue.footer.body" />
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import TransitionExpand from "@/components/TransitionExpand";
import { apiUrl, getImageAtLeast, getVenue } from "@/assets/api";
import { parseMarkdown } from "@/assets/markdown";
import Downloads from "@/components/article/Downloads.vue";
import CaptionedImage from "@/components/CaptionedImage.vue";

export default {
  components: { TransitionExpand, Downloads, CaptionedImage },
  data() {
    return {
      venue: null,
      tab: "",
    };
  },
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    parseMarkdown,
    async load() {
      this.loadVenue();
      this.$store.commit("setHeader", {
        route: "/",
        label: "Biennial International Conference for the Craft Sciences",
      });
    },
    async loadVenue() {
      this.venue = await getVenue();
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
    imageUrl(image) {
      return apiUrl(getImageAtLeast(image, 1000).url);
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

<style lang="scss" scoped>


.introduction{
    letter-spacing: 1.0px;
  font-size:22px;
    columns:2;
    column-gap:40px;
    text-align:left;

    :first-child {
      margin-top: 0;
    }
    margin-bottom: 2rem;
}

.intro {
  h2 {
    font-family: "Teko", sans-serif;
    font-size: 3rem;
    margin-block: 1rem;
  }
}


::v-deep .intro h3 {
  margin-block-end:0.5em;
    margin-block-start:0em;
  line-height:1.2;
}

::v-deep .intro h3 a:link{
  color:black;
}

::v-deep .intro h3 a:visited{
  color:black;
}

::v-deep .intro h3 a:hover{
   color: #159cea;
}

::v-deep .intro h3 a:link{
  background-image:url(/linkbutton.png);
    background-size:19px;
       background-repeat:no-repeat;
       padding-left:30px;
       background-position: 0px 0px;
       
  
}

  @media screen and (max-width: 900px) {

.introduction{
  font-size:30px;
  columns:1;
}

::v-deep .intro h3 a:link{
  background-image:url(/linkbutton.png);
    background-size:28px;
       background-repeat:no-repeat;
       padding-left:45px;
       background-position: 0px 0px;
       
  
}
  }

.top {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
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

.header {
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
  box-shadow: inset 0 10px 20px 0px rgba(0, 0, 0, 0.2),
    inset 0 6px 40px 0 rgba(0, 0, 0, 0.19);
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




.venue-footer {
  padding: 0 0 1rem;
  background-color: rgba(70, 70, 70, 1);
  box-shadow: inset 0 10px 20px 0px rgba(0, 0, 0, 0.2),
    inset 0 6px 40px 0 rgba(0, 0, 0, 0.19);
  color: white;
}


</style>
