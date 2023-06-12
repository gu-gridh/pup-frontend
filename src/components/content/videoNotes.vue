<template>
  <section :id="'section-' + order" class="article-section">
    <div class="content-container">
      <div class="order-and-video">
        <div class="order">
          <a @click="copyLinkToClipboard">{{ order }}</a>
          <div v-if="copied" class="copied-tooltip">Copied!</div>
        </div>
        <div class="video-container">
          <MainVideo class="full-width-video" :guplay-id="section.video_guplayId" />
        </div>
      </div>
      <div class="section-text">{{section.video_text}}</div>
    </div>
  </section>
</template>

<script>
import { apiUrl } from "@/assets/api";
import MainVideo from "@/components/article/MainVideo.vue";

export default {
  components: {
    MainVideo, 
  },
  props: ["section", "order"],
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    apiUrl,
    copyLinkToClipboard() {
      this.copied = true;
      const link = `${window.location.origin}${window.location.pathname}#section-${this.order}`;
      navigator.clipboard.writeText(link);
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-section {
  margin: 1.5rem 0;
  scroll-margin-top: 1rem;
}

.order-and-video {
  display: flex;
}

.order {
  cursor: pointer;
  padding-right: 1rem;
  position: relative;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.copied-tooltip {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 5px;
  border-radius: 3px;
  font-size: 0.9rem;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(100% + 5px);
  z-index: 10;
}

.video-container {
  width: 100%;
}

.section-text {
  margin-top: 1rem;
  text-align: right;
  padding-right: 5rem; // Adjust this value to control the spacing from the right
}

.full-width-video {
  width: 100%;
}
</style>