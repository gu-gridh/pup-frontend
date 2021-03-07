<template>
  <div class="article-downloads">
    <a
      v-for="download in downloads"
      :key="download.id"
      :href="apiUrl(download.url)"
      class="download blind popout"
    >
	<div class="downloadmeta">
      <div class="download-title">{{ download.caption }}</div>
      <div class="download-description">Format: 
        {{ download.ext.slice(1).toUpperCase() }}
      </div>
      <div class="download-description">File size: 
        {{ download.ext.slice(1).toUpperCase() }}
      </div>
	     </div>
    </a>
  </div>
</template>

<script>
import { apiUrl } from "@/assets/api";

export default {
  props: ["downloads"],
  methods: {
    apiUrl,
  },
};
</script>

<style lang="scss" scoped>
.article-downloads {
  display: flex;
  flex-wrap: wrap;
 
	
  .downloadmeta{
  padding:0rem;
 
  }
  
  .download {
  height: 5rem;
   
	position:relative;
    background: url(../../assets/file.png) no-repeat;
    background-size: 4rem;
    background-position: 0.5rem 50%;
    border: thin dashed #666;
    border-radius: 0.5rem;
    margin-right: 1rem;
    padding: 0.7rem 1rem 1rem 4.5rem;
    margin-bottom: 1rem;


	
    width: calc(30.33% - 1.0rem);
    box-sizing: border-box;
	
   

    @media screen and (max-width: 1100px) {
      width: calc(50% - 1.0rem);
    }

    @media screen and (max-width: 600px) {
      width: 100%;
    }
   

    .download-description {
      font-size: 80%;
	  margin-top:3px;
	  font-weight:300;
    }
  }

  @media screen and (max-width: 600px) {
    margin-right: -2rem;

    .download {
      width: 100%;
      margin-right: 0rem;
    }
  }
  }
  


</style>
