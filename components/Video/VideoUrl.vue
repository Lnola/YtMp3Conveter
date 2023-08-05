<template>
  <form @submit.prevent="submit">
    <YouInput v-model="videoUrl" name="video-link" label="Youtube video link" />
    <YouButton type="submit">Submit</YouButton>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['fetching']);

const videoUrl = ref('');
const metadata = useMetadata();

const submit = async () => {
  emits('fetching', true);
  const query = { videoUrl: videoUrl.value };
  const data = await $fetch('/api/audio/metadata', { query });
  metadata.value = { ...metadata.value, ...data };
  videoUrl.value = '';
  emits('fetching', false);
};
</script>
