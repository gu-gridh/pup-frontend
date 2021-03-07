<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: { Header },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@300;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@200;300&display=swap");

html {
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
}
body {
  color: black;
  background: white;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 100;
  line-height: 1.3;
  margin: 0;
  width:100%;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 100;
}

.title {
  font-family: 'Teko', sans-serif;
  font-weight: 100;
  line-height: 1.3;
}

h1 {
 font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2.0rem;
   font-weight: 100;
      line-height: 1.5;
	  margin-top:4rem;
}
h2 {
 font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 2.0rem;
   line-height: 0.5;
}

a,
a:hover {
  color: #159cea;
  text-decoration: none;
}
a.blind,
a.blind:hover {
  color: inherit;
  text-decoration: inherit;
}
.popout {
  position: relative;
  display: block;
  transition: transform 150ms ease;
  &:hover {
    transform: scale(1.02);
    z-index: 3;
  }
}

.VisualModule{
 width:77%;
 margin-top:30px; 
  margin-bottom:60px; 
 padding:30px;
 margin-left:9%;
 float:left;
border-radius:15px;
background-color:rgb(40, 40, 40);
 box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.2), 0 6px 40px 0 rgba(0, 0, 0, 0.19);
 }

.container {
  width: 95%;
  margin: auto;

  &:not(.snug) {
    padding: 1rem 0;
  }

  @media screen and (min-width: 600px) {
    width: 80%;
  }
}

pre,
code {
 font-family: 'Yanone Kaffeesatz', sans-serif;
  font-size: 0.9em;
}

iframe {
  border: none;
}
</style>
