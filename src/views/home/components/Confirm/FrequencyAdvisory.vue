<template>
  <div class="tab-content mt-10">
    <div class="row pb-8 g-0">
      <div class="col-lg-7 fw-bolder">
        How frequently do you bill your {{ response.feeTypeName }}?
      </div>
      <div class="col-lg-5 fw-bold" v-if="!showBillingFrequency">
        <span v-for="(data, i) in billingFrequency" :key="i">
          <template v-if="data.selected">
            {{ data.text.concat(", ") }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showBillingFrequency = true"
        ></i>
      </div>
    </div>

    <div class="ms-2 pb-8" v-if="showBillingFrequency">
      <multi-checkBox
        :data="billingFrequency"
        @update="updatebillingFrequency"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showBillingFrequency = false;
          saveFrequncyAndTiming();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-9 fw-bolder">
        For {{ response.feeTypeName }}, what frequency do you want to default
        for new accounts?
      </div>
      <div class="col-lg-3 fw-bold" v-if="!showDefaultFrequency">
        <span v-for="(data, i) in defaultBillingFrequency" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showDefaultFrequency = true"
        ></i>
      </div>
    </div>

    <div class="ms-2 pb-8" v-if="showDefaultFrequency">
      <single-checkBox
        :data="defaultBillingFrequency"
        :value="request.defaultBillingFrequency"
        @update="updateDefaultBillingFrequency"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showDefaultFrequency = false;
          saveFrequncyAndTiming();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-7 fw-bolder">
        Do you bill your {{ response.feeTypeName }} in advance or in arrears?
      </div>
      <div class="col-lg-5 fw-bold" v-if="!showBillingMethod">
        <span v-for="(data, i) in billingMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text.concat(", ") }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showBillingMethod = true"
        ></i>
      </div>
    </div>

    <div class="ms-2 pb-8" v-if="showBillingMethod">
      <multi-checkBox :data="billingMethod" @update="updateBillingMethod" />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showBillingMethod = false;
          saveFrequncyAndTiming();
        "
      ></i>
    </div>

    <div class="row pb-8 g-0">
      <div class="col-lg-10 fw-bolder">
        For {{ response.feeTypeName }}, what billing timing do you want to
        default for new accounts?
      </div>
      <div class="col-lg-2 fw-bold" v-if="!showDefaultBillingMethod">
        <span v-for="(data, i) in defaultBillingMethod" :key="i">
          <template v-if="data.selected">
            {{ data.text }}
          </template>
        </span>
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showDefaultBillingMethod = true"
        ></i>
      </div>
    </div>

    <div class="ms-2 pb-8" v-if="showDefaultBillingMethod">
      <single-checkBox
        :data="defaultBillingMethod"
        :value="request.defaultBillingMethod"
        @update="updateDefaultBillingMethod"
      />
      <i
        class="fa fa-check text-primary ms-4"
        @click="
          showDefaultBillingMethod = false;
          saveFrequncyAndTiming();
        "
      ></i>
    </div>

    <template v-if="isQuarterlySelected">
      <div class="row pb-8 g-0">
        <div class="col-lg-8 fw-bolder">
          Do you bill your full-quarter {{ response.feeTypeName }} during
          off-cycle months?
        </div>
        <div class="col-lg-4 fw-bold" v-if="!showOffsetCycleFlag">
          {{
            request.offsetCycleFlag
              ? "Yes, I bill quarterly on off-cycle months"
              : "No"
          }}
          <i
            class="fa fa-solid fa-pen text-primary ms-4"
            @click="showOffsetCycleFlag = true"
          ></i>
        </div>
      </div>
      <div class="ms-2 pb-8" v-if="showOffsetCycleFlag">
        <div class="form-check form-check-solid form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="request.offsetCycleFlag"
            @change="updateOffsetCycleFlag"
          />
          <label
            class="fs-8 text-muted form-check-label"
            for="flexSwitchCheckChecked"
            >Yes, I bill quarterly on off-cycle months</label
          >
          <i
            class="fa fa-solid fa-pen text-primary ms-4"
            @click="showOffsetCycleFlag = false"
          ></i>
        </div>
      </div>
    </template>

    <template v-if="request.offsetCycleFlag">
      <div class="row pb-8 g-0">
        <div class="col-lg-9 fw-bolder">
          For {{ response.feeTypeName }}, what quarterly cycle do you want to
          default for new accounts?
        </div>
        <div class="col-lg-3 fw-bold" v-if="!showDefaultOffsetCycle">
          <span v-for="(data, i) in defaultOffsetCycle" :key="i">
            <template v-if="data.selected">
              {{ data.text }}
            </template>
          </span>
          <i
            class="fa fa-solid fa-pen text-primary ms-4"
            @click="showDefaultOffsetCycle = true"
          ></i>
        </div>
      </div>
      <div class="ms-2 pb-8" v-if="showDefaultOffsetCycle">
        <single-checkBox
          :data="defaultOffsetCycle"
          :value="request.defaultOffsetCycle"
          @update="updateDefaultOffsetCycle"
        />
        <i
          class="fa fa-solid fa-pen text-primary ms-4"
          @click="showDefaultOffsetCycle = false"
        ></i>
      </div>
    </template>
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
export default class FrequencyAdvisory extends Vue {
  @Inject("firmService") service: IFirmService;
  @Prop() response: aumFeeTypes;

  public store = useStore();
  public request: aumDetails = new aumDetails();

  public billingFrequency: Array<ListItem> = [];
  public defaultBillingFrequency: Array<ListItem> = [];
  public billingMethod: Array<ListItem> = [];
  public defaultBillingMethod: Array<ListItem> = [];
  public defaultOffsetCycle: Array<ListItem> = [];

  public showBillingFrequency: boolean = false;
  public showDefaultFrequency: boolean = false;
  public showBillingMethod: boolean = false;
  public showDefaultBillingMethod: boolean = false;
  public showOffsetCycleFlag: boolean = false;
  public showDefaultOffsetCycle: boolean = false;

  created() {
    console.log(this.response);
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
    console.log(this.request);
    if (this.formValidation) {
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
  }

  public updatebillingFrequency(billingFrequency: Array<ListItem>) {
    this.request.billingFrequency = [];
    this.defaultBillingFrequency = [];

    billingFrequency.forEach((item) => {
      if (item.selected) {
        this.request.billingFrequency.push(item.value);

        const data = new ListItem(item.text, item.value);
        if (this.request.defaultBillingFrequency == item.value)
          data.selected = true;
        this.defaultBillingFrequency.push(data);
      }
    });

    this.defaultBillingFrequency.forEach((item) => {
      if (item.value != this.request.defaultBillingFrequency)
        this.request.defaultBillingFrequency = "";
    });

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
      this.request.defaultBillingFrequency == "" ||
      this.request.defaultBillingFrequency == null
    ) {
      this.request.defaultBillingFrequency =
        this.defaultBillingFrequency[0].value;
      this.defaultBillingFrequency[0].selected = true;
    }

    if (
      !this.defaultBillingFrequency.some((item) => {
        return item.text == "Don't Default";
      })
    )
      this.defaultBillingFrequency.push(new ListItem("Don't Default", "NONE"));

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

    billingMethod.forEach((item) => {
      if (item.selected) {
        this.request.billingMethod.push(item.value);

        const data = new ListItem(item.text, item.value);
        if (this.request.defaultBillingMethod == item.value)
          data.selected = true;

        this.defaultBillingMethod.push(data);
      }
    });

    this.defaultBillingMethod.forEach((item) => {
      if (item.value != this.request.defaultBillingMethod)
        this.request.defaultBillingMethod = "";
    });

    if (
      this.request.defaultBillingMethod == "" ||
      this.request.defaultBillingMethod == null
    ) {
      this.request.defaultBillingMethod =
        this.defaultBillingMethod[0].value;
      this.defaultBillingMethod[0].selected = true;
    }

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