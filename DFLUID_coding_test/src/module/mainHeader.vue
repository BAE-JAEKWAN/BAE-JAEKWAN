<script setup>
const props = defineProps({
  text: {
    type: String,
  },
});
</script>
<template>
  <sectionTemp id="mainHeader" type="header">
    <h1 v-html="props.text"></h1>
  </sectionTemp>
</template>
