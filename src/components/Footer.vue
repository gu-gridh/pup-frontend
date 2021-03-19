<template>
  <footer id="footer">
    <div class="container">
      <div class="column">
        <img src="/biccs_2020-litet_rgb-copy.png" />
      </div>

      <div class="column">
        The Craft Laboratory<br />
        Magasinsgatan 4 <br />
        542 21 Mariestad<br />
        Sweden
      </div>

      <div class="column">
        <a href="https://www.youtube.com/channel/UCISZUm8lwGl1e0I1kmgMaMw">
          ▸ The Craft Laboratory on YouTube
        </a>
      </div>
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
  font-size: 30px;
  text-align: center;

  .column {
    margin-bottom: 2rem;
  }

  .container {
    @media screen and (min-width: 800px) {
      display: flex;
      text-align: left;
      .column {
        flex: 1;
        &:not(:last-child) {
          margin-right: 4rem;
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
