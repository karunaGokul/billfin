<template>
  <div
    class="sidebar ps-10 pe-10"
    :class="{
      'sidebar-default': !sideBar,
      'sidebar-minimize': sideBar,
    }"
  >
    <div class="p-4 ps-0">
      <img src="@/assets/billfin.svg" alt="Logo" width="40" />
    </div>

    <div class="menu-container">
      <ul class="menu flex-column mt-10 mb-10">
        <router-link
          to="/dashboard"
          tag="li"
          class="d-flex align-items-center menu-link p-4"
          active-class="menu-link-active"
          exact
        >
          <span class="menu-link-icon icon-dashboard"
            ><span class="path1"></span><span class="path2"></span
          ></span>
          <span class="menu-link-title fs-6 fw-bold ms-2">Dashboard</span>
        </router-link>
      </ul>

      <div class="mt-4 ps-4">
        <p class="mb-0 pt-0 pb-0 fs-8 menu-name">CLIENT INFO</p>
        <p class="mb-0 pt-0 pb-0 fs-8 menu-label">
          <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
        </p>
      </div>

      <ul class="menu flex-column mt-5 mb-10">
        <router-link
          to="/clients"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="icon-clients menu-link-icon"
            ><span class="path1"></span><span class="path2"></span
          ></span>
          <span class="menu-link-title fs-6 fw-bold ms-2">Clients</span>
        </router-link>
        <router-link
          to="/fee-schedules"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-fee-schedules"
            ><span class="path1"></span><span class="path2"></span
            ><span class="path3"></span><span class="path4"></span
          ></span>
          <span class="menu-link-title fs-7 fw-bold ms-2">Fee Schedules</span>
        </router-link>
        <router-link
          to="/products"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-products"></span>
          <span class="menu-link-title fs-7 fw-bold ms-2">Products</span>
        </router-link>
        <router-link
          to="/subscriptions"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-subscriptions"
            ><span class="path1"></span><span class="path2"></span
          ></span>
          <span class="menu-link-title fs-7 fw-bold ms-2">Subscriptions</span>
        </router-link>
        <router-link
          to="/timesheets"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-timesheets"></span>
          <span class="menu-link-title fs-7 fw-bold ms-2">Timesheets</span>
        </router-link>
      </ul>

      <div class="mt-4">
        <p class="mb-0 ps-4 pt-0 pb-0 fs-8 menu-name">BILLING & PAYMENTS</p>
        <p class="mb-0 ps-4 pt-0 pb-0 fs-8 menu-label">
          <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
        </p>
      </div>

      <ul class="menu flex-column mt-5 mb-10">
        <router-link
          to="/fees"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-fees"></span>
          <span class="menu-link-title fs-6 ms-2">Fees</span>
        </router-link>
        <router-link
          to="/invoices"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-invoices"
            ><span class="path1"></span><span class="path2"></span
          ></span>
          <span class="menu-link-title fs-7 ms-2">Invoices</span>
        </router-link>
        <router-link
          to="/Payments"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-payments"></span>
          <span class="menu-link-title fs-7 ms-2">Payments</span>
        </router-link>
        <router-link
          to="/Reports"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-reports"></span>
          <span class="menu-link-title fs-7 ms-2">Reports</span>
        </router-link>
      </ul>

      <div class="mt-4">
        <p class="mb-0 ps-4 pt-0 pb-0 fw-bold fs-8 menu-name">ADMINISTRATION</p>
        <p class="mb-0 ps-4 pt-0 pb-0 fs-8 menu-label">
          <img src="@/assets/sidebar-icon/ellipsis.png" alt="Dot" width="25" />
        </p>
      </div>

      <div
        class="accordion accordion-flush menu-accordion"
        v-on:mouseleave="clickOutSideAccordion"
      >
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button ps-4 fs-4 border-bottom-0"
              type="button"
              :class="{
                'collapsed text-dark-gray': !toggleSettings,
                'menu-accordion-button':
                  page == 'Manage Subscription' ||
                  page == 'Setup' ||
                  page == 'Sign Up' ||
                  page == 'Bills & Payments',
              }"
              @click="toggleSettings = !toggleSettings"
            >
              <span class="menu-link-icon icon-settings"></span>
              <span class="menu-link-title fs-7 ms-2">Settings</span>
            </button>
          </h2>
          <div
            class="accordion-collapse collapse"
            :class="{ show: toggleSettings }"
          >
            <div class="card accordion-body ps-0 pt-0">
              <ul class="menu flex-column">
                <router-link
                  to="/setup"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Setup</span>
                </router-link>
                <router-link
                  :to="{ name: 'Sign Up', params: { type: 'SignUp', redirectPage: '/dashboard' }}"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus != 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Sign Up</span>
                </router-link>
                <router-link
                  to="/my-subscription"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">My Subscription</span>
                </router-link>
                <router-link
                  to="/bills-payments"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Bills & Payments</span>
                </router-link>
                <router-link
                  to="/advisors"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Advisors</span>
                </router-link>
                <router-link
                  to="/repcodes"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Rep Codes</span>
                </router-link>
                <router-link
                  to="/branches"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Branches</span>
                </router-link>
                <router-link
                  to="/user-list"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Users</span>
                </router-link>
                <router-link
                  to="/custodians"
                  tag="li"
                  class="d-flex align-items-center menu-link"
                  active-class="menu-link-active"
                  v-if="firmStatus == 'SUBSCRIBED'"
                >
                  <i class="fas fa-circle fs-10"></i>
                  <span class="menu-link-title fs-7">Custodians</span>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ul class="menu flex-column mb-5">
        <router-link
          to="/Help"
          tag="li"
          class="d-flex align-items-center menu-item p-4"
          active-class="menu-link-active"
        >
          <span class="menu-link-icon icon-help"></span>
          <span class="menu-link-title fs-7 ms-2">Help</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { useStore } from "vuex";

export default class SideBar extends Vue {
  @Prop() sideBar: boolean;

  public toggleSettings: boolean = false;
  public store = useStore();

  @Watch("sideBar")
  clickOutSideAccordion() {
    if (this.sideBar) this.toggleSettings = false;
  }

  get firmStatus() {
    return this.store.getters.firms.firmStatus;
  }

  get page() {
    return this.$route.name;
  }
}
</script>