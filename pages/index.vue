<template>
  <section></section>
</template>

<script>
import { getLatestJournal } from '@/assets/api'

export default {
  async created() {
    if (process.env.VUE_APP_DEFAULT_JOURNAL) {
      this.gotoJournal(process.env.VUE_APP_DEFAULT_JOURNAL)
    } else {
      const latestJournal = await getLatestJournal()
      this.gotoJournal(latestJournal.identifier)
    }
  },
  methods: {
    gotoJournal(identifier) {
      if (!identifier) {
        throw new Error('Latest journal has no identifier')
      }
      this.$router.push(`/${identifier}`)
    },
  },
}
</script>

<style>
</style>
