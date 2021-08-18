<template>
  <div class="tab-content tab-content-lg__scroll mt-10">
    <div class="d-flex fs-7">
      <div class="fw-bolder">
        How frequently do you bill your {{ billingFee.feeTypeName }}?
      </div>
      <div class="text-muted ms-4 fs-8">Check all that apply</div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <multi-checkBox
        :data="billingFrequency"
        @update="updatebillingFrequency"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        For {{ billingFee.feeTypeName }}, what frequency do you want to default
        for new accounts?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="defaultBillingFrequency"
        :value="request.defaultBillingFrequency"
        @update="updateDefaultBillingFrequency"
      />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        Do you bill your {{ billingFee.feeTypeName }} in advance or in arrears?
      </div>
      <div class="text-muted ms-4 fs-8">Check all that apply</div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>

    <div class="mt-6 ms-6">
      <multi-checkBox :data="billingMethod" @update="updateBillingMethod" />
    </div>

    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        For {{ billingFee.feeTypeName }}, what billing timing do you want to
        default for new accounts?
      </div>
      <div class="ms-5">
        <i class="fa fa-question-circle fs-4 text-dark"></i>
      </div>
    </div>
    <div class="mt-6 ms-6">
      <single-checkBox
        :data="defaultBillingMethod"
        :value="request.defaultBillingMethod"
        @update="updateDefaultBillingMethod"
      />
    </div>

    <template v-if="isQuarterlySelected">
      <div class="d-flex fs-7 mt-10">
        <div class="fw-bolder">
          Do you bill your full-quarter {{ billingFee.feeTypeName }} during
          off-cycle months?
        </div>
        <div class="ms-5">
          <i class="fa fa-question-circle fs-4 text-dark"></i>
        </div>
      </div>
      <div class="mt-6 ms-6">
        <div class="form-check form-check-solid form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="request.offsetCycleFlag"
            @change="
              !request.offsetCycleFlag
                ? (request.defaultOffsetCycle = null)
                : ''
            "
          />
          <label
            class="fs-8 text-muted form-check-label"
            for="flexSwitchCheckChecked"
            >Yes, I bill quarterly on off-cycle months</label
          >
        </div>
      </div>
    </template>

    <template v-if="request.offsetCycleFlag">
      <div class="d-flex fs-7 mt-10">
        <div class="fw-bolder">
          For {{ billingFee.feeTypeName }}, what quarterly cycle do ypu want to
          default for new accounts?
        </div>
        <div class="ms-5">
          <i class="fa fa-question-circle fs-4 text-dark"></i>
        </div>
      </div>
      <div class="mt-6 ms-6">
        <single-checkBox
          :data="defaultOffsetCycle"
          :value="request.defaultOffsetCycle"
          @update="updateDefaultOffsetCycle"
        />
      </div>
    </template>

    <div class="d-flex justify-content-between mt-10">
      <button class="btn btn-secondary" @click="prev">Back</button>
      <button
        class="btn me-10"
        :class="{
          'btn-secondary': !formValidation,
          'btn-primary': formValidation,
        }"
        :disabled="!formValidation"
        @click="saveFrequncyAndTiming"
      >
        Continue
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, Inject, Watch } from "vue-property-decorator";

import { useStore } from "vuex";

