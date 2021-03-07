<template>
  <div class="meta-item">
    <span class="label">{{ label }}</span
    >:
    <span class="value"><slot /></span>
  </div>
</template>

<script>
export default {
  props: ["label"],
};
</script>

<style>
.meta-item {
  font-weight: 600;
  line-height: 1.5;
}
.value {
  font-weight: 100;
}
</style>
