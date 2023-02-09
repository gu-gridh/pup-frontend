<template>
  <footer id="footer">
    <div class="container" style="width:auto; float:left; margin-left:30px;;">
      <div class="column">
        <img src="/biccs.png" alt="BICCS" title="Logo"  width="220px" />
      </div>

      <div class="column">
        The Craft Laboratory<br />
        Magasinsgatan 4 <br />
        542 21 Mariestad<br />
        Sweden
      </div>

      <div class="column"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#footer {
  background-color: #333;
  color: #eaeae7;
  font-family: "Teko", sans-serif;
  font-size: 20px;
  line-height: 1.2;
  text-align: left;

  .column {
    float:left;
    margin-left:30px;
     margin-top:10px;
    margin-bottom: 0.5rem;
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
