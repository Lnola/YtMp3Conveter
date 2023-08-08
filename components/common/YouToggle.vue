<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      @change="updateModelValue"
      :value="modelValue"
      :name="name"
      type="checkbox"
      class="sr-only peer"
    />
    <div
      class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"
    ></div>
    <span class="ml-3 text-sm text-gray-700 peer-focus:text-orange">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import yn from 'yn';

const emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: { type: Boolean, required: true },
  name: { type: String, required: true },
});

const updateModelValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  emits('update:modelValue', !yn(value));
};
</script>
