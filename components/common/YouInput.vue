<template>
  <div v-bind="$attrs" class="relative z-0 mt-2">
    <input
      @input="updateModelValue"
      :value="modelValue"
      :id="name"
      :aria-describedby="helpLabel"
      type="text"
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-orange peer"
      placeholder=""
    />
    <label
      :for="name"
      class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {{ label }}
    </label>
  </div>
  <p v-if="helpText" :id="helpLabel" class="mt-2 text-xs text-gray-500">
    {{ helpText }}
  </p>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: { type: String, required: true },
  name: { type: String, required: true },
  label: { type: String, required: true },
  helpText: { type: String, default: null },
});

const helpLabel = computed(() => props.helpText && `${props.name}-help`);

const updateModelValue = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  emits('update:modelValue', value);
};
</script>

<style scoped>
input {
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
