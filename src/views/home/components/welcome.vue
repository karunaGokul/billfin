<template>
  <div class="modal fade show d-block vh-100">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header justify-content-start p-5">
          <h5 class="modal-title">Welcome to BillFin</h5>
          <h6 class="text-muted ms-10">
            Let's you get onboarded quickly and easily!
          </h6>
        </div>
        <div class="modal-body w-75 mx-auto" style="height: 80vh">
          <div class="tab-group">
            <div class="tab-header">
              <ul class="tab-label-group">
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 1 }"
                  @click="activeTab = 1"
                >
                  General
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 2 }"
                  @click="activeTab = 2"
                >
                  Frequecy & Timing
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 3 }"
                  @click="activeTab = 3"
                >
                  Methodologies
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 4 }"
                  @click="activeTab = 4"
                >
                  Adjustments
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 5 }"
                  @click="activeTab = 5"
                >
                  Invite
                </li>
                <li
                  class="tab-label"
                  :class="{ 'tab-active': activeTab == 6 }"
                  @click="activeTab = 6"
                >
                  Confirm
                </li>
              </ul>
            </div>
            <div class="tab-content-group">
              <General @next="activeTab = 2" v-if="activeTab == 1" />
              <Frequecy
                @prev="activeTab = 1"
                @next="activeTab = 3"
                v-if="activeTab == 2"
              />
              <Methodologies
                @prev="activeTab = 2"
                @next="activeTab = 4"
                v-if="activeTab == 3"
              />
              <Adjustments
                @prev="activeTab = 3"
                @next="activeTab = 5"
                v-if="activeTab == 4"
              />
              <div class="tab-content pb-5 border-bottom" v-if="activeTab == 5">
                {{ activeTab }}
              </div>
              <div class="tab-content pb-5 border-bottom" v-if="activeTab == 6">
                {{ activeTab }}
              </div>
              <div class="tab-content pb-5 border-bottom" v-if="activeTab == 7">
                {{ activeTab }}
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center p-4 border-0">
          <div class="d-flex align-items-center justify-content-center">
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Terms</a>
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Plans</a>
            <a href="#" class="fs-5 text-muted fw-bold pe-10">Contact us</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import General from "./general.vue";
import Frequecy from "./frequecy.vue";
import Methodologies from "./methodologies.vue";
import Adjustments from "./adjustments.vue";

@Options({
  components: {
    General,
    Frequecy,
    Methodologies,
    Adjustments,
  },
})
export default class Welcome extends Vue {
  public activeTab: number = 1;
  public methodologiesTab: number = 1;
  public adjustmentsTab: number = 1;
}
</script>