<template>
  <div
    v-if="
      (addOnType == 'AddMoreAddOns' || addOnType == 'ChangePlan') &&
      subscribedAddOns.length > 0
    "
  >
    <div class="accordion accordion-flush mb-10">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button fw-bolder fs-4 text-dark-gray"
            type="button"
            :class="{
              collapsed: !toggleSubscribedAddons,
            }"
            @click="toggleSubscribedAddons = !toggleSubscribedAddons"
          >
            {{
              addOnType == "AddMoreAddOns"
                ? `You are currently subscribed to these add-ons in your ${
                    product == "AUM" ? "AUM Billing" : "Subscription Billing"
                  } product`
                : "Current Subscription"
            }}
          </button>
        </h2>
        <div
          class="accordion-collapse collapse"
          :class="{ show: toggleSubscribedAddons }"
        >
          <div class="card accordion-body">
            <table class="w-100 fs-5">
              <thead>
                <tr>
                  <th
                    class="
                      p-4
                      border-bottom
                      fw-bold
                      text-gray-secondary
                      border-light-gray
                    "
                  >
                    ADD-ONS & DESCRIPTIONS
                  </th>
                  <th
                    class="
                      p-4
                      border-bottom
                      fw-bold
                      text-gray-secondary
                      border-light-gray
                    "
                  >
                    TERM PERIOD
                  </th>
                  <th
                    class="
                      p-4
                      border-bottom
                      fw-bold
                      text-gray-secondary
                      border-light-gray
                    "
                  >
                    SUBSCRIPTION
                  </th>
                  <th
                    class="
                      p-4
                      border-bottom
                      fw-bold
                      text-gray-secondary
                      border-light-gray
                    "
                  >
                    AMOUNT
                  </th>
                  <th
                    class="
                      p-4
                      border-bottom
                      fw-bold
                      text-gray-secondary
                      border-light-gray
                    "
                  >
                    RENEW ON
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of subscribedAddOns" :key="index">
                  <td class="p-4 border-bottom border-dashed">
                    <div class="fw-bolder text-dark-gray">
                      {{ item.addOnName }}
                    </div>
                    <div
                      class="text-gray-secondary mt-2"
                      v-if="
                        item.addOnName != 'Multi-Connector Integrations' &&
                        item.addOnName != 'Admin User License'
                      "
                    >
                      {{ item.description }}
                    </div>
                    <div v-else class="text-gray-secondary mt-2">
                      Number of
                      {{
                        item.addOnName == "Admin User License"
                          ? "users"
                          : "connectors"
                      }}
                      - {{ item.quantity }}
                    </div>
                  </td>
                  <td
                    class="
                      p-4
                      fw-bolder
                      text-dark-gray
                      border-bottom border-dashed
                    "
                  >
                    {{ $datehelper.changeDateFormatWithSlash(item.startDate) }}
                    -
                    {{ $datehelper.changeDateFormatWithSlash(item.renewDate) }}
                  </td>
                  <td
                    class="
                      p-4
                      fw-bolder
                      text-dark-gray
                      border-bottom border-dashed
                    "
                  >
                    {{ item.commitmentTerm == "ANNUAL" ? "Annual" : "Monthly" }}
                    Subscription
                  </td>
                  <td
                    class="
                      p-4
                      fw-bolder
                      text-dark-gray
                      border-bottom border-dashed
                    "
                  >
                    {{ $filters.currencyDisplay(item.paymentAmount) }}
                  </td>
                  <td
                    class="
                      p-4
                      fw-bolder
                      text-dark-gray
                      border-bottom border-dashed
                    "
                  >
                    <span
                      class="text-success ps-6 pe-6 pt-2 pb-2 bg-success-alpha"
                      >{{ item.renewDate }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="accordion accordion-flush mb-10">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button fw-bolder fs-4 text-dark-gray"
          type="button"
          :class="{
            collapsed: !toggleAccordion,
          }"
          @click="toggleAccordion = !toggleAccordion"
        >
          {{ product == "AUM" ? "AUM Billing" : "Subscription Billing" }}
        </button>
      </h2>
      <div
        class="accordion-collapse collapse"
        :class="{ show: toggleAccordion }"
      >
        <div class="card accordion-body">
          <div class="text-center fs-4 fw-bolder mt-2">Choose your Add-ons</div>

          <template
            v-if="addOnType == 'AddMoreAddOns' || addOnType == 'ChangePlan'"
          >
            <div class="row">
              <div class="col-6 mt-4">
                <div class="fw-bolder me-4 text-end fs-5">Commitment term</div>
              </div>
              <div class="col-6">
                <div class="btn-group border rounded p-1">
                  <button
                    type="button"
                    class="btn rounded"
                    :class="{
                      'btn-success': commitmentTerm == 'Annual',
                      'text-gray': commitmentTerm != 'Annual',
                    }"
                    :disabled="termPlanType == 'Monthly'"
                    @click="updateCommitmentTerm('Annual')"
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    class="btn rounded"
                    :class="{
                      'btn-success': commitmentTerm == 'Monthly',
                      'text-gray': commitmentTerm != 'Monthly',
                    }"
                    @click="updateCommitmentTerm('Monthly')"
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
            <div class="text-center text-success p-2 fw-bold">
              {{
                commitmentTerm == "Annual"
                  ? "Hooray, you are saving 20% with a 1 year commitment!"
                  : "Commit for a year and save up to 20%"
              }}
            </div>
          </template>

          <div class="row mt-2" v-if="addons.length > 0">
            <div
              v-for="(plan, i) in planRow"
              :key="i"
              class="col-xl-6 col-lg-12"
            >
              <div
                v-for="(item, index) in addons.slice(
                  i * itemsPerRow,
                  (i + 1) * itemsPerRow
                )"
                :key="index"
                class="
                  tab-plan
                  position-relative
                  mx-auto
                  mb-4
                  mt-4
                  ps-2
                  pe-2
                  pt-6
                  pb-6
                  border
                  rounded
                "
                :class="{
                  'bg-primary text-white':
                    item.selected && !item.isPreInclueded,
                  'bg-gray-secondary border-gray-secondary':
                    item.isPreInclueded,
                  'border-dashed': !item.selected,
                }"
              >
                <div class="row g-0">
                  <div
                    class="
                      col-1
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                  >
                    <div
                      class="form-check"
                      :class="{
                        'form-check-success':
                          item.selected && !item.isPreInclueded,
                        'form-check-gray': item.isPreInclueded,
                      }"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :checked="item.selected"
                        :disabled="item.isPreInclueded"
                        @change="updateAddons(item)"
                      />
                    </div>
                  </div>
                  <div class="col-7 d-flex justify-content-center flex-column">
                    <div class="fs-3 fw-bolder">
                      {{ item.addOnName }}
                      <span
                        class="badge text-success fs-8 bg-success-alpha"
                        v-if="item.isPreInclueded"
                        >Included</span
                      >
                    </div>
                    <div
                      :class="{
                        'text-white': item.selected && !item.isPreInclueded,
                        'text-gray': !item.selected,
                        'text-gray-secondary': item.isPreInclueded,
                      }"
                      v-if="item.addOnName != 'Admin User License'"
                    >
                      {{ item.description }}
                    </div>
                    <div
                      v-if="
                        item.addOnName == 'Admin User License' ||
                        item.addOnName == 'Multi-Connector Integrations'
                      "
                    >
                      <div class="row g-0">
                        <div class="fw-bolder col-7" style="line-height: 3">
                          Add more
                          {{
                            item.addOnName == "Admin User License"
                              ? "users"
                              : "connectors"
                          }}?
                        </div>
                        <div class="col-3">
                          <select
                            class="form-select form-select-solid"
                            style="width: 100px"
                            @change="updateAddons"
                            v-model="item.quantity"
                          >
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="text-center">
                      <span class="fs-7">$</span>
                      <span class="fa-3x fw-bolder">
                        {{
                          $filters.currencyDisplayWithoutSymbol(
                            item.planAddOnAmount
                          )
                        }}</span
                      >
                      <span
                        class="fs-8 fw-light"
                        :class="{
                          'text-white': item.selected && !item.isPreInclueded,
                          'text-gray': !item.selected,
                          'text-gray-secondary': item.isPreInclueded,
                        }"
                        >/ {{ item.planType }}</span
                      >
                    </div>
                    <div
                      class="fs-7 text-center ms-5 fw-light"
                      :class="{
                        'text-white': item.selected && !item.isPreInclueded,
                        'text-gray': !item.selected,
                        'text-gray-secondary': item.isPreInclueded,
                      }"
                      v-if="
                        item.planType == 'Yr' &&
                        item.addOnName != 'Multi-Connector Integrations' &&
                        item.addOnName != 'Admin User License'
                      "
                    >
                      ({{
                        $filters.currencyDisplay(item.extraInfo, 2, 0)
                      }}/month)
                    </div>
                    <div
                      class="fs-7 text-center ms-5 fw-light"
                      :class="{
                        'text-white': item.selected && !item.isPreInclueded,
                        'text-gray': !item.selected,
                        'text-gray-secondary': item.isPreInclueded,
                      }"
                      v-if="
                        item.planType == 'Yr' &&
                        item.addOnName == 'Admin User License'
                      "
                    >
                      (Per User)
                    </div>
                    <div
                      class="fs-7 text-center ms-5 fw-light"
                      :class="{
                        'text-white': item.selected && !item.isPreInclueded,
                        'text-gray': !item.selected,
                        'text-gray-secondary': item.isPreInclueded,
                      }"
                      v-if="
                        item.planType == 'Yr' &&
                        item.addOnName == 'Multi-Connector Integrations'
                      "
                    >
                      (Per Connector)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop, Inject } from "vue-property-decorator";

