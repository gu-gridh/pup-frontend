<template>
  <section :id="'section-' + order" class="article-section">
    <div class="content-container">
      <div class="order-and-video">
        <div class="order">
          <a @click="copyLinkToClipboard">{{ order }}</a>
          <div v-if="copied" class="copied-tooltip">Copied!</div>
        </div>
        <div class="VisualModule">
          <div class="sketchfab-embed-wrapper">
            <iframe
              title="Embedded 3D Model"
              frameborder="0"
              allowfullscreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              :src="section.model_address + '/embed'"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiUrl } from "@/assets/api";

export default {
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

.VisualModule {
    display: flex; // Added
    justify-content: center; // Added
    flex-grow: 1; // Added
  }

  .sketchfab-embed-wrapper {
    flex-grow: 1;
    position: relative;
    width: 100%;
    &:before {
      content: '';
      display: block;
      padding-top: 56.25%; // Adjust this value for desired aspect ratio (e.g., 75% for 4:3 aspect ratio)
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>