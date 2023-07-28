<template>
  <!-- <TextField name="video-link" label="Youtube video link" /> -->
  <a href="/audio.mp3" download="audio.mp3">{{ data }}</a>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/download');
</script>
