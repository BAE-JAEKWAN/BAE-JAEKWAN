<script setup>
import profileCard from "@/components/profileCard.vue";

const props = defineProps({
  profileData: {
    type: Object,
  },
});
</script>
<template>
  <div class="profileList">
    <profileCard
      v-for="(item, index) in props.profileData"
      :key="index"
      :data="item"
    />
  </div>
</template>
<style lang="scss" scoped>
.profile {
  &List {
    display: flex;
  }
  &Card {
    margin-left: 20px;
    flex: 1;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