import { useStore } from "vuex";

import { ISubscripeService } from "@/service";
import {
  addOnsListResponseModel,
  subscribeAddonsRequestModel,
  subscribeAddonsResponseModel,
  subscribedAddonsReqeustModel,
  CommitmentTerm,
} from "@/model";
export default class PickAddons extends Vue {
  @Prop() addOnType: string;
  @Prop() product: string;
  @Prop() termPlanType: string;
  @Prop() planId: number;
  @Prop() preAddons: Array<subscribeAddonsResponseModel>;
  @Prop() planSubscriptionId: number;

  @Inject("subscripeService") service: ISubscripeService;

  public store = useStore();

  public commitmentTerm: string = "Annual";

  public itemsPerRow: number = 0;
  public planRow: any = [];

  public addonsList: Array<addOnsListResponseModel> = [];
  public addons: Array<subscribeAddonsResponseModel> = [];
  public subscribedAddOns: Array<subscribeAddonsResponseModel> = [];

  public toggleAccordion: boolean = true;
  public toggleSubscribedAddons: boolean = true;

  created() {
    this.addonsList = this.$vuehelper.clone(this.store.getters.addOnsList);
    this.commitmentTerm = this.termPlanType;

    if (this.addOnType == "AddMoreAddOns" || this.addOnType == "ChangePlan")
      this.getSubscribedAddons();
    else this.filterAddons();
  }

