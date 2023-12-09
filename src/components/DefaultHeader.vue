<template>
  <header class="header">
    <h3 class="header__title">RICK AND MORTY</h3>
  </header>
</template>
<script>
export default {
  name: "DefaultHeader",
};
</script>

<style scoped lang="scss">
.header {
  padding: 10px 0;
  &__title {
    font-size: 25px;
    font-weight: 700;
    color: green;
    text-align: center;
  }
}
</style>
