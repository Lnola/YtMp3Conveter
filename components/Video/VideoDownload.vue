<template>
  <template v-if="downloadFile">
    <iframe
      class="mb-6 rounded-lg"
      width="512"
      height="288"
      :src="embededVideo"
    ></iframe>
    <div class="flex gap-6">
      <YouButton
        :href="downloadFile.outputUrl"
        :download="downloadFile.filename"
        >Download
      </YouButton>
      <YouButton @click="emits('retry')" variant="SECONDARY">
        Try again
      </YouButton>
    </div>
  </template>
</template>

<script setup lang="ts">
const emits = defineEmits(['retry']);
const metadata = useMetadata();
const downloadFile = useDownloadFile();

const embededVideo = computed(() =>
  metadata.value.videoUrl.replace('watch?v=', 'embed/')
);
</script>
