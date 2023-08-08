<template>
  <button :class="ButtonVariants.PRIMARY">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const ButtonVariants = {
  PRIMARY:
    'px-12 py-3 bg-gradient bg-[length:200%] bg-right hover:bg-left transition-all duration-300 ease-in-out text-white tracking-wide font-bold rounded-full outline-orange',
};
</script>
