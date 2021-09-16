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
    <div class="w-100 vh-100 bg-light">
      <nav class="navbar border-bottom bg-white">
        <div class="row w-100 align-items-center">
          <div class="col-lg-2">
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn float-start" @click="sideBar = !sideBar">
                <i class="fas fa-arrow-right"></i>
              </button>
              <!--<input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> -->
              <div class="dropdown" v-click-outside="clickOutSideFirm">
                <div
                  v-for="(item, index) of firms"
                  :key="index"
                  @click="firms.length > 1 ? (showFirms = true) : ''"
                >
                  {{ item.name }}
                  <ul class="dropdown-menu" :class="{ show: showFirms }">
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
          </div>
          <div class="col-lg-6 mt-4">
            <div
              class="alert alert-danger fs-8 text-center fw-bolder"
              role="alert"
              v-if="firms"
            >
              <i class="fas fa-info-circle"></i> You only have {{showTrailExpireDays}} more day(s) in
              your trial. Ready to sign-up? Click <a href="">here</a> to get
              started
            </div>
          </div>
          <div class="col-lg-2">
            <button type="button" class="btn btn-primary fs-7">
              Create New
            </button>
          </div>
          <div class="col-lg-2 p-0">
            <button class="btn"><i class="fas fa-bell fs-3"></i></button>
            <span class="me-3">Hi Zoe</span>
            <img src="@/assets/User.png" alt="User Photo" />
            <button class="btn" @click="logout">
              <i class="fas fs-3 fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </nav>

      <div class="bg-light">
        <p class="fw-bolder m-0 p-4 pb-0 fs-5 text-dark fw-bold">Dashboard</p>
        <ol class="breadcrumb ps-4 pb-4">
          <li class="breadcrumb-item">
            <a href="#" class="text-muted">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#" class="text-dark fw-bold">Dashboard</a>
          </li>
        </ol>
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
  public showFirms: boolean = false;

  public firms = new Array<firmsResponseModel>();
  public lastOnboardingStep: number | any = 0;
  public showTrailExpireDays:number = 0;

  mounted() {
    this.getFirms();
  }

  private getFirms() {
    this.service.getFirms().then((response) => {
      this.firms = response;
      this.trailExpireDays();
      this.store.dispatch("loadEntitlements", response);
      if (
        this.firms.length == 1 &&
        this.firms[0].trialOnboardingStatus != "COMPLETED"
      ) {
        this.showOnBoard = true;
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
    this.showFirms = false;
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
    ), endDate = new Date(
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