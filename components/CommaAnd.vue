<template>
  <span>
    <span v-for="(item, i) in items" :key="i"
      ><slot name="item" :item="item">{{ item }}</slot
      >{{ [null, and, comma][Math.min(items.length - i - 1, 2)] }}</span
    >
  </span>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: Array },
    comma: { type: String, default: () => ', ' },
    and: { type: String, default: () => ' & ' },
  },
}
</script>
