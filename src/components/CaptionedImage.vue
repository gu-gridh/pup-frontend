<template>
  <figure class="captioned-image">
    <img :src="src" :alt="alt" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: "CaptionedImage",
  props: ["src", "alt", "caption"]
};
</script>

<style lang="scss" scoped>
figure {
  position: relative;
  margin: 0;
}

img {
  display: block;
  width: 100%;
}

figcaption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0 0 0 / 0.8);
  color: white;
  padding: 0.2em 0.5em;
}
</style>
