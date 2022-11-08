<template>
  <div class="main-gallery">
    <div v-for="image in images" :key="image.id" class="images-item">
      <img :src="imageUrl(image)" />
    </div>
  </div>
</template>

<script>
import { apiUrl, getImageAtLeast } from "@/assets/api";

export default {
  name: "MainGallery",
  props: ["images"],
  methods: {
    imageUrl(image) {
      return image && apiUrl(getImageAtLeast(image, 1000).url);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
