<script setup>
import profileList from "@/components/profileList.vue";
import formControl from "@/components/formControl.vue";
import { reactive } from "vue";
const state = reactive({
  profileData: [
    {
      img: "../src/assets/img/img_profile_01.webp",
      title: "Sed ut perspiciatis",
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
      url: "javascript:;",
    },
    {
      img: "../src/assets/img/img_profile_02.webp",
      title: "Lorem ipsum dolor",
      text: "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.",
      url: "javascript:;",
    },
    {
      img: "../src/assets/img/img_profile_03.webp",
      title: "Nemo enim ipsam",
      text: "Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor.",
      url: "javascript:;",
    },
  ],
  formData: {
    label: "Subscribe to our newsletter",
    inputType: "email",
    id: "emailValidate",
    btnIcon: "iconSubmit",
    btnType: "submit",
    errorMsg: "Please enter a valid email!",
  },
  formDataPass: {
    label: "Validate Password",
    inputType: "password",
    id: "passwordValidate",
    btnIcon: "iconSubmit",
    btnType: "submit",
    errorMsg: "Please enter a valid password!",
  },
  formDataNum: {
    label: "Validate Number",
    inputType: "number",
    id: "numberValidate",
    btnIcon: "iconSubmit",
    btnType: "submit",
    errorMsg: "Please enter a valid number!",
  },
});

// 만료 시간과 함께 데이터를 저장
const setItemWithExpireTime = (keyName, keyValue, tts) => {
  // localStorage에 저장할 객체
  const obj = {
    value: keyValue,
    expire: Date.now() + tts,
  };
  // 객체를 JSON 문자열로 변환
  const objString = JSON.stringify(obj);
  // setItem
  window.localStorage.setItem(keyName, objString);
};

function getItemWithExpireTime(keyName) {
  // localStorage 값 읽기 (문자열)
  const objString = window.localStorage.getItem(keyName);
  // null 체크
  if (!objString) {
    return null;
  }
  // 문자열을 객체로 변환
  const obj = JSON.parse(objString);
  // 현재 시간과 localStorage의 expire 시간 비교
  if (Date.now() > obj.expire) {
    // 만료시간이 지난 item 삭제
    window.localStorage.removeItem(keyName);
    // null 리턴
    return null;
  }
  // 만료기간이 남아있는 경우, value 값 리턴
  return (state.bgImgNum = obj.value);
}

const randomNumber = (() => {
  if (localStorage.getItem("sectionSubscribeBG")) {
    getItemWithExpireTime("sectionSubscribeBG");
  } else {
    // 숫자 1~3까지 랜덤하게 지정
    let val = Math.floor(Math.random() * 3) + 1;
    // 만료시간 로컬스토리지 저장 시간으로부터 하루 뒤로 설정
    setItemWithExpireTime("sectionSubscribeBG", val, "8.64e+7");
    getItemWithExpireTime("sectionSubscribeBG");
  }
})();
</script>

<template>
  <section class="sectionProfile">
    <h2 class="blind">Profile section</h2>
    <profileList :profileData="state.profileData" />
  </section>

  <section
    class="sectionSubscribe sectionWide"
    :style="`background-image: url(../src/assets/img/bg_sectionSubscribe_${state.bgImgNum}.webp);`"
  >
    <h2 class="subsTitle">Sed ut perspiciatis unde omnis</h2>
    <p class="subsParagraph01">
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable. If you are
      going to use a passage of Lorem Ipsum, you need to be sure there isn't
      anything embarrassing hidden in the middle of text. All the Lorem Ipsum
      generators on the Internet tend to repeat predefined chunks as necessary.
    </p>
    <p class="subsParagraph02">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore.
    </p>
    <formControl :data="state.formData" />
    <formControl :data="state.formDataPass" />
    <formControl :data="state.formDataNum" />
  </section>
</template>

<style lang="scss" scoped>
.section {
  &Profile {
    padding-bottom: 110px;
  }
  &Wide {
    margin-left: -80px;
    margin-right: -80px;
    padding-left: 80px;
    padding-right: 80px;
  }
  &Subscribe {
    position: relative;
    text-align: center;
    background-repeat: repeat-y;
    background-position: center top;
    background-size: 100%;
    color: #fff;
    padding-top: 152px;
    padding-bottom: 152px;
    font-family: "Montserrat";
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
    > * {
      position: relative;
    }
    .form {
      &Control {
        width: 500px;
        margin: 95px auto 0;
      }
    }
  }
}
.subs {
  &Title {
    margin: 0 0 23px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: -0.36px;
  }
  &Paragraph01 {
    margin: 23px 0 32px;
    padding-bottom: 32px;
    font-size: 18px;
    line-height: 1.67;
    letter-spacing: -0.27px;
    opacity: 0.8;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  &Paragraph02 {
    margin: 32px 0 0 2px;
    font-size: 14px;
    line-height: 1.57;
    letter-spacing: -0.21px;
    opacity: 0.6;
  }
}
</style>
