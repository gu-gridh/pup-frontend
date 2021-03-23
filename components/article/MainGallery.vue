<template>
  <client-only>
    <div
      v-masonry
      transition-duration="0"
      item-selector=".images-item"
      class="main-gallery"
    >
      <div
        v-for="image in images"
        :key="image.id"
        v-masonry-tile
        class="images-item"
      >
        <img :src="apiUrl(image.formats.small.url)" />
      </div>
    </div>
  </client-only>
</template>

<script>
import { apiUrl } from '@/assets/api'

export default {
  name: 'MainGallery',
  props: ['images'],
  methods: {
    apiUrl,
  },
}
</script>

<style lang="scss" scoped>
.main-gallery {
  margin-right: -0.5rem;
}
.images-item {
  width: calc(100% / 3 - 0.5rem);
  margin: 0 0.5rem 0.5rem 0;

  img {
    transition: opacity 150ms ease;
    &:hover {
      opacity: 0.9;
    }
  }

  img {
    display: block;
    width: 100%;
    margin: 0;
  }
}
</style>
