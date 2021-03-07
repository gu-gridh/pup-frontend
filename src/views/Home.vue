<template>
  <div v-if="journal" class="home">

  <div class="top">

  <video id="videoBG" poster="/poster.jpg" autoplay muted loop playsinline>
      <source src="/introvideo.mp4" type="video/mp4">
  </video>

    	<div class="container">
		 	<div class="journalheader">
     	   		<img src="/biccs_2021.png" />
     	  	  	<div class="title">{{ journal.title }}</div>		
			<div class="home-menu"><div class="home-menu-item">About BICCS</div><div class="home-menu-item">Contact</div>
			</div>
 			   	<div class="journalpresentation" v-html="parseMarkdown(journal.presentation)" />  
  
	    
		 	</div>
		 
			
			
		</div>
	   
	   
   </div>
   
  
	
	  <div class="main">
	  	  <div class="collections">
	  
        <div class="grouping-select">
          <label>Order articles by:</label>
          <span
            :class="{ active: grouping === 'themes' }"
            @click="groupByThemes"
          >
            Theme
          </span>
          <ToggleButton
            :value="grouping === 'formats'"
            @change="toggleGroupBy"
            :color="{ unchecked: '#333', checked: '#333' }"
            :sync="true"
          />
          <span
            :class="{ active: grouping === 'formats' }"
            @click="groupByFormats"
          >
            Format
          </span>
    
    
	  </div>
      <div v-for="group in groups" :key="group.id" class="group">
        <h1>{{ group.heading }}</h1>
        <p>{{ group.description }}</p>
        <div class="articles">
          <Teaser
            :article="
              articles.find((article2) => article.id === article2.id) || article
            "
            v-for="article of group.articles"
            :key="article.id"
          />
        </div>
      </div>
    </div>
	    </div>

    </div>
</template>

<script>
import showdown from "showdown";
import { ToggleButton } from "vue-js-toggle-button";
import { getJournal, getArticles } from "@/assets/api";
import Teaser from "@/components/Teaser";

const showdownConverter = new showdown.Converter();

export default {
  name: "Home",
  components: { ToggleButton, Teaser },
  data() {
    return {
      journal: null,
      articles: null,
      grouping: "themes",
    };
  },
  computed: {
    groups() {
      return this.journal ? this.journal[this.grouping] : [];
    },
  },
  created() {
    getJournal(1).then((journal) => (this.journal = journal));
    getArticles().then((articles) => (this.articles = articles));
  },
  methods: {
    groupByThemes() {
      this.grouping = "themes";
    },
    groupByFormats() {
      this.grouping = "formats";
    },
    toggleGroupBy({ value }) {
      this.grouping = value ? "formats" : "themes";
    },
    parseMarkdown(md) {
      return showdownConverter.makeHtml(md);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  padding-bottom: 4rem;
  width:100%;
  float:left;
 
}

.top{
float:left;
width:100%;
background-color:rgba(255,255,255,0.7);
box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.2), 0 6px 40px 0 rgba(0, 0, 0, 0.19);
z-index:100;
opacity: 0.99;
 transform: translateZ(0);
 overflow:hidden;


}

.videocontainer{
position:absolute;
width:100%;
height:100%;

}

#videoBG {
position:absolute;
width:100%;
height:100%;
object-fit: fill;
opacity: 0.20;
transform: translateZ(0);
overflow:hidden;
z-index: -1;
}




.journalheader{
padding:50px 0px 40px 0px;
float:left;
}

img {
  width: 200px;

  float:left;
}

.title {
float:left;
  font-family: 'Teko', sans-serif;
  font-weight: 100;
  font-size:200px;
  line-height: 0.75;
  margin-top:60px;
  max-width:1100px;
  margin-left:-10px;

}

.home-menu{
margin-top:20px;
  font-family: 'Teko', sans-serif;
  line-height:0.8;
float:left;
font-size:40px;
margin-left:-10px;
}

.home-menu-item{
cursor:pointer;
float:left;
margin-right:20px;
border-radius:5px;
padding:10px 10px 5px 10px;


}
.home-menu-item:hover{
background-color:rgba(255,255,255,0.5);
}


.journalpresentation{
float:left;
text-align:justify;
display:none;
//background-color:lightgray;//
//padding:0 30px 0 30px;//
columns: 2;
column-gap:40px;
     
  
  
  @media screen and (max-width: 1500px) {
    columns: 1;
  }
  
}
 


.main{
float:left;
padding:50px 0px 0px 0px;
background-color:rgba(70,70,70, 1.0);
z-index:1;
width:100%;
}

.collections{
width:80%;
margin-left:10%;
font-family: 'Teko', sans-serif;
font-weight: 100;

}
.grouping-select span.active {
  font-weight: 300;
  color:rgb(150, 240, 255);
 
}

.grouping-select{
  font-family: 'Teko', sans-serif;
  font-size:25px;
margin-top:0px;
color:white;
}


.group {
  margin-top: 2rem;
  color:white;
  font-size:20px;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;

  .teaser {
   transition: all .2s ease-in-out;
    width: calc(33.33% - 0.0rem);
    margin: 0 0.0rem 0.0rem 0;
    box-sizing: border-box;

    @media screen and (max-width: 1700px) {
      width: calc(50% - 1.0rem);
    }
	
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
}
</style>
