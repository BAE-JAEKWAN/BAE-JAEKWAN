<script setup>
import { onMounted, reactive } from "vue";

const props = defineProps({
  data: {
    type: Object,
  },
});
const state = reactive({
  id: `form_${props.data.id}`,
  validate: null,
});

const validEmail = (obj) => {
  if (validEmailCheck(obj) == false) {
    obj.value = "";
    obj.focus();
    return (state.validate = false);
  } else {
    return (state.validate = true);
  }
};
const validEmailCheck = (obj) => {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return obj.value.match(pattern) != null;
};

onMounted(() => {
  document.getElementById(state.id).addEventListener("change", (e) => {
    const target = e.target;
    if (target.type === "email") {
      console.log("email");
      validEmail(target);
    } else if (target.type === "password") {
      console.log("password");
    } else if (target.type === "number") {
      console.log("number");
    }
  });
});
</script>

<template>
  <div
    :id="state.id"
    class="formControl"
    :class="{
      formEmail: props.data.inputType === 'email',
    }"
  >
    <form action="">
      <label :for="props.data.id" class="formLabel">{{
        props.data.label
      }}</label>
      <div
        class="formBox"
        :class="{
          formError: state.validate === false,
          formSuccess: state.validate === true,
        }"
      >
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
          :disabled="state.validate === false"
        >
          <span class="blind">Confirm</span>
        </button>
      </div>
      <mark class="formErrorMsg" v-if="state.validate === false">{{
        props.data.errorMsg
      }}</mark>
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
    &:disabled {
      opacity: 0.2;
    }
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
    border-color: #f63;
    &Msg {
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
  &Success {
    border-color: #00c300;
  }
}
</style>
