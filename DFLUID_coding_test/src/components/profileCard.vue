<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<template>
  <article class="profileCard">
    <figure class="profileImg"><img :src="props.data.img" alt="" /></figure>
    <h3 class="profileTitle">{{ props.data.title }}</h3>
    <p class="profileText">
      {{ props.data.text }}
    </p>
    <a class="profileBtn" :href="props.data.url">Learn more</a>
  </article>
</template>

<style lang="scss">
.profile {
  &Img {
    width: 108px;
    height: 108px;
    border-radius: 50%;
    overflow: hidden;
  }
  &Title {
    margin: 40px 0 24px;
    font-family: "Montserrat";
    font-size: 24px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: -0.36px;
  }
  &Text {
    margin: 24px 0;
    font-family: "Montserrat";
    font-size: 18px;
    font-weight: normal;
    line-height: 1.67;
    letter-spacing: -0.27px;
    opacity: 0.8;
  }
  &Btn {
    margin: 24px 0 0;
    font-family: "Exo 2";
    font-size: 18px;
    font-weight: bold;
    line-height: 1.67;
    letter-spacing: -0.27px;
    color: #18a0fb;
  }
}
</style>
