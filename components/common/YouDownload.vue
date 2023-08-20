<template>
  <a v-bind="$attrs" :class="ButtonVariants.PRIMARY" class="leading-8">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { Variants as ButtonVariants } from './YouButton.vue';
</script>
