<template>
  <MainHeader />
  <MainAside />
  <!-- 컨텐츠 -->
  <q-page class="page">
    <div>
      <span class="page__depth">아이티센 홈</span>
      <span>/</span>
      <span class="page__depth">영업관리</span>
      <span>/</span>
      <span class="page__depth">사업관리</span>
      <span>/</span>
      <span class="page__depth">사업인벤토리</span>
    </div>

    <div class="title-area">
      <h3 class="title-area__title">사업인벤토리</h3>
      <q-btn
        :icon="isFavorite ? `fa-solid fa-star` : `fa-regular fa-star`"
        size="md"
        unelevated
        class="title-area__favorite-btn"
        @click="isFavorite = !isFavorite"
        :ripple="false"
      />
    </div>

    <div class="container">
      <!-- 검색 필드 -->
      <div class="container__row">
        <div class="input__container">
          <div class="input__title">사업</div>
          <q-select
            v-model="model"
            use-input
            input-debounce="0"
            :placeholder="placeholder"
            :options="options"
            @filter="filterFn"
            outlined
            dense
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  검색 결과가 없습니다.
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="input__container">
          <div class="input__title">사업단계</div>
          <q-select outlined v-model="model2" :options="options2" dense />
        </div>

        <div class="input__container">
          <div class="input__title">사업유형</div>
          <q-select outlined v-model="model2" :options="options2" dense />
        </div>
      </div>
    </div>

    <div class="container">
      <!-- 테이블 -->
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        v-model:pagination="pagination"
        hide-pagination
        separator="cell"
        class="table"
      >
        <template v-slot:top>
          <q-btn color="primary" label="삭제" @click="removeRow" />
          <q-space />
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th>
              <q-checkbox v-model="props.selected" dense />
            </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
              <q-tooltip
                anchor="bottom middle"
                self="center left"
                :offset="[-20, 0]"
              >
                <span v-if="pagination.sortBy !== col.label">오름차순</span>
                <span
                  v-else-if="
                    pagination.sortBy === col.label &&
                    pagination.descending === false
                  "
                  >내림차순</span
                >
                <span
                  v-else-if="
                    pagination.sortBy === col.label &&
                    pagination.descending === true
                  "
                  >정렬지우기</span
                >
              </q-tooltip>
            </q-th>
          </q-tr>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md">
        <!-- 페이지네이션 -->
        <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          :max-pages="9"
          direction-links
          boundary-links
          unelevated
          :round="true"
          :outline="true"
          color="teal-50"
          text-color="primary"
          active-color="primary"
          :icon-first="
            pagination.page === 1 ? 'none' : 'keyboard_double_arrow_left'
          "
          :icon-prev="pagination.page === 1 ? 'none' : 'keyboard_arrow_left'"
          :icon-next="
            pagination.page === pagesNumber ? 'none' : 'keyboard_arrow_right'
          "
          :icon-last="
            pagination.page === pagesNumber
              ? 'none'
              : 'keyboard_double_arrow_right'
          "
        />
      </div>
    </div>

    <div class="container">
      <q-tabs
        v-model="tab2"
        inline-label
        active-color="primary"
        indicator-color="transparent"
        content-class="q-tabs--type2"
        active-class="q-tabs--type2-active"
      >
        <q-tab name="mails" :ripple="false" label="구분" />
        <q-tab name="alarms" :ripple="false" label="월별 손익 현황" />
        <q-tab name="movies" :ripple="false" label="월별 손익 현황(재무)" />
        <q-tab name="photos" :ripple="false" label="재료비" />
        <q-tab name="addressbook" :ripple="false" label="인건비(계약직)" />
        <q-tab name="videos1" :ripple="false" label="인건비(자사)" />
        <q-tab name="videos2" :ripple="false" label="인건비(계약직)" />
        <q-tab name="videos3" :ripple="false" label="사업관리비" />
        <q-tab name="videos4" :ripple="false" label="리스크비용" />
      </q-tabs>

      <!-- 탭메뉴 -->
      <q-tabs
        v-model="tab"
        inline-label
        :breakpoint="0"
        align="justify"
        class="q-tabs--type1 bg-primary text-white"
        left-icon=""
        right-icon=""
      >
        <div style="padding: 0 16px; white-space: nowrap">구분</div>
        <q-tab name="1" label="월별 손익 현황" :ripple="false" />
        <q-tab name="2" label="월별 손익 현황(재무)" :ripple="false" />
        <q-tab name="3" label="재료비" :ripple="false" />
        <q-tab name="4" label="인건비(계약직)" :ripple="false" />
        <q-tab name="5" label="인건비(지사)" :ripple="false" />
        <q-tab name="6" label="구분" :ripple="false" />
        <q-tab name="7" label="월별 손익 현황" :ripple="false" />
        <q-tab name="8" label="월별 손익 현황(재무)" :ripple="false" />
        <q-tab name="9" label="재료비" :ripple="false" />
        <q-tab name="10" label="인건비(계약직)" :ripple="false" />
        <q-tab name="11" label="인건비(지사)" :ripple="false" />
      </q-tabs>

      <!-- 탭 패널 -->
      <q-tab-panels
        v-model="tab"
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="1">
          <!-- 테이블 -->
          <q-table
            ref="tableRef"
            title="월별 손익 현황"
            :rows="table2.rows"
            :columns="table2.columns"
            :table-colspan="9"
            row-key="index"
            separator="cell"
            hide-bottom
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th rowspan="3">구분</q-th>
                <q-th rowspan="3">성명</q-th>
                <q-th rowspan="3">업무구분</q-th>
                <q-th rowspan="3">등급</q-th>
                <q-th rowspan="1" colspan="3">총합계</q-th>
                <q-th rowspan="2" colspan="3">잔여금액</q-th>
                <q-th rowspan="2" colspan="2">리스크비용</q-th>
                <q-th rowspan="1" colspan="3">무상유지보수</q-th>
              </q-tr>
              <q-tr>
                <q-th colspan="3">계약직금액</q-th>
                <q-th colspan="3">2023(M/M)</q-th>
              </q-tr>
              <q-tr>
                <q-th>M/M</q-th>
                <q-th>금액</q-th>
                <q-th>계약금</q-th>
                <q-th>계약직금액</q-th>
                <q-th>4대보험료</q-th>
                <q-th>용역금액</q-th>
                <q-th>계약직금액</q-th>
                <q-th>용역금액</q-th>
                <q-th>M/M</q-th>
                <q-th>3월</q-th>
                <q-th>4월</q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td>근로</q-td>
                <q-td>홍길동</q-td>
                <q-td>TA</q-td>
                <q-td>중급</q-td>
                <q-td>2</q-td>
                <q-td>12,200</q-td>
                <q-td>10,000</q-td>
                <q-td>0</q-td>
                <q-td>0</q-td>
                <q-td>0</q-td>
                <q-td>0</q-td>
                <q-td>0</q-td>
                <q-td>2</q-td>
                <q-td>2</q-td>
                <q-td>1</q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>

        <q-tab-panel name="2">
          <div class="text-h4 q-mb-md">Alarms</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
        </q-tab-panel>

        <q-tab-panel name="3">
          <div class="text-h4 q-mb-md">Movies</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div class="container">
      <!-- 테이블 쓰기 -->
      <q-list>
        <q-expansion-item
          switch-toggle-side
          expand-separator
          default-opened
          icon="perm_identity"
          label="사업기회등록"
        >
          <div class="form">
            <div class="row">
              <div class="col-md-1 col-sm-2 form__title">사업코드</div>
              <div class="col-md-3 col-sm-4 form__content">-</div>
              <div class="col-md-1 col-sm-2 form__title">사업명</div>
              <div class="col-md-3 col-sm-4 form__content">
                <q-select
                  v-model="model"
                  use-input
                  input-debounce="0"
                  :placeholder="placeholder"
                  :options="options"
                  @filter="filterFn"
                  outlined
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        검색 결과가 없습니다.
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-1 col-sm-2 form__title">사업단계</div>
              <div class="col-md-3 col-sm-4 form__content"></div>
              <div class="col-md-1 col-sm-2 form__title">사업유형</div>
              <div class="col-md-3 col-sm-4 form__content">
                <q-select outlined v-model="model2" :options="options2" />
              </div>
              <div class="col-md-1 col-sm-2 form__title">사업분류</div>
              <div class="col-md-3 col-sm-4 form__content">-</div>
              <div class="col-md-1 col-sm-2 form__title">수주확도</div>
              <div class="col-md-3 col-sm-4 form__content">-</div>
              <div class="col-md-1 col-sm-2 form__title">예상매출액</div>
              <div class="col-md-3 col-sm-4 form__content">
                <q-input v-model="text" outlined suffix="원" type="number" />
              </div>
              <div class="col-md-1 col-sm-2 form__title">
                사전영업기간 시작일
              </div>
              <div class="col-md-3 col-sm-4 form__content">
                <q-input v-model="text" outlined type="date" />
              </div>
              <div class="col-md-1 col-sm-2 form__title">VRB수행여부</div>
              <div class="col-md-3 col-sm-10 form__content">
                <q-checkbox
                  v-model="checkBoxTest.checkbox1"
                  label="사업참여VRB"
                />
                <q-checkbox
                  v-model="checkBoxTest.checkbox2"
                  label="입찰참여VRB"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-1 col-sm-2 form__title">사업내용</div>
              <div class="col-md-11 col-sm-10 form__content">
                <q-editor v-model="editor" min-height="5rem" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-1 col-sm-2 form__title">첨부파일</div>
              <div class="col-md-11 col-sm-10 form__content">
                <q-uploader
                  url="http://localhost:4444/upload"
                  flat
                  no-thumbnails
                  hide-upload-btn
                  multiple
                  color="transparent"
                >
                  <template
                    v-slot:list="upload"
                    v-if="upload?.queuedFiles !== undefined"
                    >{{ upload.queuedFiles }}</template
                  >
                  <template v-slot:header="scope">
                    <q-btn
                      v-if="scope.canAddFiles"
                      @click="scope.pickFiles"
                      color="blue"
                      outline
                      rounded
                      label="파일선택"
                    >
                      <q-uploader-add-trigger />
                    </q-btn>
                    <q-btn
                      v-if="scope.queuedFiles.length > 0"
                      @click="scope.removeQueuedFiles"
                      color="red"
                      outline
                      rounded
                      style="margin-left: 5px"
                    >
                      전체삭제
                    </q-btn>
                  </template>
                </q-uploader>
              </div>
            </div>
          </div>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          default-opened
          icon="perm_identity"
          label="수주확도"
        >
          <!-- 라디오 버튼 -->
          <div class="form">
            <div class="row">
              <div class="col-2 form__head">평가항목</div>
              <div class="col-2 form__head">재료비</div>
              <div class="col-8 form__head">평가기준</div>
              <div class="col-2 form__body">가격경쟁력</div>
              <div class="col-1 column" style="height: 100px">
                <div class="col form__body">5</div>
                <div class="col form__body">3</div>
                <div class="col form__body">1</div>
              </div>
              <div class="col-1 column" style="height: 100px">
                <div class="col form__body">
                  <q-radio v-model="radio" val="5" size="xs" />
                </div>
                <div class="col form__body">
                  <q-radio v-model="radio" val="3" size="xs" />
                </div>
                <div class="col form__body">
                  <q-radio v-model="radio" val="1" size="xs" />
                </div>
              </div>
              <div class="col-8 column" style="height: 100px">
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-1 form__body">고객관계</div>
              <div class="col-1 form__body">Key-man 확보</div>
              <div class="col-1 column" style="height: 100px">
                <div class="col form__body">5</div>
                <div class="col form__body">3</div>
                <div class="col form__body">1</div>
              </div>
              <div class="col-1 column" style="height: 100px">
                <div class="col form__body">
                  <q-radio v-model="radio2" val="5" size="xs" />
                </div>
                <div class="col form__body">
                  <q-radio v-model="radio2" val="3" size="xs" />
                </div>
                <div class="col form__body">
                  <q-radio v-model="radio2" val="1" size="xs" />
                </div>
              </div>
              <div class="col-8 column" style="height: 100px">
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
                <div class="col form__body">
                  당사가 경쟁사 대비 저가 제공기능
                </div>
              </div>
            </div>
          </div>
        </q-expansion-item>
      </q-list>
    </div>

    <div class="container flex no-wrap">
      <!--      <div class="chart-js">
              <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
              />
            </div>-->

      <!-- 차트 -->
      <div class="chart">
        <h5 class="chart__title">영업본부별 사업현황</h5>
        <div class="chart__chip-sort">
          <div class="chart__chip-container">
            <div class="chart__chip chip1"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공2사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip2"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공3사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip3"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공4사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip4"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공5사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip5"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공6사업부</span
            >
          </div>
        </div>
        <div class="flex no-wrap">
          <div class="chart__graph">
            <ul class="chart__graph--y">
              <li class="chart__row" data-y="2"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row" data-y="0"></li>
            </ul>
            <ul class="chart__graph--x">
              <li class="chart__column chip1" style="height: 50%"></li>
              <li class="chart__column chip2" style="height: 70%"></li>
              <li class="chart__column chip3" style="height: 100%"></li>
              <li class="chart__column chip4" style="height: 50%"></li>
            </ul>
          </div>

          <div class="chart__graph">
            <ul class="chart__graph--y">
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
            </ul>
            <ul class="chart__graph--x">
              <li class="chart__column chip5" style="height: 50%"></li>
            </ul>
          </div>

          <div class="chart__graph">
            <ul class="chart__graph--y">
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
              <li class="chart__row"></li>
            </ul>
            <ul class="chart__graph--x">
              <li class="chart__column chip1" style="height: 50%"></li>
              <li class="chart__column chip2" style="height: 70%"></li>
              <li class="chart__column chip3" style="height: 100%"></li>
              <li class="chart__column chip4" style="height: 50%"></li>
              <li class="chart__column chip5" style="height: 50%"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="chart">
        <h5 class="chart__title">위험/이슈 현황</h5>
        <div class="chart__chip-sort">
          <div class="chart__chip-container">
            <div class="chart__chip chip1"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공2사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip2"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공3사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip3"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공4사업부</span
            >
          </div>
          <div class="chart__chip-container">
            <div class="chart__chip chip4"></div>
            <span class="chart__chip-name"
              >P&S_공공부문_공공1사업본부_공공5사업부</span
            >
          </div>
        </div>
        <div class="chart__graph">
          <ul class="chart__graph--y">
            <li class="chart__row" data-y="2"></li>
            <li class="chart__row"></li>
            <li class="chart__row"></li>
            <li class="chart__row"></li>
            <li class="chart__row" data-y="0"></li>
          </ul>
          <ul class="chart__graph--x">
            <li class="chart__column chip1" style="height: 50%"></li>
            <li class="chart__column chip2" style="height: 70%"></li>
            <li class="chart__column chip3" style="height: 100%"></li>
            <li class="chart__column chip4" style="height: 50%"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-center">
        <div style="display: flex; width: 100%">
          <!-- 레인지 피커 -->
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <q-checkbox
              v-model="mobile"
              label="Mobile selection (first click, second click)"
            />
          </div>

          <q-calendar-month
            ref="calendar"
            v-model="selectedDate"
            :selected-start-end-dates="startEndDates"
            no-active-date
            :day-min-height="120"
            :locale="ko - KR"
            animated
            bordered
            @mousedown-day="onMouseDownDay"
            @mouseup-day="onMouseUpDay"
            @mousemove-day="onMouseMoveDay"
            @change="onChange"
            class="range-picker-calendar"
          />
        </div>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="signal_wifi_off"
              color="primary"
              text-color="white"
            />
            <span class="q-ml-sm"
              >You are currently not connected to any network.</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent } from "vue";
