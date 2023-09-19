<template>
  <aside v-if="header" id="header">
    <div class="container">
      <router-link v-if="header.route" :to="header.route" :title="header.label">
        {{ header.label }}
      </router-link>
      <a
        v-if="header.href"
        :href="header.href"
        :target="header.target || ''"
        :title="header.label"
      >
        {{ header.label }}
      </a>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapState(["header"])
  }
};
</script>

<style lang="scss" scoped>
#header {
  background-color: #333;
  color: #eaeae7;
  font-family: "Teko", sans-serif;
  font-size: 30px;
  line-height:1.0;
  display: flex;

  @media screen and (max-width: 1000px) {
    .container {
      padding: 20px 20px;
    }
  }
}

a {
  color: white;
  &:hover {
    color: white;
    text-decoration: underline;
  }
}
</style>
