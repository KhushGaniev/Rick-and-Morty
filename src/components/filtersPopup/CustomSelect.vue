<template>
  <div class="aselect" :data-value="newDefaultValue" :data-list="list">
    <div class="aselect__selector" @click="toggle()">
      <div class="aselect__selector-label">
        <span>{{ newDefaultValue }}</span>
      </div>
      <div class="aselect__selector-arrow" :class="{ expanded: visible }"></div>
      <div :class="{ hidden: !visible, visible }">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ current: item === newDefaultValue }"
            @click="select(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  defaultValue: {
    type: String,
  },
  list: {
    type: Array,
  },
});

const visible = ref(true);
const newDefaultValue = ref(props.defaultValue);

const toggle = () => {
  visible.value = !visible.value;
};

const select = (option) => {
  newDefaultValue.value = option;
};
</script>

<style scoped lang="scss">
.aselect {
  width: 280px;
  margin: 20px auto;

  &__selector {
    border: 1px solid gainsboro;
    background: var(--white-01);
    position: relative;
    z-index: 1;

    &-arrow {
      position: absolute;
      right: 10px;
      top: 40%;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 10px solid var(--grey-03);
      transform: rotateZ(0deg) translateY(0px);
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    }
    .expanded {
      transform: rotateZ(180deg) translateY(2px);
    }

    &-label {
      display: block;
      padding: 12px;
      font-size: 16px;
      color: var(--grey-03);
    }
  }

  ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #fff;
  }

  li {
    padding: 12px;
    color: var(--grey-02);
    &:hover {
      color: var(--default-white);
      background: seagreen;
    }
  }

  .current {
    background: var(--white-04);
  }

  .hidden {
    visibility: hidden;
  }

  .visible {
    visibility: visible;
  }
}
</style>
