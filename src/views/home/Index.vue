<template>
  <div class="home-page d-flex">
    <div
      class="sidebar border"
      :class="{
        'sidebar-small': sideBar,
        'sidebar-medium': !sideBar,
      }"
    >
      <div class="p-4 ps-7">
        <img src="@/assets/billfin.svg" alt="Logo" width="40" />
      </div>

      <div class="mt-2">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link active" href="#">
              <i class="fas fa-box p-4 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Dashboard</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">
          CLIENT INFO
        </p>
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
          <i class="fas fa-ellipsis-h"></i>
        </p>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-user-friends p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Clients</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-grip-lines p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Fee Schedules</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-tags p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Products</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-grip-lines-vertical p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Subscriptions</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-clock p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Timesheets</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">
          BILLNG & PAYMENTS
        </p>
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
          <i class="fas fa-ellipsis-h"></i>
        </p>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-dollar-sign p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Fees</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-money-check-alt p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Invoices</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-tags p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Payments</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-chart-line p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Reports</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-4">
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-if="!sideBar">
          ADMINSTRATION
        </p>
        <p class="mb-0 ps-10 pt-0 pb-0 fw-bold nav-bar__name" v-else>
          <i class="fas fa-ellipsis-h"></i>
        </p>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-cog p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Settings</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center nav-link" href="#">
              <i class="fas fa-question p-3 ps-6 fs-7"></i>
              <span class="fs-7 nav-link__name">Help</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-100 vh-100 bg-light overflow-hidden" v-if="firms">
      <nav class="navbar border-bottom bg-white">
        <div class="row w-100 align-items-center">
          <div class="col-lg-1 pe-0">
            <button class="btn float-start" @click="sideBar = !sideBar">
              <img
                src="@/assets/arrow-to-right.svg"
                alt="Arrow Icon"
                v-if="sideBar"
              />
              <img src="@/assets/arrow-to-left.svg" alt="Arrow Icon" v-else />
            </button>
          </div>
          <div class="col-lg-2 ps-0">
            <div class="d-flex align-items-center justify-content-start">
              <div class="dropdown" v-click-outside="clickOutSideFirm">
                <div
                  class="dropdown-toggle fw-bold"
                  @click="firms.length > 1 ? (toggleFirms = true) : ''"
                >
                  {{ selectedFirm }}
                </div>
                <ul
                  v-for="(item, index) of firms"
                  :key="index"
                  class="dropdown-menu"
                  :class="{ show: toggleFirms }"
                >
                  <li><a class="dropdown-item" href="#">Firm 1</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Firm 2</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Firm 3</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-5 mt-4 d-flex justify-content-center">
            <div class="input-group input-group-solid mb-2 w-50">
              <span class="input-group-text">
                <img src="@/assets/search.svg" alt="Search Icon" />
              </span>
              <input
                class="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
          <div class="col-lg-2">
            <button type="button" class="btn btn-primary fs-7">
              Create New
            </button>
          </div>
          <div class="col-lg-2 d-flex align-items-center p-0">
            <button class="btn">
              <img
                src="@/assets/notification-bell.svg"
                alt="Notification bell icon"
                width="30"
              />
            </button>

            <div class="dropdown" v-click-outside="clickOutSideUser">
              <div class="dropdown-toggle" @click="toggleUser = true">
                <span class="me-3">Hi Zoe</span>
                <img src="@/assets/User.png" alt="User Photo" />
              </div>
              <div class="dropdown-menu p-4" :class="{ show: toggleUser }">
                <button class="dropdown-item btn" @click="logout">
                  <i class="fas fs-3 fa-sign-out-alt"></i> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="bg-light">
        <div class="row">
          <div class="col-3">
            <p class="fw-bolder m-0 p-4 pb-0 fs-5 text-dark fw-bold">
              Dashboard
            </p>
            <ol class="breadcrumb ps-4 pb-4">
              <li class="breadcrumb-item">
                <a href="#" class="text-muted">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a href="#" class="text-dark fw-bold">Dashboard</a>
              </li>
            </ol>
          </div>
          <div class="col-5 p-4">
            <div
              class="alert alert-danger fs-8 text-center fw-bolder text-dark border-0"
              role="alert"
              v-if="firms"
            >
              <i class="fas fa-info-circle text-danger"></i> You only have {{showTrailExpireDays}} more day(s) in
              your trial. Ready to sign-up? Click <a href="">here</a> to get
              started
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <Welcome
      :step="lastOnboardingStep"
      @closeOnBoard="onCloseOnBoard"
      v-if="showOnBoard"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import Welcome from "./components/OnBoard.vue";

import { IFirmService } from "@/service";
import { firmsResponseModel } from "@/model";

@Options({
  components: {
    Welcome,
  },
})
export default class Home extends Vue {
  @Inject("firmService") service: IFirmService | undefined;

  public store = useStore();
  public showOnBoard: boolean = false;
  public sideBar: boolean = false;
  public toggleFirms: boolean = false;
  public toggleUser: boolean = false;

  public firms = new Array<firmsResponseModel>();
  public selectedFirm: string = "";
  public lastOnboardingStep: number | any = 0;
  public showTrailExpireDays: number = 0;

  mounted() {
    this.getFirms();
  }

  private getFirms() {
    this.service.getFirms().then((response) => {
      this.firms = response;
      this.trailExpireDays();
      this.store.dispatch("loadEntitlements", response);
      this.selectedFirm = this.store.getters.selectedFirmName;
      if (
        this.firms.length == 1 &&
        this.firms[0].trialOnboardingStatus != "COMPLETED"
      ) {
        this.showOnBoard = false;
        if (this.firms[0].trialOnboardingStatus == "NOT_STARTED")
          this.lastOnboardingStep = 1;
        else
          this.lastOnboardingStep = this.firms[0].lastOnboardingStepCompleted;
      }
    });
  }

  public onCloseOnBoard() {
    this.showOnBoard = false;
  }

  public clickOutSideFirm() {
    this.toggleFirms = false;
  }

  public clickOutSideUser() {
    this.toggleUser = false;
  }

  public logout() {
    this.store.dispatch("logout");
  }

  public trailExpireDays() {
    const startDate = new Date(
        this.firms[0].trialStartsOn.split("-")[1] +
          "/" +
          this.firms[0].trialStartsOn.split("-")[2] +
          "/" +
          this.firms[0].trialStartsOn.split("-")[0]
      ),
      endDate = new Date(
        this.firms[0].trialEndsOn.split("-")[1] +
          "/" +
          this.firms[0].trialEndsOn.split("-")[2] +
          "/" +
          this.firms[0].trialEndsOn.split("-")[0]
      );

    const time = endDate.getTime() - startDate.getTime();
    const days = time / (1000 * 3600 * 24);

    this.showTrailExpireDays = days;
  }
}
</script>