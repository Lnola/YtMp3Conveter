<template>
  <form @submit.prevent="submit">
    <YouInput v-model="metadata.artist" name="artist" label="Artist" />
    <YouInput v-model="metadata.category" name="category" label="Category" />
    <YouInput v-model="metadata.title" name="title" label="Title" />
    <YouButton type="submit">Submit</YouButton>
  </form>
</template>

<script setup>
const metadata = useMetadata();

const submit = async () => {
  console.log(metadata.value);
};
</script>
