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
const loading = ref(false);
const error = ref(null);

const fetchDataFromApi = async () => {
  loading.value = true;

  try {
    const queryParams = { page: 19 };

    if (dataResults.value) {
      dataResults.value = await getDataRickMorty(queryParams);
    }

    const episodeUrls = dataResults.value.results.map((result) =>
      result.episode.map((episode) => episode)
    );

    const episodesData = await Promise.all(
      episodeUrls.map((url) => fetch(url).then((response) => response.json()))
    );
    const airDates = episodesData.map((episodeData) => episodeData.name);

    console.log(airDates);
    console.log(episodeUrls);
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
