<template>
  <div class="tab-content tab-content-sm__scroll overflow-auto border-bottom">
    <div class="p-8">
      <p class="fs-3 fw-bolder pb-3 mb-5 border-bottom">Confirm your setup</p>

      <p class="fs-3 fw-bolder pb-3 mb-5 text-primary">General</p>

      <div
        v-for="(item, index) in generalRequest"
        :key="index"
        class="row ps-4 pe-4 mt-5 pb-5"
      >
        <div class="col-lg-8">
          <div class="fw-bolder">{{ item.displayName }}</div>
        </div>
        <div class="col-lg-4">
          <template v-if="!item.selected">
            {{ item.value }}
            <i
              class="fa fa-solid fa-pen text-primary ms-lg-4"
              @click="item.selected = true"
            ></i>
          </template>
          <template v-if="item.selected">
            <div
              class="input-group input-group-solid mb-2"
              v-if="item.text != 'state'"
            >
              <input
                type="text"
                class="form-control text-start"
                @blur="saveGeneral(item)"
                v-model="item.value"
              />
            </div>
            <div v-else>
              <select
                class="form-select form-select-solid"
                @blur="saveGeneral(item)"
                v-model="item.value"
              >
                <option selected value=""></option>
                <option v-for="(item, i) in states" :key="i" :value="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </template>
        </div>
      </div>

      <p class="fs-3 fw-bolder pb-3 mb-5 text-primary pt-5 border-top">
        Frequency & Timing
      </p>

      <div
        v-for="(item, index) in frequencyRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p class="fs-3 fw-bolder pb-3 mb-5 text-primary border-bottom">
          {{ item.feeTypeName }}
        </p>

        <frequency-advisory :response="item" v-if="item" />
      </div>

      <p class="fs-3 fw-bolder pb-3 mb-5 text-primary pt-5 border-top">
        Methodologies
      </p>

      <div
        v-for="(item, index) in methodologiesRequest.aumFeeTypes"
        :key="index"
        class="ps-4 pe-4"
      >
        <p
          class="fs-3 fw-bolder pb-3 mb-5 text-primary border-bottom"
          v-if="item.aumFlag"
        >
          {{ item.feeTypeName }}
        </p>

        <methodologies-advisory :response="item" v-if="item && item.aumFlag" />
      </div>

      <div class="d-flex justify-content-between mt-10">
        <button class="btn btn-secondary" @click="back">Back</button>
        <button class="btn me-10 btn-primary" @click="confirm">Continue</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import { useStore } from "vuex";
import { IFirmService } from "@/service";
import {
  firmRequestModel,
  generalBoardRequestModel,
  generalBoardResponseModel,
  frequencyRequestModel,
  ListItem,
} from "@/model";

import MultiCheckBox from "@/components/controls/MultiCheckBox.vue";
import SelectBox from "@/components/controls/SelectBox.vue";

import FrequencyAdvisory from "./FrequencyAdvisory.vue";
import MethodologiesAdvisory from "./MethodologiesAdvisory.vue";

@Options({
  components: {
    MultiCheckBox,
    SelectBox,
    FrequencyAdvisory,
    MethodologiesAdvisory,
  },
})
export default class ConfirmBoard extends Vue {
  @Inject("firmService") service: IFirmService;
  public store = useStore();
  public request = new generalBoardRequestModel();

  public generalRequest: Array<ListItem> = [];
  public frequencyRequest: frequencyRequestModel = new frequencyRequestModel();
  public methodologiesRequest: frequencyRequestModel =
    new frequencyRequestModel();

  mounted() {
    this.request.state = "Massachusetts";
    this.getGeneralDetails();
    this.getFrequncyAndTiming();
    this.getMethodologies();
  }

  public getGeneralDetails() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    request.firmDomain = this.store.getters.selectedFirmDomain;
    request.firmName = this.store.getters.selectedFirmName;
    this.service
      ?.getGeneralDetails(request)
      .then((response) => {
        this.request = response;
        let item = new ListItem("company", this.request.company);
        item.displayName = "Company";
        this.generalRequest.push(item);

        item = new ListItem("companyPhone", this.request.companyPhone);
        item.displayName = "Company Phone";
        this.generalRequest.push(item);

        item = new ListItem("companyDomain", this.request.companyDomain);
        item.displayName = "Company Site";
        this.generalRequest.push(item);

        item = new ListItem("companyAddress1", this.request.companyAddress1);
        item.displayName = "Company Address";
        this.generalRequest.push(item);

        item = new ListItem("city", this.request.city);
        item.displayName = "City";
        this.generalRequest.push(item);

        item = new ListItem("state", this.request.state);
        item.displayName = "State";
        this.generalRequest.push(item);

        item = new ListItem("postalCode", this.request.postalCode);
        item.displayName = "Postal Code";
        this.generalRequest.push(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public back() {
    this.$emit("prev");
  }

  public saveGeneral(data: ListItem) {
    data.selected = false;

    this.generalRequest.forEach((item) => {
      if (item.text == "company") this.request.company = item.value;
      if (item.text == "companyPhone") this.request.companyPhone = item.value;
      if (item.text == "companyDomain") this.request.companyDomain = item.value;
      if (item.text == "companyAddress1")
        this.request.companyAddress1 = item.value;
      if (item.text == "city") this.request.city = item.value;
      if (item.text == "state") this.request.state = item.value;
      if (item.text == "postalCode") this.request.postalCode = item.value;
    });

    this.request.firmId = this.store.getters.selectedFirmId;
    this.service
      ?.saveGeneral(this.request)
      .then((response: generalBoardResponseModel) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getFrequncyAndTiming() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;
    this.service
      .getFrequencyAndTiming(request)
      .then((response) => {
        this.frequencyRequest = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getMethodologies() {
    const request = new firmRequestModel();
    request.firmId = this.store.getters.selectedFirmId;

    this.service
      ?.getMethodologies(request)
      .then((response) => {
        this.methodologiesRequest = response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public states: Array<string> = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District Of Columbia",
    "Federated States Of Micronesia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Marshall Islands",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Palau",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virgin Islands",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
}
</script>