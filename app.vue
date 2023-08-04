<template>
  <VideoUrl @fetching="isLoading = $event" />
  <YouLoader v-if="isLoading" />
  <VideoMetadata v-if="shouldDisplayMetadata" />
</template>

<script setup lang="ts">
const isLoading = ref(false);
const metadata = useMetadata();
const shouldDisplayMetadata = computed(() => metadata.value.artist.length > 0);
</script>
