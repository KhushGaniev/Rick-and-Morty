<template>
  <div class="card" v-for="item in infoCharacters" :key="item.id">
    <div class="card__header">
      <h2 class="card__name">{{ item.name }}</h2>
      <p class="card__status">{{ item.status }}</p>
    </div>
    <div class="card__image">
      <img :src="`${item.image}`" alt="Изображение персонажа" />
    </div>
    <div class="card__episodes">
      <h3 class="card__episodes-title">Список эпизодов</h3>
      <ul class="card__episodes-list">
        <li
          class="card__episode"
          v-for="(episode, index) in item.episoders"
          :key="index"
        >
          {{ episode }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  dataResults: {
    type: Object,
  },
});

const infoCharacters = computed(() => {
  return props.dataResults.results;
});
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--white-02);
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 360px) {
    width: 250px;
  }

  &__header {
    padding: 16px;
    background-color: var(--white-03);
    text-align: center;

    &__name {
      margin: 0;
      font-size: 1.2em;
    }

    &__status {
      margin: 8px 0 0;
      font-size: 0.9em;
      color: var(--grey-02);
    }
  }

  &__image {
    img {
      width: 100%;
      height: auto;
    }
  }

  &__episodes {
    padding: 16px;

    &-title {
      margin: 0 0 8px;
      font-size: 1em;
    }

    &-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      &__episode {
        margin-bottom: 4px;
        font-size: 0.9em;
      }
    }
  }
}
</style>
