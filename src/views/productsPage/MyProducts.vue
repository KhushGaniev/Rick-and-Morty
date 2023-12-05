<template>
  <div class="product">
    <default-header />
    <div class="container">
      <div class="product__wrapper">
        <cards-person :dataResults="dataResults" />
        <p v-if="error !== null">{{ error }}</p>
        <p v-if="loading">Is loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardsPerson from "@/components/cards/CardsPerson.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
import { getDataRickMorty } from "@/api/apiRickMorty.js";
import { ref, onMounted } from "vue";

const dataResults = ref([]);
const dataSpace = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchDataFromApi = async () => {
  loading.value = true;

  try {
    const queryParams = { page: 2 };
    dataResults.value = await getDataRickMorty(queryParams);

    const episodeNames = await Promise.all(
      dataResults.value.results.map(async (result) =>
        Promise.all(
          result.episode.map(
            async (el) => (await (await fetch(el)).json()).name
          )
        )
      )
    );

    dataSpace.value = episodeNames;

    dataResults.value.results.forEach((result, index) => {
      result.episoders = dataSpace.value[index];
    });

    console.log(dataResults.value.results);

    return dataResults.value;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    error.value = "Error fetching data";
    throw error;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDataFromApi);
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
}

.product {
  background-color: #f8f8f8;
  height: 100vh;
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px;
  }
}
</style>
