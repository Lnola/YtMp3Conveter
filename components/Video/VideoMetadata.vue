<template>
  <form @submit.prevent="submit">
    <YouInput v-model="metadata.artist" name="artist" label="Artist" />
    <YouInput v-model="metadata.album" name="album" label="Album" />
    <YouInput v-model="metadata.category" name="category" label="Category" />
    <YouInput v-model="metadata.filename" name="filename" label="Filename" />
    <YouInput v-model="metadata.title" name="title" label="Title" />
    <YouInput v-model="metadata.year" name="year" label="Year" />
    <YouInput v-model="metadata.genre" name="genre" label="Genre" />
    <!-- <YouThumbnail v-model="metadata.thumbnail" /> -->
    <YouButton type="submit">Submit</YouButton>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['fetching']);

const metadata = useMetadata();
const downloadFile = useDownloadFile();

const submit = async () => {
  emits('fetching', true);
  const query = { ...metadata.value };
  downloadFile.value = await $fetch('/api/audio/download', { query });
  emits('fetching', false);
};
</script>
