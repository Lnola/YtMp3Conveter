<template>
  <button :class="buttonVariant">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const Variants = {
  PRIMARY:
    'px-12 py-3 bg-gradient bg-[length:200%] bg-right hover:bg-left transition-all duration-300 ease-in-out text-white tracking-wide font-bold rounded-full outline-orange',
  SECONDARY:
    'px-12 py-3 border-4 border-orange bg-transparent transition-all duration-300 ease-in-out text-orange tracking-wide font-bold rounded-full outline-orange',
};
export type Variant = 'PRIMARY' | 'SECONDARY';

const props = defineProps({
  variant: { type: String as PropType<Variant>, default: 'PRIMARY' },
});

const buttonVariant = computed(() => Variants[props.variant]);
</script>