import { IFirmService } from "@/service";
import {
  BillingFrequency,
  defaultBillingFrequency,
  billingMethod,
  defaultBillingMethod,
  defaultOffsetCycle,
  aumFeeTypes,
  aumDetails,
  ListItem,
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SingleCheckBox from "@/components/controls/SingleCheckBox.vue";

@Options({
  components: {
    MultiCheckBox,
    SingleCheckBox,
  },
})
export default class AdvisoryAndSubscription extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() billingFee: aumFeeTypes;
  @Prop() aumDetails: aumDetails;

  public store = useStore();
  public request: aumDetails = new aumDetails();

  public billingFrequency: Array<ListItem> = [];
  public defaultBillingFrequency: Array<ListItem> = [];
  public billingMethod: Array<ListItem> = [];
  public defaultBillingMethod: Array<ListItem> = [];
  public defaultOffsetCycle: Array<ListItem> = [];

  created() {
    this.billingFrequency = Object.entries(BillingFrequency).map(
      ([key]) =>
        new ListItem(
          key,
          BillingFrequency[key as keyof typeof BillingFrequency]
        )
    );
    this.defaultBillingFrequency = Object.entries(defaultBillingFrequency).map(
      ([key]) =>
        new ListItem(
          key,
          defaultBillingFrequency[key as keyof typeof defaultBillingFrequency]
        )
    );
    this.billingMethod = Object.entries(billingMethod).map(
      ([key]) =>
        new ListItem(key, billingMethod[key as keyof typeof billingMethod])
    );
    this.defaultBillingMethod = Object.entries(defaultBillingMethod).map(
      ([key]) =>
        new ListItem(
          key,
          defaultBillingMethod[key as keyof typeof defaultBillingMethod]
        )
    );
    this.defaultOffsetCycle = Object.entries(defaultOffsetCycle).map(
      ([key]) =>
        new ListItem(
          key,
          defaultOffsetCycle[key as keyof typeof defaultOffsetCycle]
        )
    );
  }

  mounted() {
    this.getFrequncyAndTiming();
  }

  @Watch("aumDetails")
  private getFrequncyAndTiming() {
    this.request = this.aumDetails;
    this.bindValues(this.aumDetails);
  }

  public saveFrequncyAndTiming() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.feeTypeName = this.billingFee.feeTypeName;
    this.request.onboardingFeeTypeId = this.billingFee.id;
    this.request.aumFeeTypeFlag = this.billingFee.aumFlag;

    this.service
      ?.saveFrequncyAndTiming(this.request)
      .then((response) => {
        if (response.status == "SUCCESS") this.$emit("next");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updatebillingFrequency(billingFrequency: any[]) {
    this.request.billingFrequency = [];
    this.defaultBillingFrequency = [];

    for (var i in billingFrequency) {
      if (billingFrequency[i].selected) {
        this.request.billingFrequency.push(billingFrequency[i].value);
        const item = new ListItem(
          billingFrequency[i].text,
          billingFrequency[i].value
        );
        if (this.request.defaultBillingFrequency == billingFrequency[i].value)
          item.selected = true;
        this.defaultBillingFrequency.push(item);
      }
    }

    if (!this.isQuarterlySelected) {
      this.request.offsetCycleFlag = false;
      this.request.defaultOffsetCycle = null;
    }

    if (this.request.billingFrequency.length == 0)
      this.defaultBillingFrequency = Object.entries(
        defaultBillingFrequency
      ).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingFrequency[key as keyof typeof defaultBillingFrequency]
          )
      );

    if (
      !this.defaultBillingFrequency.some((item) => {
        return item.text == "Don't Default";
      })
    )
      this.defaultBillingFrequency.push(
        new ListItem("Don't Default", "DONT_DEFAULT")
      );
  }

  updateDefaultBillingFrequency(defaultBillingFrequency: string) {
    this.request.defaultBillingFrequency = defaultBillingFrequency;
  }

  updateBillingMethod(billingMethod: any[]) {
    this.request.billingMethod = [];
    this.defaultBillingMethod = [];

    for (var i in billingMethod) {
      if (billingMethod[i].selected) {
        this.request.billingMethod.push(billingMethod[i].value);
        const item = new ListItem(
          billingMethod[i].text,
          billingMethod[i].value
        );
        if (this.request.defaultBillingMethod == billingMethod[i].value)
          item.selected = true;
        this.defaultBillingMethod.push(item);
      }
    }

    if (
      !this.defaultBillingMethod.some((item) => {
        return item.text == "Don't Default";
      })
    )
      this.defaultBillingMethod.push(
        new ListItem("Don't Default", "DONT_DEFAULT")
      );

    if (this.request.billingMethod.length == 0)
      this.defaultBillingMethod = Object.entries(defaultBillingMethod).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingMethod[key as keyof typeof defaultBillingMethod]
          )
      );
  }

  updateDefaultBillingMethod(defaultBillingMethod: string) {
    this.request.defaultBillingMethod = defaultBillingMethod;
  }

  updateDefaultOffsetCycle(defaultOffsetCycle: string) {
    this.request.defaultOffsetCycle = defaultOffsetCycle;
  }

  private bindValues(response: aumDetails) {
    this.defaultBillingFrequency = [];

    this.billingFrequency.forEach((item) => {
      if (response.billingFrequency.includes(item.value)) {
        item.selected = true;
        this.defaultBillingFrequency.push(new ListItem(item.text, item.value));
      } else item.selected = false;
    });

    if (this.defaultBillingFrequency.length == 0)
      this.defaultBillingFrequency = Object.entries(
        defaultBillingFrequency
      ).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingFrequency[key as keyof typeof defaultBillingFrequency]
          )
      );
    else
      this.defaultBillingFrequency.push(
        new ListItem("Don't Default", "DONT_DEFAULT")
      );

    this.defaultBillingFrequency.forEach((item) => {
      if (response.defaultBillingFrequency == item.value) item.selected = true;
    });

    this.defaultBillingMethod = [];

    this.billingMethod.forEach((item) => {
      if (response.billingMethod.includes(item.value)) {
        item.selected = true;
        this.defaultBillingMethod.push(new ListItem(item.text, item.value));
      } else item.selected = false;
    });

    if (this.defaultBillingMethod.length == 0)
      this.defaultBillingMethod = Object.entries(defaultBillingMethod).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingMethod[key as keyof typeof defaultBillingMethod]
          )
      );
    else
      this.defaultBillingMethod.push(
        new ListItem("Don't Default", "DONT_DEFAULT")
      );

    this.defaultBillingMethod.forEach((item) => {
      if (response.defaultBillingMethod == item.value) item.selected = true;
    });

    if (!this.isQuarterlySelected) {
      this.request.offsetCycleFlag = false;
      this.request.defaultOffsetCycle = null;
    } else {
      this.request.offsetCycleFlag = response.offsetCycleFlag;
      this.defaultOffsetCycle.forEach((item) => {
        if (
          response.defaultOffsetCycle &&
          response.defaultOffsetCycle.includes(item.value)
        )
          item.selected = true;
      });
    }
  }

  public prev() {
    this.$emit("prev");
  }

  public nullCheck(value: any) {
    return value ? value : "";
  }

  get isQuarterlySelected() {
    return this.request.billingFrequency.includes("QUARTERLY");
  }

  get formValidation() {
    let valid = false;

    if (
      this.request.billingFrequency.length > 0 &&
      this.request.billingMethod.length > 0 &&
      this.request.defaultBillingFrequency &&
      this.request.defaultBillingMethod
    ) {
      valid = true;
      if (this.request.offsetCycleFlag)
        if (this.request.defaultOffsetCycle) valid = true;
        else valid = false;
    }

    return valid;
  }
}
</script>