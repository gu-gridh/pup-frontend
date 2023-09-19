<template>
  <router-link
    tag="div"
    :to="route"
    class="teaser"
    :class="{ 'no-image': !image }"
    :style="{
      backgroundColor: strToColor(article.title),
      backgroundImage: `url(${image})`
    }"
  >
    <div class="text">
      <div class="teaser-title">{{ article.title }}</div>
      <div v-if="article.subtitle" class="teaser-subtitle">
        {{ article.subtitle }}
      </div>
      <div class="teaser-author">
        {{ commaAnd(article.authors.map(fullName)) }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { commaAnd, fullName, strToColor } from "@/assets/util";
import { apiUrl, getImageAtLeast } from "@/assets/api";

export default {
  name: "Teaser",
  props: ["journalName", "article"],
  computed: {
    image() {
      return (
        this.article.image &&
        apiUrl(getImageAtLeast(this.article.image, 1000).url)
      );
    },
    route() {
      return {
        name: "article",
        params: {
          journalName: this.journalName,
          identifier: this.article.identifier,
          revision: this.article.revision
        }
      };
    }
  },
  methods: {
    apiUrl,
    commaAnd,
    fullName,
    strToColor
  }
};
</script>

<style lang="scss" scoped>
.teaser {
  margin: -1px 0px;
  border-radius: 0px;
  height: 15rem;
  font-weight: 100;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.no-image {
  background-color: #f4f4f4;
}

.text {
  position: absolute;
  color: black;
  font-family: "Yanone Kaffeesatz", sans-serif;
  text-align: left;
  bottom:0px;
  height: 7rem;
  width:100%;
  padding:1rem 1rem 1rem 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
  z-index: 20;
  cursor: pointer;
  box-shadow: 0px -20px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: all 1.5s ease-in-out;
}



.teaser-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.1;
  margin-top: 0px;
  margin-bottom: 10px;
}

.teaser-subtitle {
  font-size: 20px;
  font-weight: 300;
  line-height: 1.1;
  display: none;
  margin-bottom: 10px;
}

.teaser-author {
  border-width: 0.5px 0 0 0;
  padding: 1rem 1rem 0 1rem;
  border-style: dashed;
  border-color: black;
  font-size: 18px;
  margin-top: 10px;
  font-weight: 300;
  line-height: 1;
  width: calc(100% + 2rem);
  margin-left: -1rem;
}

.teaser:hover {
  cursor: pointer;
  .text {
    height: auto;
    min-height: 7.5rem;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
  }
  .teaser-author {
    display: block;
  }
  .teaser-subtitle {
    display: block;
  }
}

@media screen and (max-width: 1000px) {
  .text {
  height: auto;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.0);
  }

  .teaser:hover .text {
    margin-left: 0;
  }

  .teaser-author,
  .teaser-subtitle {
    display: block;
  }
}
</style>
