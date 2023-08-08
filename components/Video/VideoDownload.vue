<template>
  <a :href="downloadFile?.outputUrl" :download="downloadFile?.outputUrl">
    Download
  </a>
</template>

<script setup lang="ts">
const downloadFile = useDownloadFile();
</script>
