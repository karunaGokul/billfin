<template>
  <div class="home-page d-flex">
    <div
      class="sidebar"
      :class="{
        show: !sideBar,
        hide: sideBar,
      }"
    >
      <div class="pt-4 ps-1">
        <img src="@/assets/billfin.svg" alt="Logo" width="40" />
      </div>

      <ul class="nav flex-column mt-10 mb-10">
        <router-link
          to="/dashboard"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          exact
          title="Dashboard"
        >
          <i class="fas fa-box fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Dashboard</span>
          <span class="custom-tooltip">Dashboard</span>
        </router-link>
      </ul>

      <div class="mt-4">
        <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__name">
          CLIENT INFO
        </p>
        <p class="mb-0 ps-5 pt-0 pb-0 fs-8 nav-header nav-header__icon">
          <i class="fas fa-ellipsis-h"></i>
        </p>
      </div>

      <ul class="nav flex-column mt-2">
        <router-link
          to="/clients"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
        >
          <i class="fas fa-user-friends fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Clients</span>
          <span class="custom-tooltip">Clients</span>
        </router-link>
        <router-link
          to="/fee-schedules"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Fee Schedules"
        >
          <i class="fas fa-grip-lines fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Fee Schedules</span>
          <span class="custom-tooltip">Fee Schedules</span>
        </router-link>
        <router-link
          to="/products"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Products"
        >
          <i class="fas fa-tags fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Products</span>
          <span class="custom-tooltip">Products</span>
        </router-link>
        <router-link
          to="/subscriptions"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Subscriptions"
        >
          <i class="fas fa-grip-lines-vertical fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Subscriptions</span>
          <span class="custom-tooltip">Subscriptions</span>
        </router-link>
        <router-link
          to="/timesheets"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Timesheets"
        >
          <i class="fas fa-clock fs-7"></i>
          <span class="nav-item__name fs-7 fw-bold">Timesheets</span>
          <span class="custom-tooltip">Timesheets</span>
        </router-link>
      </ul>

      <div class="mt-4">
        <p class="mb-0 ps-5 pt-0 pb-0 fs-8 nav-header nav-header__name">
          BILLING & PAYMENTS
        </p>
        <p class="mb-0 ps-6 pt-0 pb-0 fs-8 nav-header nav-header__icon">
          <i class="fas fa-ellipsis-h"></i>
        </p>
      </div>

      <ul class="nav flex-column mt-2">
        <router-link
          to="/fees"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Fees"
        >
          <i class="fas fa-dollar-sign fs-7"></i>
          <span class="nav-item__name fs-7">Fees</span>
          <span class="custom-tooltip">Fees</span>
        </router-link>
        <router-link
          to="/invoices"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Invoices"
        >
          <i class="fas fa-money-check-alt fs-7"></i>
          <span class="nav-item__name fs-7">Invoices</span>
          <span class="custom-tooltip">Invoices</span>
        </router-link>
        <router-link
          to="/Payments"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Payments"
        >
          <i class="fas fa-tags fs-7"></i>
          <span class="nav-item__name fs-7">Payments</span>
          <span class="custom-tooltip">Payments</span>
        </router-link>
        <router-link
          to="/Reports"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Reports"
        >
          <i class="fas fa-chart-line fs-7"></i>
          <span class="nav-item__name fs-7">Reports</span>
          <span class="custom-tooltip">Reports</span>
        </router-link>
      </ul>

      <div class="mt-4">
        <p class="mb-0 ps-5 pt-0 pb-0 fw-bold fs-8 nav-header nav-header__name">
          ADMINSTRATION
        </p>
        <p class="mb-0 ps-6 pt-0 pb-0 fw-bold fs-8 nav-header nav-header__icon">
          <i class="fas fa-ellipsis-h"></i>
        </p>
      </div>

      <ul class="nav flex-column mt-2">
        <div class="dropdown d-flex align-items-center nav-item">
          <i class="fas fa-cog fs-7"></i>
          <span class="nav-item__name fs-7">Settings</span>
          <i
            class="fas fa-angle-down"
            @click="showSettingsDropdown = !showSettingsDropdown"
          ></i>
          <span class="custom-tooltip">Settings</span>
        </div>

        <ul class="nav flex-column mt-2 ms-2" v-if="showSettingsDropdown">
          <router-link
            to="/setup"
            tag="li"
            class="d-flex align-items-center nav-item"
            active-class="nav-item__active"
            title="Setup"
          >
            <i class="fas fa-circle fs-10"></i>
            <span class="nav-item__name fs-7">Setup</span>
            <span class="custom-tooltip">Setup</span>
          </router-link>
          <router-link
            to="/sign-up-plan"
            tag="li"
            class="d-flex align-items-center nav-item"
            active-class="nav-item__active"
            title="Sign Up"
          >
            <i class="fas fa-circle fs-10"></i>
            <span class="nav-item__name fs-7">Sign Up</span>
            <span class="custom-tooltip">Sign Up</span>
          </router-link>
        </ul>

        <router-link
          to="/Help"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Help"
        >
          <i class="fas fa-question fs-7"></i>
          <span class="nav-item__name fs-7">Help</span>
          <span class="custom-tooltip">Help</span>
        </router-link>
      </ul>
    </div>
    <div class="w-100 bg-light overflow-hidden" v-if="firms">
      <nav class="navbar bg-white">
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
                  class="fw-bold"
                  :class="{
                    'dropdown-toggle': firms.length > 1,
                  }"
                  @click="firms.length > 1 ? (toggleFirms = true) : ''"
                >
                  {{ selectedFirm }}
                </div>
                <ul
                  class="dropdown-menu overflow-auto"
                  :class="{ show: toggleFirms }"
                  style="height: 350px"
                >
                  <li
                    class="mt-2 mb-2"
                    v-for="(item, index) of firms"
                    :key="index"
                  >
                    <a class="dropdown-item p-4" href="#">{{ item.name }}</a>
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
                <li class="mt-2 mb-2">
                  <a
                    class="
                      dropdown-item
                      d-flex
                      align-items-md-stretchd-flex align-items-center
                      rounded-1
                      p-4
                    "
                    href="#"
                    @click="openAvatarUpload()"
                  >
                    <i class="fas fs-3 fa-edit me-3"></i>
                    <span>Upload</span></a
                  >
                  <input
                    type="file"
                    ref="avatarUpload"
                    @change="uploadAvatar"
                    class="d-none"
                  />
                </li>
                <li class="mt-2 mb-2">
                  <a
                    class="
                      dropdown-item
                      d-flex
                      align-items-center
                      rounded-1
                      p-4
                    "
                    href="#"
                    @click="logout"
                    ><i class="fas fs-3 fa-sign-out-alt me-3"></i>
                    <span>Sign out</span>
                  </a>
                </li>
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
              class="
                alert alert-danger
                fs-8
                text-center
                fw-bolder
                text-dark
                border-0
              "
              role="alert"
              v-if="firms"
            >
              <i class="fas fa-info-circle text-danger"></i> You only have
              {{ showTrailExpireDays }} more day(s) in your trial. Ready to
              sign-up? Click <a href="">here</a> to get started
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
  public lastOnboardingStep: number | any = 1;
  public showTrailExpireDays: number = 0;

  public showSettingsDropdown: boolean = false;

  mounted() {
    this.getFirms();
  }

  private getFirms() {
    this.service.getFirms().then((response) => {
      this.firms = response;
      if (this.firms[0].trialStartsOn && this.firms[0].trialEndsOn)
        this.trailExpireDays();
      this.store.dispatch("loadEntitlements", response);
      this.selectedFirm = this.store.getters.selectedFirmName;
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

  public openAvatarUpload() {
    const file: any = this.$refs.avatarUpload;

    file.click();
  }

  public uploadAvatar(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    console.log(file);

    //this.$store.dispatch("updateUserAvatar", file);
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