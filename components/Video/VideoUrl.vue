<template>
  <form
    @submit.prevent="submit"
    class="w-3/4 flex items-center justify-center flex-col"
  >
    <YouInput
      v-model="videoUrl"
      name="video-link"
      label="Youtube video link"
      class="mb-8 w-full"
    />
    <YouToggle v-model="shouldAddMetadata" name="toggle-metadata">
      Add metadata
    </YouToggle>
    <YouButton type="submit">Convert</YouButton>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['fetching']);

const shouldAddMetadata = ref(false);
const videoUrl = ref('');
const metadata = useMetadata();
const downloadFile = useDownloadFile();

const fetchMetadata = async () => {
  const query = { videoUrl: videoUrl.value };
  const data = await $fetch('/api/audio/metadata', { query });
  metadata.value = { ...metadata.value, ...data };
};

const fetchDownloadFile = async () => {
  const query = { videoUrl: videoUrl.value };
  downloadFile.value = await $fetch('/api/audio/download', { query });
};

const submit = async () => {
  emits('fetching', true);
  const fetchMethod = shouldAddMetadata.value
    ? fetchMetadata
    : fetchDownloadFile;
  await fetchMethod();
  videoUrl.value = '';
  emits('fetching', false);
};
</script>
