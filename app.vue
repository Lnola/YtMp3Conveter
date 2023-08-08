<template>
  <main
    ref="scrollRef"
    class="h-screen"
    :class="{ 'overflow-scroll': shouldDisplayMetadata }"
  >
    <YouLoader v-if="isLoading" />
    <div class="h-screen flex items-center justify-center flex-col">
      <VideoUrl @fetching="isLoading = $event" />
    </div>
    <div class="h-screen flex items-center justify-center flex-col">
      <VideoMetadata
        ref="metadataRef"
        v-if="shouldDisplayMetadata"
        @fetching="isLoading = $event"
      />
    </div>
    <div class="h-screen flex items-center justify-center flex-col">
      <VideoDownload v-if="shouldDisplayDownload" />
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
const shouldDisplayDownload = computed(() => downloadFile.value);

const scrollRef = ref<Nullable<HTMLElement>>(null);
const metadataRef = ref<Nullable<HTMLElement>>(null);
const { x: _, y: scrollHeight } = useScroll(scrollRef, { behavior: 'smooth' });

const scrollIntoMetadata = () => {
  if (!metadataRef.value) return;
  scrollHeight.value = window.innerHeight;
};

const scrollIntoDownload = () => {
  if (!metadataRef.value) return;
  scrollHeight.value = window.innerHeight * 2;
};

watchEffect(() => {
  if (shouldDisplayMetadata.value) scrollIntoMetadata();
});

watchEffect(() => {
  if (shouldDisplayDownload.value) scrollIntoDownload();
});
</script>

<style>
body,
#__nuxt {
  overflow: hidden;
}
</style>
