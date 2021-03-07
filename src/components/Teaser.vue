<template>
  <router-link
    tag="div"
    :to="route"
    class="teaser"
    :class="{ 'no-image': !image }"
    :style="{
      backgroundColor: strToColor(article.title),
      backgroundImage: `url(${image})`,
    }"
  >
    <div class="text">
	
	<div class="group">
  <div class="title main"> {{ article.title }}	</div>
      <div v-if="article.subtitle" class="title sub group">
        {{ article.subtitle }}
      </div>

	  
	    
      <div v-if="article.authors" class="title author">
        {{ commaAnd(article.authors.map(fullName)) }}
      </div>
	  </div>
    </div>
	
  </router-link>
</template>

<script>
import { commaAnd, fullName, strToColor } from "@/assets/util";
import { apiUrl } from "@/assets/api";

export default {
  name: "Teaser",
  props: ["article"],
  computed: {
    image() {
      return this.article.image && apiUrl(this.article.image.formats.large.url);
    },
    route() {
      return {
        name: "article",
        params: {
          identifier: this.article.identifier,
          revision: this.article.revision,
        },
      };
    },
  },
  methods: {
    apiUrl,
    commaAnd,
    fullName,
    strToColor,
  },
};
</script>

<style lang="scss" scoped>
.teaser {
  margin: 0.5rem 10;
  height: 12rem;
  
  font-weight: 100;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;

 
}

.no-image {
  background-color: #f4f4f4;
}

.text {
margin-left:55%;
with:600px;
 height: 100%;
 font-family: 'Yanone Kaffeesatz', sans-serif;
  position: relative;
  padding: 1rem 1rem 1rem;
  background: rgba(255, 255, 255, 0.85);
   transition: all .2s ease-in-out;
  z-index: 20;
  top: 0;
    cursor: pointer;

}



.title {
color:black;
  font-family: 'Yanone Kaffeesatz', sans-serif;

}

.main {
  font-size: 35px;
  font-weight:600;
  line-height:1.0;
    margin-top:15px;

}


.sub {
   font-size: 25px;
  font-weight:300;
  line-height:1.0;
  display:none;
   margin-top:10px;
	
}

.author {
  font-size: 15px;
 margin-top:30px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight:300;
    display:none;

}

  .group{
  
}


.teaser:hover {
  z-index: 10;
      cursor: pointer;
 .text {
    margin-left:20%;
	 background: rgba(255, 255, 255, 0.95);
	     cursor: pointer;
  }
  .group{
}
.author{
display:block;
}
.sub{
display:block;
}
.main{
}

  
}


</style>
