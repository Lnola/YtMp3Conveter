<template>
  <form @submit.prevent="submit">
    <YouInput v-model="metadata.artist" name="artist" label="Artist" />
    <YouInput v-model="metadata.album" name="album" label="Album" />
    <YouInput v-model="metadata.category" name="category" label="Category" />
    <YouInput v-model="metadata.filename" name="filename" label="Filename" />
    <YouInput v-model="metadata.title" name="title" label="Title" />
    <!-- <YouThumbnail v-model="metadata.thumbnail" /> -->
    <YouButton type="submit">Submit</YouButton>
  </form>
</template>

<script setup lang="ts">
const metadata = useMetadata();

const submit = async () => {
  const query = { ...metadata.value };
  const data = await $fetch('/api/audio/download', { query });
  console.log(data);
};
</script>
