<template>
  <template v-if="downloadFile">
    <a :href="downloadFile.outputUrl" :download="downloadFile.filename">
      Download
    </a>
    <button @click="emits('retry')">Try again</button>
  </template>
</template>

<script setup lang="ts">
const emits = defineEmits(['retry']);
const downloadFile = useDownloadFile();
</script>
