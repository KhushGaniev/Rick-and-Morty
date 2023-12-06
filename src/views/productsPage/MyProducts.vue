<template>
  <div class="product">
    <default-header />
    <div class="container">
      <div class="product__wrapper">
        <cards-person :dataResults="dataResults" />
        <p v-if="error !== null">{{ error }}</p>
        <p v-if="loading">Is loading...</p>
      </div>
      <div class="product__pagination">
        <button @click="goToPage(1)">1</button>
        <button @click="prevPage" :disabled="isFirstPage">Previous</button>
        <button @click="nextPage" :disabled="isLastPage">Next</button>
        <button @click="goToPage(lastPageCount)" :disabled="isLastPage">
          {{ lastPageCount }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardsPerson from "@/components/cards/CardsPerson.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
import { getDataRickMorty } from "@/api/apiRickMorty.js";
import { ref, onMounted, computed } from "vue";

const dataResults = ref([]);
const dataSpace = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const lastPageCount = ref(null);

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === lastPageCount.value);

const goToPage = (page) => {
  currentPage.value = page;
  fetchDataFromApi();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < lastPageCount.value) {
    goToPage(currentPage.value + 1);
  }
};

const fetchDataFromApi = async () => {
  loading.value = true;

  try {
    const queryParams = { page: currentPage.value };
    dataResults.value = await getDataRickMorty(queryParams);
    console.log("Next page", currentPage.value);

    console.log(dataResults.value.info);

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

    lastPageCount.value = dataResults.value.info.pages;

    return dataResults.value;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    error.value = "Error fetching data";
    throw error;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDataFromApi();
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
  margin: 0 auto;
}

.product {
  background-color: #f8f8f8;
  min-height: 100vh;

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      padding: 8px 16px;
      margin: 0 4px;
      cursor: pointer;
      font-size: 14px;
      border: 1px solid #ccc;
      background-color: #fff;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
}
</style>
