<template>
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
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        exact
        title="Dashboard"
      >
        <span class="nav-item__icon icon-dashboard"
          ><span class="path1"></span><span class="path2"></span
        ></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Dashboard</span>
        <span class="custom-tooltip">Dashboard</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__name">
        CLIENT INFO
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__label">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
      </p>
    </div>

    <ul class="nav flex-column mt-2">
      <router-link
        to="/clients"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
      >
        <span class="icon-clients nav-item__icon"
          ><span class="path1"></span><span class="path2"></span
        ></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Clients</span>
        <span class="custom-tooltip">Clients</span>
      </router-link>
      <router-link
        to="/fee-schedules"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Fee Schedules"
      >
        <span class="nav-item__icon icon-fee-schedules"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
        ></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Fee Schedules</span>
        <span class="custom-tooltip">Fee Schedules</span>
      </router-link>
      <router-link
        to="/products"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Products"
      >
        <span class="nav-item__icon icon-products"></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Products</span>
        <span class="custom-tooltip">Products</span>
      </router-link>
      <router-link
        to="/subscriptions"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Subscriptions"
      >
        <span class="nav-item__icon icon-subscriptions"
          ><span class="path1"></span><span class="path2"></span
        ></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Subscriptions</span>
        <span class="custom-tooltip">Subscriptions</span>
      </router-link>
      <router-link
        to="/timesheets"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Timesheets"
      >
        <span class="nav-item__icon icon-timesheets"></span>
        <span class="nav-item__name fs-7 fw-bold ms-2">Timesheets</span>
        <span class="custom-tooltip">Timesheets</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__name">
        BILLING & PAYMENTS
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__label">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
      </p>
    </div>

    <ul class="nav flex-column mt-2">
      <router-link
        to="/fees"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Fees"
      >
        <span class="nav-item__icon icon-fees"></span>
        <span class="nav-item__name fs-7 ms-2">Fees</span>
        <span class="custom-tooltip">Fees</span>
      </router-link>
      <router-link
        to="/invoices"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Invoices"
      >
        <span class="nav-item__icon icon-invoices"><span class="path1"></span><span class="path2"></span></span>
        <span class="nav-item__name fs-7 ms-2">Invoices</span>
        <span class="custom-tooltip">Invoices</span>
      </router-link>
      <router-link
        to="/Payments"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Payments"
      >
        <span class="nav-item__icon icon-payments"></span>
        <span class="nav-item__name fs-7 ms-2">Payments</span>
        <span class="custom-tooltip">Payments</span>
      </router-link>
      <router-link
        to="/Reports"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Reports"
      >
        <span class="nav-item__icon icon-reports"></span>
        <span class="nav-item__name fs-7 ms-2">Reports</span>
        <span class="custom-tooltip">Reports</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fw-bold fs-8 nav-header nav-header__name">
        ADMINISTRATION
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__label">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
      </p>
    </div>

    <ul class="nav flex-column mt-2">
      <div class="dropdown d-flex align-items-center nav-item p-4">
        <span class="nav-item__icon icon-settings"></span>
        <span class="nav-item__name fs-7 ms-2">Settings</span>
        <i
          class="fas fa-angle-down"
          @click="toggleSettings = !toggleSettings"
        ></i>
        <span class="custom-tooltip">Settings</span>
      </div>

      <ul class="nav flex-column mt-2 ms-2" v-if="toggleSettings">
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
        <router-link
          to="/my-subscription"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="My Subscription"
        >
          <i class="fas fa-circle fs-10"></i>
          <span class="nav-item__name fs-7">My Subscription</span>
          <span class="custom-tooltip">My Subscription</span>
        </router-link>
        <router-link
          to="/bills-payments"
          tag="li"
          class="d-flex align-items-center nav-item"
          active-class="nav-item__active"
          title="Bills & Payments"
        >
          <i class="fas fa-circle fs-10"></i>
          <span class="nav-item__name fs-7">Bills & Payments</span>
          <span class="custom-tooltip">Bills & Payments</span>
        </router-link>
      </ul>

      <router-link
        to="/Help"
        tag="li"
        class="d-flex align-items-center nav-item p-4"
        active-class="nav-item__active"
        title="Help"
      >
        <span class="nav-item__icon icon-help"></span>
        <span class="nav-item__name fs-7 ms-2">Help</span>
        <span class="custom-tooltip">Help</span>
      </router-link>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

export default class SideBar extends Vue {
  @Prop() sideBar: boolean;

  public toggleSettings: boolean = false;

  @Watch("sideBar")
  update() {
    if (this.sideBar) this.toggleSettings = false;
  }
}
</script>