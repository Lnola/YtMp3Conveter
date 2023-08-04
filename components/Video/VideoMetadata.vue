<template>
  <form @submit.prevent="submit">
    <YouInput v-model="metadata.title" name="title" label="Title" />
    <YouInput v-model="metadata.artist" name="artist" label="Artist" />
    <YouInput v-model="metadata.category" name="category" label="Category" />
    <YouThumbnail v-model="metadata.thumbnail" />
    <YouButton type="submit">Submit</YouButton>
  </form>
</template>

<script setup lang="ts">
const metadata = useMetadata();

const submit = async () => {
  console.log(metadata.value);
};
</script>
