<template>
  <main
    ref="scrollRef"
    class="h-screen"
    :class="{
      'overflow-scroll': shouldDisplayMetadata || shouldDisplayDownload,
    }"
  >
    <YouLoader v-if="isLoading" />
    <div class="h-screen flex items-center justify-center flex-col">
      <VideoUrl @fetching="isLoading = $event" />
    </div>
    <div
      v-if="shouldDisplayMetadata"
      ref="metadataRef"
      class="h-screen flex items-center justify-center flex-col"
    >
      <VideoMetadata @fetching="isLoading = $event" />
    </div>
    <div
      v-if="shouldDisplayDownload"
      ref="downloadRef"
      class="h-screen flex items-center justify-center flex-col"
    >
      <VideoDownload @retry="retry" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core';
import { Nullable } from 'types/helper';

const isLoading = ref(false);
const metadata = useMetadata();
const shouldDisplayMetadata = computed(() => metadata.value.artist.length > 0);
const downloadFile = useDownloadFile();
const shouldDisplayDownload = computed(() => !!downloadFile.value);

const scrollRef = ref<Nullable<HTMLElement>>(null);
const metadataRef = ref<Nullable<HTMLElement>>(null);
const downloadRef = ref<Nullable<HTMLElement>>(null);
const { x: _, y: scrollHeight } = useScroll(scrollRef, { behavior: 'smooth' });

const scrollToTop = () => (scrollHeight.value = 0);
const scrollIntoMetadata = () => (scrollHeight.value = window.innerHeight);
const scrollIntoDownload = () => (scrollHeight.value = window.innerHeight * 2);

watch(metadataRef, scrollIntoMetadata);
watch(downloadRef, scrollIntoDownload);

const retry = () => {
  scrollToTop();
  setTimeout(() => {
    resetMetadata();
    resetDownloadFile();
  }, 1000);
};
</script>

<style>
body,
#__nuxt {
  overflow: hidden;
}
</style>
