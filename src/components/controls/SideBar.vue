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
        class="d-flex align-items-center nav-item"
        active-class="nav-item__active"
        exact
        title="Dashboard"
      >
        <img
          src="@/assets/sidebar-icon/dashboard.svg"
          alt="Dashboard"
          width="25"
          class="m-4"
        />
        <span class="nav-item__name fs-7 fw-bold">Dashboard</span>
        <span class="custom-tooltip">Dashboard</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__name">
        CLIENT INFO
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__icon">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
      </p>
    </div>

    <ul class="nav flex-column mt-2">
      <router-link
        to="/clients"
        tag="li"
        class="d-flex align-items-center nav-item"
        active-class="nav-item__active"
      >
        <img
          src="@/assets/sidebar-icon/clients.svg"
          alt="Clients"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/fee-schedules.svg"
          alt="Fee Schedules"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/products.svg"
          alt="Products"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/subscriptions.svg"
          alt="Subscriptions"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/timesheets.svg"
          alt="Timesheets"
          width="20"
          class="m-4"
        />
        <span class="nav-item__name fs-7 fw-bold">Timesheets</span>
        <span class="custom-tooltip">Timesheets</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__name">
        BILLING & PAYMENTS
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__icon">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
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
        <img
          src="@/assets/sidebar-icon/fees.svg"
          alt="Fees"
          width="12"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/invoices.svg"
          alt="Invoices"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/payments.svg"
          alt="Payments"
          width="20"
          class="m-4"
        />
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
        <img
          src="@/assets/sidebar-icon/reports.svg"
          alt="Reports"
          width="20"
          class="m-4"
        />
        <span class="nav-item__name fs-7">Reports</span>
        <span class="custom-tooltip">Reports</span>
      </router-link>
    </ul>

    <div class="mt-4">
      <p class="mb-0 ps-4 pt-0 pb-0 fw-bold fs-8 nav-header nav-header__name">
        ADMINISTRATION
      </p>
      <p class="mb-0 ps-4 pt-0 pb-0 fs-8 nav-header nav-header__icon">
        <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
      </p>
    </div>

    <ul class="nav flex-column mt-2">
      <div class="dropdown d-flex align-items-center nav-item">
        <img
          src="@/assets/sidebar-icon/settings.svg"
          alt="Settings"
          width="20"
          class="m-4"
        />
        <span class="nav-item__name fs-7">Settings</span>
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
        class="d-flex align-items-center nav-item"
        active-class="nav-item__active"
        title="Help"
      >
        <img
          src="@/assets/sidebar-icon/help.svg"
          alt="Help"
          width="12"
          class="m-4"
        />
        <span class="nav-item__name fs-7">Help</span>
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