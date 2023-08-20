<template>
  <form
    @submit.prevent="submit"
    class="w-3/4 flex items-center justify-center flex-col"
  >
    <YouInput
      v-model="metadata.videoUrl"
      name="video-link"
      label="Youtube video link"
      class="mb-6 w-full"
    />
    <YouToggle v-model="shouldAddMetadata" name="toggle-metadata" class="mb-4">
      Add custom file metadata
    </YouToggle>
    <YouButton type="submit">Convert</YouButton>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['fetching']);

const shouldAddMetadata = ref(false);
const metadata = useMetadata();
const downloadFile = useDownloadFile();

const fetchMetadata = async () => {
  const query = { videoUrl: metadata.value.videoUrl };
  const data = await $fetch('/api/audio/metadata', { query });
  metadata.value = { ...metadata.value, ...data };
  resetDownloadFile();
};

const fetchDownloadFile = async () => {
  const query = { videoUrl: metadata.value.videoUrl };
  downloadFile.value = await $fetch('/api/audio/download', { query });
};

const submit = async () => {
  emits('fetching', true);
  const fetchMethod = shouldAddMetadata.value
    ? fetchMetadata
    : fetchDownloadFile;
  await fetchMethod();
  emits('fetching', false);
};
</script>
