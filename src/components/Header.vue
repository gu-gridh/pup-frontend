<template>
  <aside id="header">
    <!-- <div class="left"></div> -->
    <div class="middle">
      <router-link to="/">
        Biennial International Conference for the Craft Sciences
      </router-link>
    </div>
    <!-- <div class="right"></div> -->
  </aside>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
#header {
  background-color: #333;
  color: #eaeae7;
   font-family: 'Teko', sans-serif;
   font-size:30px;
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
  box-sizing: border-box;
  text-align: right;
}

.middle {
  flex: 2;
}

.right {
  flex: 1;
}
</style>
