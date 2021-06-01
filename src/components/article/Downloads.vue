<template>
  <div class="article-downloads">
    <a
      v-for="download in downloads"
      :key="download.id"
      :href="apiUrl(download.url)"
      :title="download.caption"
      class="download blind popout"
    >
      <div class="downloadmeta">
        <div class="download-title">{{ download.caption }}</div>
        <div class="download-description">
          Format:
          {{ download.ext.slice(1).toUpperCase() }}
        </div>
        <div v-if="download.size" class="download-description">
          File size:
          {{ size(download.size) }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import filesize from "filesize";
import { apiUrl } from "@/assets/api";

export default {
  props: ["downloads"],
  methods: {
    apiUrl,
    size(size) {
      // If size is 273503 bytes, Strapi says `273.5`
      // Express with suitable unit (KB, MB...)
      const str = filesize(size * 1000, { round: 1 });
      // Use regex to remove the decimal if more than 2 figures.
      return str.replace(/(\d\d)\.\d+/, "$1");
    },
  },
};
</script>

<style lang="scss" scoped>
.article-downloads {
  display: flex;
  flex-wrap: wrap;
  margin-right: -1rem;

  .downloadmeta {
    padding: 8px 5px 00px 30px;
  }

  .download {
    height: 140px;

    position: relative;
    background: url(../../assets/file.png) no-repeat;
    background-size: 120px;
    background-position: 0.5rem 50%;
    border: thin dashed #666;
    border-radius: 0.5rem;
    margin-right: 1rem;
    padding: 0.7rem 1rem 1rem 4.5rem;
    margin-bottom: 1rem;

    width: calc(25% - 1rem);

    @media screen and (max-width: 1700px) {
      width: calc(33.33% - 1rem);
    }

    @media screen and (max-width: 1200px) {
      width: calc(50% - 1rem);
    }

    @media screen and (max-width: 800px) {
      width: 100%;
    }

    .download-description {
      font-size: 16px;
      margin-top: 3px;
      font-weight: 300;
    }

    .download-title {
      font-size: 24px;
      line-height: 1.1;
      height: 53px;
      overflow: hidden;
    }
  }

  @media screen and (max-width: 600px) {
    margin-right: 0;

    .download {
      width: 100%;
      margin-right: 0rem;
    }
  }
}
</style>
