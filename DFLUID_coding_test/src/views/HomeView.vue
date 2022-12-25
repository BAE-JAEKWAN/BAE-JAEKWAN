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
    errorMsg: "email",
  },
});
</script>

<template>
  <section class="sectionProfile">
    <h2 class="blind">Profile section</h2>
    <profileList :profileData="state.profileData" />
  </section>

  <section class="sectionSubscribe sectionWide">
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
    background: url(@/assets/img/bg_sectionSubscribe_01.webp) no-repeat center;
    background-size: cover;
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
.form {
  &Email {
    width: 500px;
    margin: 95px auto 0;
  }
}
</style>
