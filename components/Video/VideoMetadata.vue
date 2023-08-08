<template>
  <form @submit.prevent="submit" class="w-7/12">
    <YouInput v-model="metadata.title" name="title" label="Title" />
    <section class="grid grid-cols-2 gap-4">
      <div>
        <YouInput
          v-model="metadata.filename"
          name="filename"
          label="Filename"
          class="mt-8"
        />
        <YouInput
          v-model="metadata.artist"
          name="artist"
          label="Artist"
          class="mt-8"
        />
        <YouInput
          v-model="metadata.album"
          name="album"
          label="Album"
          class="mt-8"
        />
      </div>
      <div>
        <YouInput
          v-model="metadata.category"
          name="category"
          label="Category"
          class="mt-8"
        />
        <YouInput
          v-model="metadata.year"
          name="year"
          label="Year"
          class="mt-8"
        />
        <YouInput
          v-model="metadata.genre"
          name="genre"
          label="Genre"
          class="mt-8"
        />
      </div>
    </section>
    <!-- <YouThumbnail v-model="metadata.thumbnail" /> -->
    <YouButton type="submit" class="w-full mt-8">Submit</YouButton>
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
