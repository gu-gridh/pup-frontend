<template>
  <router-link
    tag="div"
    :to="route"
    class="teaser"
    :class="{ 'no-image': !image }"
    :style="{
      backgroundColor: strToColor(article.title),
      backgroundImage: `url(${image})`,
    }"
  >
    <div class="text">
      <div class="group">
        <div class="title main">{{ article.title }}</div>
        <div v-if="article.subtitle" class="title sub group">
          {{ article.subtitle }}
        </div>

        <div v-if="article.authors" class="title author">
          {{ commaAnd(article.authors.map(fullName)) }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { commaAnd, fullName, strToColor } from "@/assets/util";
import { apiUrl, getImageAtLeast } from "@/assets/api";

export default {
  name: "Teaser",
  props: ["article"],
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
          identifier: this.article.identifier,
          revision: this.article.revision,
        },
      };
    },
  },
  methods: {
    apiUrl,
    commaAnd,
    fullName,
    strToColor,
  },
};
</script>

<style lang="scss" scoped>
.teaser {
  margin: 0.5rem 10;
  height: 15rem;
  border-radius: 0px;
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
  margin-left: 55%;
  height: 100%;
  position: relative;
  color: white;
  padding: 1rem 1rem 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.2s ease-in-out;
  z-index: 20;
  top: 0;
  border-style: solid;
  border-width: 0px 0px 0px 0.5px;
  border-color: black;
  cursor: pointer;
  text-align: left;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2),
    0 6px 40px 0 rgba(0, 0, 0, 0.19);
}

.title {
  color: white;
  font-family: "Yanone Kaffeesatz", sans-serif;
}

.main {
  font-size: 26px;
  font-weight: 600;
  line-height: 1.1;
  margin-top: 15px;
}

.sub {
  font-size: 20px;
  font-weight: 300;
  line-height: 1.1;
  display: none;
  margin-top: 10px;
}

.author {
  font-size: 18px;
  margin-top: 30px;
  font-weight: 300;
  display: none;
}

.group {
}

.teaser:hover {
  z-index: 10;
  cursor: pointer;
  .text {
    margin-left: 20%;

    background: rgba(0, 0, 0, 0.99);
    cursor: pointer;
  }
  .group {
  }
  .author {
    display: block;
  }
  .sub {
    display: block;
  }
  .main {
  }
}

@media screen and (max-width: 600px) {
  .text,
  .teaser:hover .text {
    margin-left: 0;
  }

  .author,
  .sub {
    display: block;
  }
}
</style>
