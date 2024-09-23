<template>
  <div id="app" :class="locale">
      <NuxtPage />
  </div>
</template>

<script setup>

    const { locale } = useI18n()

</script>