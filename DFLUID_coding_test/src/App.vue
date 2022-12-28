<script setup></script>

<template>
  <header id="mainHeader">
    <div class="wrap">
      <h1>Snap photos and share like <br />never before</h1>
    </div>
  </header>

  <main id="mainContents">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
::v-deep(.wrap) {
  width: 1680px;
  padding: 0 80px;
  margin: 0 auto;
}
#mainHeader {
  font-family: "Exo 2";
  font-size: 48px;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  padding: 120px 0 36px;
}
</style>
