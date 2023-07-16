<template>
  <div class="home">
    <div class="page page-center w-100 position-absolute">
      <div class="container-tight p-0">
        <div class="card border-0 shadow-lg">
          <div class="card-body company-header">
            <div class="d-flex align-items-center position-relative">
              <span
                class="avatar avatar-lg me-3 shadow"
                :style="`background-image: url(${event.avatar});`"
              ></span>
              <div class="lh-lg text-white">
                <div class="h2">
                  {{ event.brand_name }}
                </div>
                <div class="lh-sm text-title">
                  {{ event.company_name }}
                </div>
              </div>
              <div class="ms-auto">
                <div class="qr-code rounded bg-white shadow">
                  <div id="qr-scan"></div>
                  <span class="h6 bg-warning lh-sm rounded-bottom"
                    >SCAN UNTUK MENDAFTAR</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="card-header justify-content-between border-0">
            <h1 class="h2 m-0">
              {{ event.title }}
            </h1>
            <button
              type="button"
              class="cta_share btn btn-outline-azure bg-azure ms-3 py-1 px-2 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-sm me-1"
                width="40"
                height="40"
                viewBox="0 0 26 26"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M8.7 10.7l6.6 -3.4"></path>
                <path d="M8.7 13.3l6.6 3.4"></path>
              </svg>
              <span class="px-1">SHARE</span>
            </button>
          </div>
          <div class="card-body pt-0 pb-2 px-1" style="overflow-x: scroll">
            <div id="timeline" style="width: fit-content">
              <div class="progress progress-separated mb-2">
                <div
                  role="progressbar"
                  class="regP progress-bar bg-azure"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).regD / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                ></div>
                <div
                  role="progressbar"
                  class="val1P progress-bar bg-yellow"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).val1D / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                  v-if="getDayDiff(event).val1D > 0"
                ></div>
                <div
                  role="progressbar"
                  class="subP progress-bar bg-green"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).subD / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                  v-if="getDayDiff(event).subD > 0"
                ></div>
                <div
                  role="progressbar"
                  class="evtP progress-bar bg-red"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).evtD / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                  :class="{
                    'border-end-0': event.winning_prize !== 'Y',
                  }"
                ></div>
                <div
                  role="progressbar"
                  class="val2P progress-bar bg-yellow"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).val2D / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                  v-if="getDayDiff(event).val2D > 0"
                ></div>
                <div
                  role="progressbar"
                  class="winP progress-bar bg-blue-lt border-end-0"
                  :style="{
                    width:
                      Math.ceil(
                        (getDayDiff(event).winD / getDayDiff(event).totD) * 100
                      ) + '%',
                  }"
                ></div>
              </div>
              <div class="d-flex justify-content-between">
                <div class="regP status bg-azure-lt text-truncate text-title">
                  <span class="status-dot d-none d-xl-block status-azure"></span
                  >Registrasi :
                  <span class="date">
                    {{ getStrDate(event).regP }}
                  </span>
                  (<span class="days">
                    {{ getDayDiff(event).regD }}
                  </span>
                  hari &nbsp;)
                </div>
                <div
                  class="val1P status bg-yellow-lt text-truncate text-title"
                  v-if="getDayDiff(event).val1D > 0"
                >
                  <span
                    class="status-dot d-none d-xl-block status-yellow"
                  ></span
                  >Evaluasi :
                  <span class="date">
                    {{ getStrDate(event).val1P }}
                  </span>
                  (<span class="days">
                    {{ getDayDiff(event).val1D }}
                  </span>
                  hari &nbsp;)
                </div>
                <div class="subP status bg-green-lt text-truncate text-title">
                  <span
                    class="status-dot d-none d-xl-block status-green"
                    v-if="getDayDiff(event).subD > 0"
                  ></span
                  >Penyerahan :
                  <span class="date">
                    {{ getStrDate(event).subP }}
                  </span>
                  (<span class="days">
                    {{ getDayDiff(event).subD }}
                  </span>
                  hari &nbsp;)
                </div>
                <div class="evtP status bg-red-lt text-truncate text-title">
                  <span class="status-dot d-none d-xl-block status-red"></span
                  >Event :
                  <span class="date">
                    {{ getStrDate(event).evtP }}
                  </span>
                  (<span class="days">
                    {{ getDayDiff(event).evtD }}
                  </span>
                  hari &nbsp;)
                </div>
                <div class="val2P status bg-yellow-lt text-truncate text-title">
                  <span
                    class="status-dot d-none d-xl-block status-yellow"
                    v-if="getDayDiff(event).val2D > 0"
                  ></span
                  >Evaluasi :
                  <span class="date">
                    {{ getStrDate(event).val2P }}
                  </span>
                  (<span class="days">
                    {{ getDayDiff(event).val2D }}
                  </span>
                  hari &nbsp;)
                </div>
                <div class="winP status bg-blue-lt text-truncate text-title">
                  <span class="status-dot d-none d-xl-block status-blue"></span
                  >Pengumuman :
                  <span class="date">
                    {{ getStrDate(event).winP }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-block position-relative">
            <img src="" class="card-img-top" />
            <div
              class="ribbon rounded-start bg-white text-dark opacity-95 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-timeline me-2"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 16l6 -7l5 5l5 -6"></path>
                <path d="M15 14m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M10 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M4 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                <path d="M20 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
              </svg>
              <span class="m-0 text-title">PENDAFTARAN</span>
            </div>
          </div>
          <div class="card-body border-0">
            <nav class="mt-2">
              <div
                id="tabs-description"
                class="nav nav-tabs nav-fill text-title"
              >
                <div
                  class="nav-link justify-content-center active"
                  data-bs-toggle="tab"
                  data-bs-target="#tabs-description-D"
                >
                  Deskripsi
                </div>
                <div
                  class="nav-link justify-content-center"
                  data-bs-toggle="tab"
                  data-bs-target="#tabs-description-1"
                  v-for="(additional, i) in additionalDescriptions"
                  :key="i"
                >
                  {{ additional.title }}
                </div>
                <div
                  class="nav-link justify-content-center"
                  data-bs-toggle="tab"
                  data-bs-target="#tabs-description-R"
                >
                  <span class="me-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-trophy"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M8 21l8 0"></path>
                      <path d="M12 17l0 4"></path>
                      <path d="M7 4l10 0"></path>
                      <path d="M17 4v8a5 5 0 0 1 -10 0v-8"></path>
                      <path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                      <path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    </svg>
                  </span>
                  Hadiah
                </div>
              </div>
            </nav>
            <div class="tab-content">
              <div id="tabs-description-D" class="tab-pane active">
                <textarea
                  class="form-control rounded-0 border-top-0"
                  readonly=""
                  autocomplete="off"
                  v-model="event.description"
                >
                </textarea>
              </div>
              <div
                class="tab-pane"
                v-for="(additional, j) in additionalDescriptions"
                :key="j"
                :id="`tabs-description-${j + 1}`"
              >
                <textarea
                  class="form-control rounded-0 border-top-0"
                  readonly=""
                  autocomplete="off"
                  v-model="additional.content"
                >
                </textarea>
              </div>
              <div id="tabs-description-R" class="tab-pane">
                <textarea
                  class="form-control rounded-0 border-top-0"
                  readonly=""
                  autocomplete="off"
                  v-model="event.prize_description"
                >
                </textarea>
              </div>
            </div>
          </div>
          <div class="card-footer mb-3 align-items-center"></div>
        </div>
        <div class="d-block" style="height: 32px"></div>
      </div>
    </div>
    <!-- <button id="cta_playstore" type="button" class="border-0 p-0 btn-square hover-shadow fixed-bottom container-tight bg-transparent">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon text-azure icon-pulse icon-lg" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path>
      </svg>
      <div class="bg-dark py-2 d-flex align-items-center justify-content-evenly">
        <img src="@/assets/static/logo-white.svg" height="47" alt="">
        <div class="row" style="display:none">
          <div class="col google-play">
            <a href="http://play.google.com"><img src="@/assets/static/store/google-play.png" width="130" height="40" alt="Get it on Google Play"></a>
          </div>
          <div class="col app-store">
            <a href="http://itunes.apple.com"><img src="@/assets/static/store/app-store.png" width="130" height="40" alt="Download on the App Store"></a>
          </div>
        </div>
      </div>
    </button> -->
  </div>
</template>

<script>
import eventService from "@/service/event";

export default {
  name: "Home",
  data() {
    return {
      event: {},
    };
  },
  computed: {
    additionalDescriptions() {
      try {
        if (!this.event.free_data3) {
          return [];
        }

        const result = JSON.parse(this.event.free_data3);

        return result;
      } catch {
        return [];
      }
    },
  },
  methods: {
    getDayDiff(evt) {
      return JSON.parse(evt.free_data1);
    },
    getStrDate(evt) {
      return JSON.parse(evt.free_data2);
    },
  },
  async mounted() {
    const eventPublicId = this.$route.params.eventPublicId + location.hash;
    const inquiryResponse = (await eventService.getEventInsight(eventPublicId))
      .data;

    this.event = inquiryResponse.events[0];
  },
};
</script>

<style lang="scss">
@import "../assets/css/tabler-icons.css";
@import "../assets/css/tabler.min.css";
@import "../assets/css/demo.css";
@import "../assets/css/tabler-vendors.min.css";
@import "../assets/css/custom.css";

.sortable > .row > div:first-child,
.sortable > .row > div:last-child {
  visibility: hidden;
}

.sortable > .row:hover div:first-child,
.sortable > .row:hover div:last-child {
  visibility: visible;
}

.sortable-placeholder {
  height: 44px !important;
}

.fade-enter {
  opacity: 0;
  transform: translateX(10vw);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10vw);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-out;
}
</style>
