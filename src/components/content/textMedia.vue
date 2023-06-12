<template>
  <section :id="'section-' + order" class="article-section">
  <div class="content-container" :class="{ 'full-width': section.media_fullWidth }">
      <div class="order">
          <a @click="copyLinkToClipboard">{{ order }}</a>
          <div v-if="copied" class="copied-tooltip">Copied!</div>
      </div>
      <div class="image-content">
            <div class="content-ear">
            <a :href="`#${section.label}`">{{ section.label }}</a>
            </div>
            <div :class="{ gallery: section.media_media.length > 1 }">
                <div
                  v-for="media of section.media_media"
                  :key="media.id"
                  class="media-item"
                  :style="{ width: section.media_fullWidth ? '100%' : 'calc(50% - 15px)' }"
                >                
                <img
                  v-if="media.mime.split('/')[0] == 'image'"
                  :src="
                    media.url.slice(0, 4) === 'http' ? media.url : apiUrl(media.url)
                  "
                  class="media-visual"
                />
                <video
                  v-if="media.mime.split('/')[0] == 'video'"
                  playsinline
                  controls
                  class="media-visual"
                >
                  <source
                    :src="
                      media.url.slice(0, 4) === 'http' ? media.url : apiUrl(media.url)
                    "
                    :type="media.mime"
                  />
                </video>
              </div>
            </div>
            <div
              v-if="section.media_caption"
              class="media-caption"
              v-html="section.media_caption"
            />
            <div v-if="section.media_rights" class="media-rights">
              Rights: {{ section.media_rights }}
            </div>
      </div>
      <div class="caption-content">
          <div v-if="section.media_text && section.media_text[0] != '<'" class="content-text content-text-plain">
            <div v-html="parseMarkdown(section.media_text)"></div>
          </div>
        <div v-else class="content-text content-text-html" v-html="section.media_text" />
    </div>
    </div>
  </section>
</template>


<script>
import { apiUrl } from "@/assets/api";
import { parseMarkdown } from "@/assets/markdown";

export default {
  props: ["section", "order"],
   data() {
    return {
      copied: false,
    };
  },
  methods: {
    apiUrl,
    parseMarkdown,
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
  z-index: 1000;
  bottom: calc(100% + 5px); 
}

.content-container {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: auto auto;
  align-items: flex-start;
  gap: 1rem;

  &.full-width {
    grid-template-columns: auto 100%;
  }
}

.order {
  grid-row: 1;
  grid-column: 1;
  cursor: pointer;
  position: relative;
  padding-right: 1rem;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.content-ear {
  grid-row: 1;
  grid-column: 2;
}

.image-content {
  grid-row: 1;
  grid-column: 2 / span 2;
}

.caption-content {
  grid-row: 2;
  grid-column: 2 / span 2;

  .content-container:not(.full-width) & {
    grid-row: 1;
    grid-column: 3;
  }
}

.article-section {
  margin: 1.5rem 0;
  scroll-margin-top: 1rem;

  .content-media {
    margin: 0 0 1rem;
    font-size: 0.9rem;
    text-align: right;
    position: relative;
    // font-family: Signika, sans-serif;

    .media-item {
      margin-bottom: 0.5rem;

      .media-visual {
        max-width: 100%;
      }
    }

    .gallery {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      flex-direction: row-reverse;

      .media-item {
        width: calc(50% - 15px);
        margin: 0 15px 15px 0;

        .media-visual {
          display: block;
        }
      }
    }
  }

  .content-text {
    text-align: justify;

    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 1000px) {
    display: flex;

    .content-media {
      // width: 47.5%;
      margin-right: 5%;

      &::after {
        position: absolute;
        top: 0.25rem;
        left: 103%;
        content: " ";
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        background-image: url("../../assets/chevrons.png");
        background-size: cover;
        transform: scaleX(-1);
      }
    }

    .content-text {
      // width: 47.5%;
    }

    // Every other section is laid out in reverse.
    &:nth-child(2n) {
      flex-direction: row-reverse;

      .content-media {
        margin-left: 5%;
        margin-right: 0;
        text-align: left;

        .gallery {
          flex-direction: row;
        }

        &::after {
          left: auto;
          right: 103%;
          transform: none;
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .content-media {
      // width: 60%;
    }
    .content-text {
      // width: 35%;
    }
  }
}
</style>