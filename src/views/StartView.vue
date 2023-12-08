<template>
  <div class="start">
    <h1 class="start__title">This is the start page.</h1>
    <router-link class="start__link" to="/products">
      <span>Click to continue</span>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.start {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;

  &__title {
    text-align: center;
    font-size: 100px;

    @media (max-width: 768px) {
      font-size: 50px;
    }
  }

  &__link {
    color: red;
    font-size: 70px;
    font-weight: 600;
    text-decoration: underline;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
}
</style>
