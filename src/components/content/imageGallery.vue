<template>
  <section :id="'section-' + order" class="article-section">
    <div class="content-container">
      <div class="order">
        <a @click="copyLinkToClipboard">{{ order }}</a>
        <div v-if="copied" class="copied-tooltip">Copied!</div>
      </div>
      <div class="VisualModule">
      <div class="right-side">
        <div class="main-gallery">
          <div v-for="image in section.image_gallery_media" :key="image.id" class="images-item">
            <img :src="imageUrl(image)" />
          </div>
        </div>
        </div>
        <div class="gallery-caption">
          {{ section.image_gallery_text }}
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
    imageUrl(image) {
      const format = image.formats.medium || image.formats.small || image;
      return apiUrl(format.url);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-section {
  margin: 1.5rem 0;
  scroll-margin-top: 1rem;
}

.content-container {
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

.main-gallery {
  columns: 250px 3;
  column-gap: 0.5rem;
}

.images-item {
  margin-bottom: 0.5rem;

  img {
    display: block;
    width: 100%;
    transition: opacity 150ms ease;
    &:hover {
      opacity: 0.85;
    }
  }
}

.right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.gallery-caption {
  margin-top: 0.5rem;
}
</style>