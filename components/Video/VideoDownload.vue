<template>
  <template v-if="downloadFile">
    <a :href="downloadFile.outputUrl" :download="downloadFile.filename">
      Download
    </a>
  </template>
</template>

<script setup lang="ts">
const downloadFile = useDownloadFile();
</script>
