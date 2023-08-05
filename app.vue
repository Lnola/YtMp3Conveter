<template>
  <main class="h-screen" :class="{ 'overflow-scroll': shouldDisplayMetadata }">
    <div class="h-screen">
      <VideoUrl @fetching="isLoading = $event" />
      <YouLoader v-if="isLoading" />
      <VideoMetadata v-if="shouldDisplayMetadata" />
    </div>

    <img class="-mt-96" src="@/assets/baguettes.png" alt="divider" />
  </main>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const metadata = useMetadata();
const shouldDisplayMetadata = computed(() => metadata.value.artist.length > 0);
</script>

<style>
body,
#__nuxt {
  overflow: hidden;
}
</style>
