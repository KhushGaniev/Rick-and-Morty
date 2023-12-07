<template>
  <div class="product">
    <default-header />

    <div class="container">
      <div class="product__wrapper">
        <custom-select
          :list="selectListStatus"
          :defaultValue="defaultValueStatus"
        />

        <custom-select
          :list="selectListGender"
          :defaultValue="defaultValueGender"
        />

        <cards-person :dataResults="dataResults" />

        <p v-if="error !== null">{{ error }}</p>

        <p v-if="loading">Is loading...</p>
      </div>

      <div class="product__pagination">
        <default-button
          :title="'1'"
          :color="'secondary-button'"
          @click="goToPage(1)"
        />

        <default-button
          :disabled="isFirstPage"
          :title="'Previous'"
          :color="'secondary-button'"
          @click="prevPage"
        />

        <default-button
          :disabled="isLastPage"
          :title="'Next'"
          :color="'secondary-button'"
          @click="nextPage"
        />

        <default-button
          :disabled="isLastPage"
          :title="String(lastPageCount)"
          :color="'secondary-button'"
          @click="goToPage(lastPageCount)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDataRickMorty } from "@/api/apiRickMorty.js";
import { ref, onMounted, computed } from "vue";

import CardsPerson from "@/components/cards/CardsPerson.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
import DefaultButton from "@/components/base/DefaultButton.vue";
import CustomSelect from "@/components/filtersPopup/CustomSelect.vue";

const dataResults = ref([]);
const dataSpace = ref([]);
const loading = ref(false);
const error = ref(null);
const currentPage = ref(1);
const lastPageCount = ref(null);
const selectListStatus = ref(["alive", "dead", "unknown"]);
const selectListGender = ref(["female", "male", "genderless", "unknown"]);
const defaultValueStatus = ref("Status");
const defaultValueGender = ref("Gender");

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
  background-color: var(--white-01);
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
  }
}
</style>
