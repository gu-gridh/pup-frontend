<template>
  <div id="app">
    <Header />
    <main>
      <router-view v-slot="{ Component, route }">
        <template v-if="Component">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </template>
      </router-view>
      <div v-if="notFound" class="container">
        <h2>Page not found</h2>
        <p>
          You might want to try the
          <router-link to="/">front page</router-link>.
        </p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: { Header, Footer },
  computed: {
    ...mapState(["notFound"])
  },
  methods: {
    ...mapMutations(["clearNotFound"])
  },
  unmounted() {
    this.clearNotFound();
  },
  watch: {
    $route() {
      this.clearNotFound();
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Teko:wght@300;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@200;300&display=swap");
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:100,200,300,400,500,600&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-size: 20px;

  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
}
body {
  position: absolute;
  color: black;
  background: white;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 100;
  line-height: 1.3;
  margin: 0;
  height: 100%;
  width: 100%;
}

.intro .body {
  font-size: 35px;
  text-align: justify;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-weight: 100;
}

.title {
  font-family: "Teko", sans-serif;
  font-weight: 100;
  line-height: 1.3;
}

h1 {
  font-size: 2rem;
  line-height: 1.5;
  margin-top: 4rem;
}
h2 {
  font-size: 2rem;
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

.VisualModule {
  width: 97%;
  margin: 30px auto;
  padding: 30px;
  border-radius: 15px;
  background-color: rgb(40, 40, 40);
  color: white;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.2),
    0 6px 40px 0 rgba(0, 0, 0, 0.19);

  @media screen and (min-width: 600px) {
    width: 82%;
  }

  > :first-child {
    margin-top: 0;
  }
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
  font-family: "Yanone Kaffeesatz", sans-serif;
  font-size: 0.9em;
}

iframe {
  border: none;
}

img {
  max-width: 100%;
}
</style>
