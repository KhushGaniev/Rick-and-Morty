<template>
  <div class="aselect" :data-value="newDefaultValue" :data-list="list">
    <div class="aselect__selector" @click="toggle()">
      <div class="aselect__selector-label">
        <span>{{ newDefaultValue }}</span>
        <div
          class="aselect__selector-arrow"
          :class="{ 'aselect__selector-arrow_active': visible }"
        ></div>
      </div>
      <ul class="aselect__list" v-if="visible">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="aselect__item"
          :class="{ current: item === newDefaultValue }"
          @click="select(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  defaultValue: {
    type: [String, Object],
  },
  list: {
    type: Array,
  },
  uniqueId: {
    type: String,
    default: "999",
  },
});

const emits = defineEmits(["value-сhange"]);

const storageKey = (id) => `newDefaultValue_${id}`;

const getStoredValue = () => {
  const storedValue = localStorage.getItem(storageKey(props.uniqueId));
  return storedValue ? JSON.parse(storedValue) : null;
};

const storeValue = (value) => {
  localStorage.setItem(storageKey(props.uniqueId), JSON.stringify(value));
};

watch(
  () => props.defaultValue,
  (newValue) => {
    const res = ref(newValue);
    newDefaultValue.value = res.value;
    storeValue(newDefaultValue.value);
  }
);

const visible = ref(false);
const newDefaultValue = ref(getStoredValue() || props.defaultValue);

const toggle = () => {
  visible.value = !visible.value;
};

const select = (option) => {
  newDefaultValue.value = option;
  storeValue(newDefaultValue.value);
  emits("value-сhange", newDefaultValue.value);
};
</script>

<style scoped lang="scss">
.aselect {
  width: 280px;
  margin: 20px auto;

  &__selector {
    border: 1px solid var(--white-05);
    background: var(--white-01);
    position: relative;
    z-index: 1;

    &-arrow {
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid var(--grey-03);
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);

      &_active {
        transform: rotateZ(180deg) translateY(2px);
      }
    }

    &-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      font-size: 16px;
      color: var(--grey-03);
    }
  }

  &__list {
    width: 100%;
    font-size: 16px;
    border: 1px solid var(--white-05);
    background: var(--default-white);
  }

  &__item {
    padding: 12px;
    color: var(--grey-02);
    &:hover {
      color: var(--default-white);
      background: var(--cl-01);
    }
  }

  .current {
    background: var(--white-04);
  }
}
</style>
