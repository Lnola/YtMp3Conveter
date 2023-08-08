<template>
  <main class="h-screen" :class="{ 'overflow-scroll': shouldDisplayMetadata }">
    <YouLoader v-if="isLoading" />
    <div class="h-screen flex items-center justify-center flex-col">
      <VideoUrl @fetching="isLoading = $event" />
      <VideoMetadata v-if="shouldDisplayMetadata" />
      <VideoDownload v-if="shouldDisplayDownload" />
    </div>
  </main>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const metadata = useMetadata();
const shouldDisplayMetadata = computed(() => metadata.value.artist.length > 0);
const downloadFile = useDownloadFile();
const shouldDisplayDownload = computed(() => downloadFile.value);
</script>

<style>
body,
#__nuxt {
  overflow: hidden;
}
</style>
