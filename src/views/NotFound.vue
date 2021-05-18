<template>
  <div></div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["reportNotFound"]),
  },
  activated() {
    this.reportNotFound();
  },
};
</script>

<style>
</style>
