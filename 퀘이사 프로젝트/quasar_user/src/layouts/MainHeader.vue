<template>
  <q-header class="header">
    <div class="header__row1">
      <q-btn-dropdown class="dropdown" unelevated>
        <template v-slot:label>
          <div class="dropdown__label">
            <img class="dropdown__img" src="../assets/sample-logo.png" />
            <div class="dropdown__title">아이티센</div>
          </div>
        </template>
        <q-list class="dropdown__list">
          <q-item
            v-for="item in companyList"
            :key="item"
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn-dropdown class="dropdown" unelevated>
        <template v-slot:label>
          <div class="dropdown__label">
            <img
              class="dropdown__img dropdown__img--user"
              src="https://cdn.quasar.dev/img/avatar.png"
            />
            <div class="dropdown__title">강수지 님</div>
          </div>
        </template>
        <q-list class="dropdown__list">
          <q-item
            v-for="item in companyList"
            :key="item"
            clickable
            v-close-popup
          >
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="header__row2">
      <h1 class="header__title">
        <a href="#">CENT</a>
      </h1>
      <nav class="nav">
        <ul class="flex">
          <li v-for="item in nav" :key="item" class="nav__list">
            <a href="#">{{ item }}</a>
          </li>
        </ul>
      </nav>
      <div class="personal-menu-area">
        <div>
          <q-btn-dropdown size="xs">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="q-ml-md">
          <q-btn
            dense
            round
            icon="notifications_none"
            unelevated
            size="sm"
            @click="toggleRightDrawer"
          >
            <q-badge color="red" floating>4</q-badge>
          </q-btn>
        </div>
        <div class="q-ml-md">
          <q-btn round icon="error" size="xs"> </q-btn>
        </div>
      </div>
    </div>
  </q-header>

  <q-drawer
    side="right"
    v-model="drawerRight"
    :show-if-above="false"
    bordered
    :width="200"
    :breakpoint="500"
    class="bg-grey-3"
    overlay
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const companyList = ["아이티센", "아이티센 아이티센", "아이티센"];
const nav = ["인력관리", "영업관리", "지원업무", "프로젝트관리", "구매/외주"];

const drawerRight = ref(false);
const toggleRightDrawer = () => {
  drawerRight.value = !drawerRight.value;
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  //min-width: 1200px;
  padding: 5px 20px 0;
  border-bottom: 1px solid #ddd;
  background: #fff;
  color: #1e1e1e;
  &__row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 33px;
  }
  .dropdown {
    align-items: center;
    padding: 0;
    &__label {
      display: flex;
      align-items: center;
    }
    &__img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
      &--user {
        width: 26px;
        height: 26px;
      }
    }
    &__title {
      font-size: 12px;
    }
    &__list {
      font-size: 12px;
    }
  }
  &__row2 {
    display: flex;
    align-items: center;
  }
  &__title {
    margin-right: 100px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.5;
  }
  .nav {
    &__list {
      font-size: 14px;
      a {
        position: relative;
        padding: 12px 20px;
        &::after {
          transition: all 0.3s;
        }
        &:hover {
          color: rgba(0, 122, 255, 1);
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 2px;
            background: rgba(0, 122, 255, 1);
          }
        }
      }
    }
  }
  .personal-menu-area {
    display: flex;
    margin-left: auto;
  }
  &__personal-menu {
    width: 50px;
    height: 25px;
    padding: 0;
  }
}
</style>
