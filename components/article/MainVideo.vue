<template>
  <div v-if="guplayId" class="mainvisual-video-wrapper">
    <iframe
      :src="`https://play.gu.se/embed/secure/iframe/entryId/${guplayId}/uiConfId/23450401`"
      class="mainvisual-video"
      allowfullscreen
      webkitallowfullscreen
      mozAllowFullScreen
      allow="autoplay *; fullscreen *; encrypted-media *"
      sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  props: ['guplayId'],
}
</script>

<style>
.mainvisual-video {
  width: 100%;
  /* TODO Set height dynamically from video's aspect ratio? */
  height: 45vw;
}
</style>
