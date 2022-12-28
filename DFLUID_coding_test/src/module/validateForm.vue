<script setup>
import { reactive, onMounted } from "vue";
import formControl from "@/components/formControl.vue";

const props = defineProps({
  data: {
    type: Object,
  },
});

const emit = defineEmits(["validate"]);

// 이메일 유효성 검사
const validEmailCheck = (obj) => {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return obj.value.match(pattern) != null;
};
const validEmail = (obj, index) => {
  if (validEmailCheck(obj) == false) {
    obj.value = "";
    obj.focus();
    emit("validate", false, index);
  } else {
    emit("validate", true, index);
  }
};

// 비밀번호 유효성 검사 : 하나 이상의 문자, 하나의 숫자 및 하나의 특수 문자
const validPassCheck = (obj) => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return obj.value.match(pattern) != null;
};
const validPass = (obj, index) => {
  if (validPassCheck(obj) == false) {
    obj.value = "";
    obj.focus();
    emit("validate", false, index);
  } else {
    emit("validate", true, index);
  }
};

// 휴대폰 번호 유효성 검사
const validPhoneCheck = (obj) => {
  const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return obj.value.match(pattern) != null;
};
const validPhone = (obj, index) => {
  if (validPhoneCheck(obj) == false) {
    obj.value = "";
    obj.focus();
    emit("validate", false, index);
  } else {
    emit("validate", true, index);
  }
};

onMounted(() => {
  const forms = document
    .getElementById(props.data.formId)
    .querySelectorAll(".formControl");
  forms.forEach((el, index) => {
    el.addEventListener("change", (e) => {
      const target = e.target;
      if (target.type === "email") {
        console.log("email", target, index);
        validEmail(target, index);
      } else if (target.type === "password") {
        console.log("password", target, index);
        validPass(target, index);
      } else if (target.type === "number") {
        console.log("number", target, index);
        validPhone(target, index);
      }
    });
  });
});
</script>
<template>
  <form :id="props.data.formId">
    <formControl
      v-for="(item, index) in props.data.formArray"
      :key="'formControl_' + index"
      :data="item"
    />
  </form>
</template>
