<template>
  <button :class="color">
    <slot />
  </button>
</template>

<script setup>
import { ref, watch, onBeforeMount, defineProps } from "vue";

const props = defineProps({
  color: {
    type: String,
  },
});

const buttonClass = ref("");

watch(() => props.color, updateButtonClass);
onBeforeMount(updateButtonClass);

function updateButtonClass() {
  buttonClass.value = `custom-button ${props.color}-button`;
}
</script>

<style lang="scss" scoped>
.custom-button {
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #333;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  background-color: #333;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #111;
  }
}

.primary-button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #388e3c;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #39843c;
    border-color: #2e6f30;
  }
}

.secondary-button {
  background-color: var(--color-secondary);
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #0056b3;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: var(--active-secondary);
    border-color: #001a33;
  }
}
</style>
