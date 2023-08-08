<!-- TODO: add thumbnail to metadata -->
<template>
  <div class="relative flex items-center w-48 h-48 bg-blue-700 cursor-pointer">
    <img @click="select" :src="modelValue" alt="thumbnail" class="w-100%" />
  </div>
  <input class="hidden" @input="pick" ref="inputRef" type="file" />
</template>

<script setup lang="ts">
import { Nullable } from 'types/helper';

const emits = defineEmits(['update:modelValue']);
defineProps({
  modelValue: { type: String, required: true },
});

const inputRef = ref<Nullable<HTMLInputElement>>(null);

const select = () => {
  if (!inputRef.value) return;
  inputRef.value.click();
};

const pick = () => {
  if (!inputRef.value) return;
  const { files } = inputRef.value;
  if (!files || !files[0]) return;
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload = (event) => emits('update:modelValue', event.target?.result);
};
</script>
