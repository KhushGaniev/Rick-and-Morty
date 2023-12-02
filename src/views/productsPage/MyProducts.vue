<template>
  <div class="product">
    <default-header />
    <div class="container">
      <div class="product__wrapper">
        <cards-person />
        <cards-person />
        <cards-person />
        <cards-person />
        <cards-person />
        <cards-person />
        <cards-person />
        <p v-if="error !== null">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardsPerson from "@/components/cards/CardsPerson.vue";
import DefaultHeader from "@/components/DefaultHeader.vue";
import { getDataRickMorty } from "@/api/apiRickMorty.js";
import { ref } from "vue";

const data = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchDataFromApi = async () => {
  loading.value = true;
  try {
    const queryParams = { page: 19 };
    data.value = await getDataRickMorty(queryParams);
    return data.value;
  } catch (e) {
    console.error("Error fetching data:", e.message);
    error.value = "Error fetching data";
    throw e;
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  console.log(await fetchDataFromApi());
};

fetchData();
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
