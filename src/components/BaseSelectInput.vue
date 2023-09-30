<template>
  <div class="flex flex-col">
    <span class="font-medium text-gray-600">{{ label }}</span>

    <div
      class="
        relative
        border-2 border-black
        px-2
        py-1
        rounded
        flex
        f
        items-center
      "
    >
      <button type="button" class="flex items-center w-full" @click="openMenu">
        <slot v-if="modelValue" name="selectedOption" :option="modelValue">
          {{ modelValue }}
        </slot>

        <span v-else class="text-sm text-gray-500 italic"
          >Select an option</span
        >

        <svg
          class="w-6 h-6 ml-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <ul
        v-if="isOpen"
        class="
          absolute
          menu
          inset-x-0
          border-2 border-black
          overflow-auto
          max-h-64
          rounded
          bg-white
          z-10
        "
      >
        <li
          v-for="option in options"
          :key="keyProp ? option[keyProp] : option"
          class="p-1"
        >
          <button
            type="button"
            @click="onOptionSelected(option)"
            class="hover:bg-gray-200 rounded w-full px-2 py-1"
          >
            <slot
              name="option"
              :option="option"
              :is-selected="isOptionSelected(option)"
              >{{ option }}</slot
            >
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: null as PropType<unknown>,
  },
  keyProp: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<unknown[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void;
}>();

const isOpen = ref(false);

function openMenu() {
  isOpen.value = true;
}

function closeMenu() {
  isOpen.value = false;
}

function isOptionSelected(option: unknown) {
  if (!props.modelValue) {
    return false;
  }

  if (props.keyProp) {
    return option[props.keyProp] === props.modelValue?.[props.keyProp];
  }

  return option === props.modelValue;
}

function onOptionSelected(option: unknown) {
  emit('update:modelValue', isOptionSelected(option) ? undefined : option);
  closeMenu();
}
</script>

<style lang="postcss" scoped>
.menu {
  top: calc(100% + 5px);
}
</style>
