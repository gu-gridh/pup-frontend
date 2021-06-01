<template>
  <footer id="footer">
    <div class="container">
      <div class="column">
        <img src="/biccs_2021-s.png" alt="BICCS 2021" title="Logo" />
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
  name: "Footer",
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
    margin-bottom: 0.5rem;
  }

  .container {
    @media screen and (min-width: 800px) {
      display: flex;
      text-align: left;
      .column {
        flex: 1;
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
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
