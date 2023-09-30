<template>
  <div>
    <slot :current-value="value" :old-value="oldValue">
      {{ value }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { watch, defineProps, ref, PropType, defineEmits } from 'vue';

const props = defineProps({
  value: {
    type: null as PropType<unknown>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'changed', value: unknown): void;
}>();

const oldValue = ref<unknown>();
watch(
  () => props.value,
  (newVal, oldVal) => {
    oldValue.value = oldVal;
    emit('changed', newVal);
  }
);
</script>
