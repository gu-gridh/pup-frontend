<template>
  <section></section>
</template>

<script>
import { getLatestJournal } from "@/assets/api";

export default {
  created() {
    this.load();
  },
  activated() {
    this.load();
  },
  methods: {
    async load() {
      if (process.env.VUE_APP_DEFAULT_JOURNAL) {
        this.gotoJournal(process.env.VUE_APP_DEFAULT_JOURNAL);
      } else {
        const latestJournal = await getLatestJournal();
        this.gotoJournal(latestJournal.identifier);
      }
    },
    gotoJournal(identifier) {
      if (!identifier) {
        throw new Error("Latest journal has no identifier");
      }
      this.$router.push(`/${identifier}`);
    },
  },
};
</script>

<style>
</style>
