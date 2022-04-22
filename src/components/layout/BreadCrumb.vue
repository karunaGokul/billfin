<template>
  <div>
    <p class="fw-bolder m-0 p-4 pb-0 fs-5 text-dark fw-bold" v-if="page == 'Transaction Codes'">
      {{ additionalName }} - {{ page }} 
    </p>
    <p class="fw-bolder m-0 p-4 pb-0 fs-5 text-dark fw-bold" v-else>
      {{ page }} {{ additionalName }}
    </p>
    <div class="d-flex align-items-center ps-4 pt-2 pb-4">
      <ol class="breadcrumb">
        <router-link
          to="/dashboard"
          tag="li"
          class="breadcrumb-item text-muted"
        >
          Home
        </router-link>
      </ol>
      <ol class="breadcrumb" v-html="displayName"></ol>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class BreadCrumb extends Vue {
  @Prop() additionalName?: string;
  @Prop() subName: string;

  get page() {
    return this.$route.name.toString();
  }

  get displayName() {
    let value: string = "";
    if (
      this.page == "Manage Subscription" ||
      this.page == "Sign Up" ||
      this.page == "Setup" ||
      this.page == "Bills & Payments" ||
      this.page == "Advisors" ||
      this.page == "Rep Codes" ||
      this.page == "Branches" ||
      this.page == "Custodians" ||
      this.page == "Security Attributes"
    ) {
      value = `<li class="breadcrumb-item text-muted"></li> <li class="breadcrumb-item text-muted">Settings</li> <li class="breadcrumb-item">${
        this.page == "Manage Subscription" ? "My Subscription" : this.page
      }</li>`;
    } else if (
      this.page == "Fees" ||
      this.page == "Invoices" ||
      this.page == "Payments" ||
      this.page == "Reports"
    ) {
      value = `<li class="breadcrumb-item text-muted"></li> <li class="breadcrumb-item text-muted">Bills & Payments</li> <li class="breadcrumb-item">${this.page}</li>`;
    } else if (this.page == "User List") {
      value = `<li class="breadcrumb-item text-muted"></li><li class="breadcrumb-item">${this.page} ${this.additionalName}</li>`;
    } else if (
      this.page == "Sign Up For Add-Ons" ||
      this.page == "Add Users" ||
      this.page == "Add Connectors" ||
      this.page == "Change Plan" ||
      this.page == "Add Payment Method"
    ) {
      value = `<li class="breadcrumb-item text-muted"></li> <li class="breadcrumb-item text-muted">Settings</li> <li class="breadcrumb-item text-muted">My Subscription</li> <li class="breadcrumb-item">${this.page}</li>`;
    } else if (this.page == "Transaction Codes") {
      value = `<li class="breadcrumb-item text-muted"></li> <li class="breadcrumb-item text-muted">Settings</li> <li class="breadcrumb-item text-muted">Custodians</li> <li class="breadcrumb-item">${this.subName} - ${this.page}</li>`;
    } else {
      value = `<li class="breadcrumb-item text-muted"></li><li class="breadcrumb-item">${this.page}</li>`;
    }

    return value;
  }
}
</script>