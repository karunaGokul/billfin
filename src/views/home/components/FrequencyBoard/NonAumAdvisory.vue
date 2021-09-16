<template>
  <div class="tab-content tab-content-lg__scroll overflow-auto mt-4">
    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        Is your {{ response.feeTypeName }} a re-occuring fee(e.g.,
        subscription)?
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
          v-model="request.recurringFeeFlag"
        />
        <label
          class="fs-7 form-check-label"
          >{{request.recurringFeeFlag ? 'Yes, this non-AUM fee is re-occuring.' : 'No, this non-AUM fee is not re-occuring.'}}</label
        >
      </div>
    </div>
    <div class="d-flex fs-7 mt-10">
      <div class="fw-bolder">
        How frequently do you bill your {{ response.feeTypeName }}?
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
        What frequency do you want to default
        for new {{ response.feeTypeName }} set-ups?
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
        Do you bill your {{ response.feeTypeName }} in advance or in arrears?
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
        What billing timing do you want to default for new {{ response.feeTypeName }} set-ups?
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
          Do you bill your full-quarter {{ response.feeTypeName }} during
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
            @change="updateOffsetCycleFlag"
          />
          <label
            class="form-check-label"
            for="flexSwitchCheckChecked"
            >{{
            request.offsetCycleFlag
              ? "Yes, I bill quarterly on off-cycle months"
              : "No"
          }}</label
          >
        </div>
      </div>
    </template>

    <template v-if="request.offsetCycleFlag">
      <div class="d-flex fs-7 mt-10">
        <div class="fw-bolder">
          What quarterly cycle do you want to default for new {{ response.feeTypeName }} set-ups?
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

    <div class="d-flex justify-content-between mt-10 mb-5">
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
export default class NonAumAdvisory extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;

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

  @Watch("response")
  private getFrequncyAndTiming() {
    if (this.response.aumDetails) {
      this.request = this.response.aumDetails;
      this.bindValues(this.response.aumDetails);
    } else {
      this.request = new aumDetails();
      this.bindValues(this.request);
    }
  }

  public saveFrequncyAndTiming() {
    this.request.firmId = this.store.getters.selectedFirmId;
    this.request.feeTypeName = this.response.feeTypeName;
    this.request.onboardingFeeTypeId = this.response.id;
    this.request.aumFeeTypeFlag = this.response.aumFlag;

    this.service
      ?.saveFrequncyAndTiming(this.request)
      .then((response) => {
        if (response.status == "SUCCESS") this.$emit("next");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public updatebillingFrequency(billingFrequency: Array<ListItem>) {
    this.request.billingFrequency = [];
    this.defaultBillingFrequency = [];
    this.request.defaultBillingFrequency = "";

    billingFrequency.forEach((item) => {
      if (item.selected) {
        this.request.billingFrequency.push(item.value);

        const data = new ListItem(item.text, item.value);
        if (this.request.defaultBillingFrequency == item.value)
          data.selected = true;
        this.defaultBillingFrequency.push(data);
      }
    });

    this.defaultBillingFrequency.push(new ListItem("Don't Default", "NONE"));

    if (this.request.billingFrequency.length == 0) {
      this.defaultBillingFrequency = [];
      this.defaultBillingFrequency = Object.entries(
        defaultBillingFrequency
      ).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingFrequency[key as keyof typeof defaultBillingFrequency]
          )
      );
    }
    if (this.request.billingFrequency.length == 1) {
      this.defaultBillingFrequency.forEach((item) => {
        if (this.request.billingFrequency.includes(item.value)) {
          item.selected = true;
          this.request.defaultBillingFrequency = item.value;
        }
      });
    }

    if (!this.isQuarterlySelected) {
      this.request.offsetCycleFlag = false;
      this.request.defaultOffsetCycle = null;
    }
  }

  public updateDefaultBillingFrequency(defaultBillingFrequency: string) {
    this.request.defaultBillingFrequency = defaultBillingFrequency;
  }

  public updateBillingMethod(billingMethod: Array<ListItem>) {
    this.request.billingMethod = [];
    this.defaultBillingMethod = [];
    this.request.defaultBillingMethod = "";

    billingMethod.forEach((item) => {
      if (item.selected) {
        this.request.billingMethod.push(item.value);

        const data = new ListItem(item.text, item.value);
        if (this.request.defaultBillingMethod == item.value)
          data.selected = true;

        this.defaultBillingMethod.push(data);
      }
    });

    if (
      !this.defaultBillingMethod.some((item) => {
        return item.text == "Don't Default";
      })
    )
      this.defaultBillingMethod.push(new ListItem("Don't Default", "NONE"));

    if (this.request.billingMethod.length == 0)
      this.defaultBillingMethod = Object.entries(defaultBillingMethod).map(
        ([key]) =>
          new ListItem(
            key,
            defaultBillingMethod[key as keyof typeof defaultBillingMethod]
          )
      );

    if (this.request.billingMethod.length == 1) {
      this.defaultBillingMethod.forEach((item) => {
        if (this.request.billingMethod.includes(item.value)) {
          item.selected = true;
          this.request.defaultBillingMethod = item.value;
        }
      });
    }
  }

  public updateDefaultBillingMethod(defaultBillingMethod: string) {
    this.request.defaultBillingMethod = defaultBillingMethod;
  }

  public updateOffsetCycleFlag() {
    this.request.defaultOffsetCycle = null;
    this.defaultOffsetCycle.forEach((item: ListItem) => {
      item.selected = false;
    });
  }

  public updateDefaultOffsetCycle(defaultOffsetCycle: string) {
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
      this.defaultBillingFrequency.push(new ListItem("Don't Default", "NONE"));

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
    else this.defaultBillingMethod.push(new ListItem("Don't Default", "NONE"));

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
        else item.selected = false;
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