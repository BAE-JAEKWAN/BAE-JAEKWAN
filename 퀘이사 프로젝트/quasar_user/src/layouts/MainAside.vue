<template>
  <q-drawer
    show-if-above
    :mini="drawerLeft"
    :width="220"
    :mini-width="50"
    :breakpoint="700"
  >
    <q-scroll-area class="fit aside">
      <q-list>
        <h2 class="aside__title">
          <span v-if="!drawerLeft">영업관리</span>
        </h2>

        <q-separator v-if="!drawerLeft" />
        <q-expansion-item
          v-if="!drawerLeft"
          label="사업관리"
        >
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>사업관리현황</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>사업인벤토리</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>VRB 요청</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator v-if="!drawerLeft" />

        <q-expansion-item
          v-if="!drawerLeft"
          label="제안관리"
        >
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>사업관리현황</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>사업인벤토리</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>VRB 요청</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator v-if="!drawerLeft" />

        <q-expansion-item
          v-if="!drawerLeft"
          label="현황관리"
        >
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>사업관리현황</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>사업인벤토리</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>VRB 요청</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-separator v-if="!drawerLeft" />
      </q-list>
    </q-scroll-area>
    <q-btn round unelevated size="sm" :icon="toggleBtnIcon" class="aside__toggle-btn" @click="toggleLeftDrawer"></q-btn>
  </q-drawer>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const drawerLeft = ref(false);
const toggleBtnIcon = ref('chevron_left');
const toggleLeftDrawer = () => {
  drawerLeft.value = !drawerLeft.value;
  if (drawerLeft.value === false) toggleBtnIcon.value = 'chevron_left';
  else if (drawerLeft.value === true) toggleBtnIcon.value = 'chevron_right';
};
</script>

<style lang="scss" scoped>
.aside {
  position: relative;
  border-right: 1px solid #ddd;
  color: #fff;
  background: #313644;
  &__title {
    height: 76px;
    padding: 8px 16px;
    font-size: 24px;
    font-weight: bold;
  }
  &__toggle-btn {
    position: absolute;
    top: 40px;
    right: -10px;
    border: 1px solid #ddd;
    font-size: 16px;
    background: #fff;
  }
  ::v-deep(.q-item) {
    padding: 10px 20px;
  }
  .q-separator {
    background: #555;
  }
}
</style>
