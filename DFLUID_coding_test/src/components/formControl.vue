<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<template>
  <div class="formControl formEmail">
    <form action="">
      <label :for="props.data.id" class="formLabel">{{
        props.data.label
      }}</label>
      <div class="formBox">
        <input
          class="formInput"
          :type="props.data.inputType"
          :id="props.data.id"
          :placeholder="`Enter your ${props.data.errorMsg}`"
        />
        <button
          :type="props.data.btnType"
          class="formBtn"
          :class="props.data.btnIcon"
        >
          <span class="blind">Confirm</span>
        </button>
      </div>
      <mark class="formError"
        >Please enter a valid {{ props.data.errorMsg }}!</mark
      >
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form {
  &Label {
    font-family: "Exo 2";
    font-size: 16px;
    font-weight: bold;
    letter-spacing: -0.24px;
    margin-bottom: 16px;
    display: block;
  }
  &Box {
    padding-left: 16px;
    padding-right: 10px;
    border-radius: 7px;
    backdrop-filter: blur(10px);
    border: solid 1px #fff;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: left;
    height: 50px;
    display: flex;
    align-items: center;
  }
  &Btn {
    margin-left: 8px;
    width: 32px;
    height: 32px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    &.icon {
      &Submit {
        background-image: url(@/assets/img/icon_plane.webp);
      }
    }
  }
  &Input {
    flex: 1;
    height: 100%;
  }
  &Error {
    display: block;
    margin-top: 9px;
    font-family: "Exo 2";
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.24px;
    text-align: left;
    color: #f63;
    padding-left: 16px;
  }
}
</style>
