<template>
  <aside id="header">
    <!-- <div class="left"></div> -->
    <div class="middle">
      <nuxt-link v-if="header.route" :to="header.route">
        {{ header.label }}
      </nuxt-link>
      <a v-if="header.href" :href="header.href" :target="header.target || ''">
        {{ header.label }}
      </a>
    </div>
    <!-- <div class="right"></div> -->
  </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['header']),
  },
}
</script>

<style lang="scss" scoped>
#header {
  background-color: #333;
  color: #eaeae7;
  font-family: 'Teko', sans-serif;
  font-size: 30px;
  display: flex;
  padding: 20px 10%;

  @media screen and (max-width: 600px) {
    padding: 10px 10%;
  }
}

a {
  color: white;
  &:hover {
    color: white;
    text-decoration: underline;
  }
}

.left,
.right {
  width: 10%;
  text-align: right;
}

.middle {
  flex: 2;
}

.right {
  flex: 1;
}
</style>
