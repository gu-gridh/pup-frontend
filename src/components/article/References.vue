<template>
  <div class="container article-references">
    <h2>References</h2>
    <div class="references-list">
      <div
        v-for="reference in references"
        :key="reference.id"
        class="references-item"
      >
        {{ reference.content }}
      </div>

      <div
        v-for="extra in extras"
        :key="extra.label"
        class="references-item references-extra"
      >
        <div class="extra-label">
          {{ extra.label }}
        </div>
        <span v-for="(item, i) in extra.items || [extra.item]" :key="i">
          {{ item }}<br />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["references", "extras"],
};
</script>

<style lang="scss" scoped>
.article-references {
font-size:15px;
text-align:justify;
font-weight:300;

.references-list {
      columns: 4 100px;
	  column-gap:50px;
  margin: 1rem auto 0;

    @media screen and (max-width: 1500px) {
      columns: 3 100px;
	  column-gap:50px;
    }
	
	
    @media screen and (max-width: 1000px) {
      columns: 2 100px;

    }
	

    .references-item {
      margin-bottom: 1rem;
      padding-left: 0em;
      text-indent: -0em;

      .extra-label {
        font-weight: bold;
      }
    }
  }
}
</style>
