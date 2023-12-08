<template>
  <div class="product">
    <default-header />

    <div class="container">
      <div class="product__select">
        <custom-select
          :list="selectListStatus"
          :defaultValue="defaultValueStatus"
          @value-сhange="handleStatusChange"
        />

        <custom-select
          :list="selectListGender"
          :defaultValue="defaultValueGender"
          @value-сhange="handleGenderChange"
        />

        <default-button
          :title="'Применить'"
          :color="'primary-button'"
          @click="fetchDataFromApi"
        />

        <default-button
          :title="'Сбросить фильтры'"
          :color="'secondary-button'"
          @click="clearFilterSelect"
        />
      </div>

      <div class="product__container">
        <div class="product__wrapper">
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
const paramsQueryStatus = ref("");
const paramsQueryGender = ref("");

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === lastPageCount.value);

const storedParamsQuery = localStorage.getItem("paramsQuery");

if (storedParamsQuery) {
  const parsedParamsQuery = JSON.parse(storedParamsQuery);
  paramsQueryStatus.value = parsedParamsQuery.status;
  paramsQueryGender.value = parsedParamsQuery.gender;
}

onMounted(() => {
  fetchDataFromApi();
});

const createSelectHandler = (selectList, paramsQuery) => (select) => {
  if (selectList.includes(select)) {
    paramsQuery.value = select;
  }
};

const handleStatusChange = createSelectHandler(
  selectListStatus.value,
  paramsQueryStatus
);

const handleGenderChange = createSelectHandler(
  selectListGender.value,
  paramsQueryGender
);

const clearFilterSelect = () => {
  paramsQueryGender.value = "";
  paramsQueryStatus.value = "";
  defaultValueStatus.value = "Status";
  defaultValueGender.value = "Gender";

  fetchDataFromApi();
};

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
    const queryParams = {
      page: currentPage.value,
      gender: paramsQueryGender.value,
      status: paramsQueryStatus.value,
    };

    localStorage.setItem("paramsQuery", JSON.stringify(queryParams));

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
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 0 16px;
  max-width: 1300px;
  margin: 0 auto;
  gap: 20px;

  @media (min-width: 1920px) {
    max-width: 1700px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

.product {
  background-color: var(--white-01);
  min-height: 100vh;

  &__container {
    max-width: 1250px;
    margin: 0 auto;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 16px;

    @media (min-width: 1920px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1440px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 670px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__select {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1200px) {
      max-width: 100%;
      margin: 0 auto;
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
