<template>
  <div class="home-page d-flex">
    <side-bar :sideBar="sideBar" v-if="!trailExpired" />
    <div
      class="wrapper"
      :class="{
        'ps-0 pe-0': trailExpired,
        'wrapper-default': !sideBar,
        'wrapper-minimize': sideBar,
      }"
    >
      <nav class="navbar bg-white">
        <div class="row w-100 align-items-center">
          <div class="col-lg-1 pe-0">
            <div class="p-4" v-if="trailExpired">
              <img src="@/assets/billfin.svg" alt="Logo" width="40" />
            </div>
            <button class="btn float-start" @click="sideBar = !sideBar" v-else>
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
                    'dropdown-toggle': dataEntitlements.length > 1,
                  }"
                  @click="
                    dataEntitlements.length > 1 ? (toggleFirms = true) : ''
                  "
                >
                  {{ firms.name }}
                </div>
                <ul
                  class="dropdown-menu overflow-auto"
                  :class="{ show: toggleFirms }"
                  style="height: 350px"
                >
                  <li
                    class="mt-2 mb-2"
                    v-for="(item, index) of dataEntitlements"
                    :key="index"
                    @click="updateFirm(item)"
                  >
                    <a class="dropdown-item p-4" href="#">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-5 mt-4 d-flex justify-content-center">
            <div
              class="input-group input-group-solid mb-2 w-50"
              v-if="!trailExpired"
            >
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
            <button
              type="button"
              class="btn btn-primary fs-7"
              v-if="!trailExpired"
            >
              Create New
            </button>
          </div>
          <div
            class="col-lg-2 d-flex align-items-center p-0"
            :class="{ 'justify-content-center': trailExpired }"
          >
            <button class="btn" v-if="!trailExpired">
              <img
                src="@/assets/notification-bell.svg"
                alt="Notification bell icon"
                width="30"
              />
            </button>

            <div
              class="dropdown"
              v-click-outside="clickOutSideUser"
              style="z-index: 99999999999"
            >
              <div class="dropdown-toggle" @click="toggleUser = true">
                <span class="me-3">Hi {{ user.firstName }}</span>
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

      <div
        class="h-100 bg-light p-4"
        :class="{ 'rounded-top-20': !trailExpired }"
      >
        <div
          class="d-flex align-items-center position-relative"
          v-if="!trailExpired"
        >
          <div
            class="
              alert alert-danger
              fs-8
              text-center
              fw-bolder
              text-dark
              border-0
              position-absolute
              top-50
              start-50
              translate-middle
            "
            role="alert"
            v-if="
              dataEntitlements.length == 1 && firms.firmStatus != 'SUBSCRIBED'
            "
          >
            <i class="fas fa-info-circle text-danger"></i> You only have
            {{ trailExpireDays }} more day(s) in your trial. Ready to sign-up?
            Click
            <router-link
              :to="{ name: 'Sign Up', params: { type: 'SignUp' } }"
              tag="a"
              >here
            </router-link>
            to get started
          </div>
        </div>
        <AppAlert />
        <router-view></router-view>
      </div>
    </div>
    <on-boarding-step
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

import moment from "moment";

import SideBar from "@/components/controls/SideBar.vue";
import AppAlert from "@/components/layout/AppAlert.vue";

import OnBoardingStep from "@/components/Models/OnBoardingStep/Index.vue";

import { IFirmService } from "@/service";
import { firmRequestModel, firmsResponseModel } from "@/model";

@Options({
  components: {
    SideBar,
    OnBoardingStep,
    AppAlert,
  },
})
export default class Home extends Vue {
  @Inject("firmService") service: IFirmService;

  public store = useStore();
  public showOnBoard: boolean = false;
  public sideBar: boolean = false;
  public toggleFirms: boolean = false;
  public toggleUser: boolean = false;

  public lastOnboardingStep: number = 1;
  public showTrailExpireDays: number = 0;

  public trailExpired: boolean = false;

  public subscription: any = null;

  public firms: firmsResponseModel = new firmsResponseModel();

  created() {
    this.getFirms();
  }

  mounted() {
    this.subscription = this.store.subscribe((mutations, type) => {
      if (mutations.type == "onFirmSubscribed") this.getFirms();
    });
  }

  unmounted() {
    if (this.subscription) this.subscription();
  }

  private getFirms() {
    this.firms = this.store.getters.firms;

    if (this.dataEntitlements.length == 1) {
      if (this.firms.firmStatus == "IN_TRIAL" && this.trailExpireDays < 0) {
        this.trailExpired = true;
        this.$router.push("./account-expired");
      } else {
        this.trailExpired = false;
        if (this.firms.trialOnboardingStatus != "COMPLETED") {
          this.showOnBoard = true;

          if (this.firms.trialOnboardingStatus == "NOT_STARTED")
            this.lastOnboardingStep = 1;
          else this.lastOnboardingStep = this.firms.lastOnboardingStepCompleted;
        }
      }
    }
  }

  public updateFirm(firm: firmRequestModel) {
    this.$router.push("/dashboard");
    this.toggleFirms = false;
    this.store.dispatch("firmIdChanged", firm.firmId);
    this.store.dispatch("clearSubscription");

    this.firms = this.store.getters.firms;
  }

  public openAvatarUpload() {
    let file: any = this.$refs.avatarUpload;

    file.click();
  }

  public uploadAvatar(event: any) {
    let file: File = event.target.files[0];
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

  get trailExpireDays() {
    if (!this.firms.trialEndsOn) return 0;

    let startDate = new Date(),
      endDate = new Date(
        this.firms.trialEndsOn.split("-")[1] +
          "/" +
          this.firms.trialEndsOn.split("-")[2] +
          "/" +
          this.firms.trialEndsOn.split("-")[0]
      );

    let days = moment(endDate).diff(moment(startDate), "days");

    return days;
  }

  get user() {
    return this.store.getters.userInfo;
  }

  get dataEntitlements() {
    return this.store.getters.dataEntitlements;
  }
}
</script>