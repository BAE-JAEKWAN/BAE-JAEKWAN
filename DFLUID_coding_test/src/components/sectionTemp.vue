<script setup>
const props = defineProps({
  type: {
    type: String,
  },
});
</script>

<template>
  <component :is="props.type">
    <div class="wrap">
      <slot />
    </div>
  </component>
</template>