  public updateCommitmentTerm(commitmentTerm: string) {
    this.commitmentTerm = commitmentTerm;

    if (this.addOnType == "AddMoreAddOns" || this.addOnType == "ChangePlan")
      this.getSubscribedAddons();
    else this.getAddons();
  }

  private getSubscribedAddons() {
    let request = new subscribedAddonsReqeustModel();
    request.planSubscriptionId = this.planSubscriptionId;
    this.service
      .getSubscriptedAddons(request)
      .then((response) => {
        this.subscribedAddOns = response;
        this.removeAddons();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private removeAddons() {
    this.subscribedAddOns.forEach((item) => {
      this.addonsList.forEach(
        (data: { addOnName: string; description: string }) => {
          if (item.addOnName == data.addOnName)
            item.description = data.description;
        }
      );
    });

    if (this.addOnType == "AddMoreAddOns") {
      let itemsToRemove = this.subscribedAddOns.map((item) => item.addOnName);
      this.addonsList = this.addonsList.filter(
        (item) => !itemsToRemove.includes(item.addOnName)
      );
    }
    this.filterAddons();
  }

  private filterAddons() {
    this.addonsList.forEach(
      (item: {
        addOnName: string;
        selected: boolean;
        quantity: number;
        isPreInclueded: boolean;
      }) => {
        this.preAddons.forEach((addons: subscribeAddonsResponseModel) => {
          if (item.addOnName == addons.addOnName) {
            item.selected = true;
            if (addons.quantity) item.quantity = addons.quantity;
            if (addons.isPreInclueded) item.isPreInclueded = true;
          }
        });
      }
    );

    this.getAddons();
  }

  private getAddons() {
    let request = new subscribeAddonsRequestModel();
    request.planId = this.planId;
    request.termPlanType =
      CommitmentTerm[this.commitmentTerm as keyof typeof CommitmentTerm];
    this.service
      .getAddons(request)
      .then((response) => {
        this.bindAddons(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private bindAddons(response: Array<subscribeAddonsResponseModel>) {
    this.addons = [];
    response.forEach((item) => {
      this.addonsList.forEach(
        (addons: {
          addOnName: string;
          description: string;
          extraInfo: string;
          selected: boolean;
          quantity: number;
          isPreInclueded: boolean;
        }) => {
          if (item.addOnName == addons.addOnName) {
            const addOns = {
              termPlanAddOnId: item.termPlanAddOnId,
              addOnName: item.addOnName,
              planAddOnAmount: item.planAddOnAmount,
              description: addons.description,
              planType: this.commitmentTerm == "Annual" ? "Yr" : "Mon",
              selected: addons.selected,
              quantity: addons.quantity,
              extraInfo:
                this.commitmentTerm == "Annual"
                  ? item.planAddOnAmount / 12
                  : "",
              isPreInclueded: addons.isPreInclueded,
            };
            this.addons.push(this.$vuehelper.clone(addOns));
          }
        }
      );
    });
    if (this.addonsList.length > 0) {
      this.updateAddons();
      this.itemsPerRow = Math.round(this.addons.length / 2);
      this.planRow = Array.from(
        Array(Math.ceil(this.addons.length / this.itemsPerRow)).keys()
      );
    }
  }

  public updateAddons(response?: subscribeAddonsResponseModel) {
    if (response && !response.isPreInclueded)
      response.selected = !response.selected;

    if (this.addOnType == "AddMoreAddOns" || this.addOnType == "ChangePlan")
      this.store.dispatch("updateTerm", {
        product: this.product,
        commitmentTerm: this.commitmentTerm,
      });

    if (this.addOnType == "ChangePlan" || this.addOnType == "createAddon") {
      let data: Array<subscribeAddonsResponseModel> = [];

      this.addons.forEach((item) => {
        if (item.selected) {
          if (!item.isPreInclueded) {
            data.push(item);
          } else if (
            item.addOnName == "Admin User License" ||
            item.addOnName == "Multi-Connector Integrations"
          ) {
            let addOns: addOnsListResponseModel = this.addonsList.find(
              (addons) => addons.addOnName == item.addOnName
            );
            if (item.quantity != addOns.quantity) {
              if (item.quantity > addOns.quantity)
                item.quantity = item.quantity - addOns.quantity;
              else item.quantity = addOns.quantity - item.quantity;

              data.push(item);
            }
          }
        }
      });

      this.store.dispatch("updateAddons", {
        product: this.product,
        addons: data,
      });
    } else {
      this.store.dispatch("updateAddons", {
        product: this.product,
        addons: this.addons.filter((item) => item.selected),
      });
    }
  }

  get aumBilling() {
    return this.store.getters.aumBilling;
  }

  get subscriptionBilling() {
    return this.store.getters.subscriptionBilling;
  }
}
</script>