import {
  QCalendarMonth,
  getDayIdentifier,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";

// 즐겨찾는 메뉴
const isFavorite = ref(false);

// 텍스트형 셀렉터
const stringOptions = [
  "google",
  "구글",
  "구글111",
  "페이스북",
  "트위터",
  "애플",
  "오라클",
];
const options = ref(stringOptions);
const model = ref(null);
const placeholder = ref("사업명 찾기");

const filterFn = (val, update) => {
  console.log(typeof val, typeof update);
  if (val.length < 2) {
    update(() => {
      options.value = ["한글자 이상 입력해주세요"];
    });
  } else {
    update(() => {
      const needle = val.toLowerCase();
      options.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
      placeholder.value = "";
    });
  }
};

// 셀렉터
const model2 = ref("-- 전체 --");
const options2 = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

// 테이블
const columns = [
  {
    name: "사업코드",
    align: "center",
    label: "사업코드",
    field: "calories",
    sortable: true,
    sortState: "descending",
  },
  {
    name: "사업명",
    align: "center",
    label: "사업명",
    field: "fat",
    sortable: true,
  },
  {
    name: "사업단계",
    align: "center",
    label: "사업단계",
    field: "carbs",
    sortable: true,
  },
  {
    name: "매출처",
    align: "center",
    label: "매출처",
    field: "protein",
    sortable: true,
  },
  {
    name: "발주처",
    align: "center",
    label: "발주처",
    field: "sodium",
    sortable: true,
  },
  {
    name: "수요처",
    align: "center",
    label: "수요처",
    field: "calcium",
    sortable: true,
  },
  {
    name: "영업대표",
    align: "center",
    label: "영업대표",
    field: "iron",
    sortable: true,
  },
  {
    name: "결제상태",
    align: "center",
    label: "수요처",
    field: "calcium",
    sortable: true,
  },
  {
    name: "사업유형",
    align: "center",
    label: "수요처",
    field: "calcium",
    sortable: true,
  },
];
const originalRows = [
  {
    name: "1",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "2",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "3",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "4",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "5",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "6",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "7",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "8",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "9",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "10",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
  {
    name: "11",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "12",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "13",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "14",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "15",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "16",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "17",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "18",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "19",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "20",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "21",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "22",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "23",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "24",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "25",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "26",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "27",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "28",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "29",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "30",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
];
const selected = ref([]);
const rows = ref([...originalRows]);
const removeRow = () => {
  console.log("remove");
};

// 페이지네이션
const pagination = ref({
  sortBy: null,
  descending: false,
  page: 1,
  rowsPerPage: 10,
  // rowsNumber: xx if getting data from a server
});
const pagesNumber = computed(() =>
  Math.ceil(rows.value.length / pagination.value.rowsPerPage)
);

// 탭
const tab = ref("1");
const tab2 = ref("mails");

// 테이블2
const table2 = {
  columns: [
    {
      name: "구분",
      align: "center",
      label: "구분",
      field: "calories",
      sortable: true,
      rowspan: 3,
    },
    {
      name: "성명",
      align: "center",
      label: "성명",
      field: "fat",
      sortable: true,
      rowspan: 3,
    },
    {
      name: "업무구분",
      align: "center",
      label: "업무구분",
      field: "carbs",
      sortable: true,
      rowspan: 3,
    },
    {
      name: "등급",
      align: "center",
      label: "등급",
      field: "protein",
      sortable: true,
      rowspan: 3,
    },
    {
      name: "총합계",
      align: "center",
      label: "총합계",
      field: "sodium",
      sortable: true,
      rowspan: 1,
    },
    {
      name: "잔여금액",
      align: "center",
      label: "잔여금액",
      field: "calcium",
      sortable: true,
      rowspan: 1,
    },
    {
      name: "리스크비용",
      align: "center",
      label: "리스크비용",
      field: "iron",
      sortable: true,
      rowspan: 1,
    },
    {
      name: "무상유지보수",
      align: "center",
      label: "무상유지보수",
      field: "calcium",
      sortable: true,
      rowspan: 3,
    },
  ],
  rows: [
    {
      name: "1",
      calories: "근로",
      fat: "홍길동",
      carbs: "TA",
      protein: "중급",
      sodium: 2,
      calcium: 0,
      iron: "1%",
    },
  ],
};

// const date = ref('2019/02/01');

const text = ref(null);

const checkBoxTest = ref({
  checkbox1: ref(true),
  checkbox2: ref(false),
});

const editor = ref(null);

const radio = ref(null);
const radio2 = ref(null);

// 레인지 셀렉터
function leftClick(e) {
  return e.button === 0;
}

const selectedDate = ref(today()),
  calendar = ref(null),
  anchorTimestamp = ref(null),
  otherTimestamp = ref(null),
  mouseDown = ref(false),
  mobile = ref(false),
  confirm = ref(false);

const startEndDates = computed(() => {
  const dates = [];
  if (
    anchorDayIdentifier.value !== false &&
    otherDayIdentifier.value !== false
  ) {
    if (anchorDayIdentifier.value <= otherDayIdentifier.value) {
      dates.push(anchorTimestamp.value.date, otherTimestamp.value.date);
    } else {
      dates.push(otherTimestamp.value.date, anchorTimestamp.value.date);
    }
  }
  return dates;
});

const anchorDayIdentifier = computed(() => {
  if (anchorTimestamp.value !== null) {
    return getDayIdentifier(anchorTimestamp.value);
  }
  return false;
});

const otherDayIdentifier = computed(() => {
  if (otherTimestamp.value !== null) {
    return getDayIdentifier(otherTimestamp.value);
  }
  return false;
});

function onMouseDownDay({ scope, event }) {
  if (leftClick(event)) {
    if (
      mobile.value === true &&
      anchorTimestamp.value !== null &&
      otherTimestamp.value !== null &&
      anchorTimestamp.value.date === otherTimestamp.value.date
    ) {
      otherTimestamp.value = scope.timestamp;
      mouseDown.value = false;
      return;
    }
    // mouse is down, start selection and capture current
    mouseDown.value = true;
    anchorTimestamp.value = scope.timestamp;
    otherTimestamp.value = scope.timestamp;
  }
}

function onMouseUpDay({ scope, event }) {
  if (leftClick(event)) {
    // mouse is up, capture last and cancel selection
    otherTimestamp.value = scope.timestamp;
    mouseDown.value = false;
  }
}

function onMouseMoveDay({ scope }) {
  if (mouseDown.value === true && scope.outside !== true) {
    otherTimestamp.value = scope.timestamp;
  }
}

function onMoved(data) {
  console.log("onMoved", data);
}

function onChange(data) {
  console.log("onChange", data);
}

function onClickDate(data) {
  console.log("onClickDate", data);
}

// function onClickDay (data) {
//   console.log('onClickDay', data)
// }
function onClickWorkweek(data) {
  console.log("onClickWorkweek", data);
}

function onClickHeadDay(data) {
  console.log("onClickHeadDay", data);
}

function onClickHeadWorkweek(data) {
  console.log("onClickHeadWorkweek", data);
}

onMounted(() => {
  const day = document.querySelectorAll(".q-calendar__button");
  console.log(day);
});
</script>

<style lang="scss" scoped>
// 차트
.chart {
  padding: 20px 50px;

  &__title {
    margin-bottom: 20px;
    text-align: center;
  }

  &__chip-sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }

  &__chip-container {
    display: flex;
    align-items: center;
    flex: 1 1 50%;

    + .chart__chip-container {
      margin-top: 6px;
    }
  }

  &__chip {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .chip1 {
    background-image: url("../assets/dot.png");
    background-size: 50px;
    background-repeat: repeat;
    background-color: #e56b51;
  }

  .chip2 {
    background: #4eccbe;
  }

  .chip3 {
    background: #deba30;
  }

  .chip4 {
    background: #3674d3;
  }

  .chip5 {
    background: #76c758;
  }

  &__graph {
    position: relative;
    width: 100%;

    & + .chart__graph {
      border-left: 1px solid #ddd;
    }

    &--y {
      display: flex;
      flex-direction: column;
      height: 200px;
    }

    &--x {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: end;
      width: 100%;
      height: 100%;
    }
  }

  &__row {
    position: relative;
    flex: 1 1 20%;
    border-top: 1px solid #ddd;

    &:last-child {
      flex: 0 0 0;
    }

    &[data-y]::after {
      content: attr(data-y);
      position: absolute;
      left: -25px;
      top: -10px;
      width: 20px;
      height: 20px;
    }
  }

  &__column {
    width: 30px;

    ::after {
    }
  }
}
</style>
