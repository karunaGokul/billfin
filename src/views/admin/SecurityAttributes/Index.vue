<template>
  <div>
    <bread-crumb />
    <div class="card p-6">
      <div class="p-2">
        <h4 class="ps-4 pb-4">Standard Attributes</h4>
        <!--<div class="row">
          <div class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Identifier</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Symbol</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Name</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
          <div class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Description</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Display Name</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div> -->
        <div class="row">
          <div v-for="(col, i) in 2" :key="i" class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div
              class="row p-4"
              v-for="(item, index) in standardAttributes.slice(
                i * 3,
                (i + 1) * 3
              )"
              :key="index"
            >
              <div class="col-3 fw-bold mt-4">
                {{ item.securityColumnName }}
              </div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.securityAttributeName"
                  />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div>

        <h4 class="ps-4 mt-6 pb-4">Optional Attributes</h4>
        <div class="row">
          <div v-for="(col, i) in 2" :key="i" class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div
              class="row p-4"
              v-for="(item, index) in optionalAttributes.slice(
                i * 3,
                (i + 1) * 3
              )"
              :key="index"
            >
              <div class="col-3 fw-bold mt-4">
                {{ item.securityColumnName }}
              </div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.securityAttributeName"
                  />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 1</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 2</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 3</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
          <div class="col-6">
            <div class="row p-4">
              <div class="col-3 text-muted">Default Label</div>
              <div class="col-7 text-muted">Custom Label</div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 4</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 5</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
            <div class="row p-4">
              <div class="col-3 fw-bold">Attribute 6</div>
              <div class="col-7">
                <div class="input-group input-group-solid">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div> -->
        <div class="d-flex align-items-center justify-content-end pt-4 pb-4">
          <button type="button" class="btn btn-link text-gray">Cancel</button>
          <button
            type="button"
            class="btn btn-primary ms-8"
            @click="saveAttributes"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options } from "vue-class-component";
import { Inject } from "vue-property-decorator";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";

import { ISecurityAttributesService } from "@/service";
import { SecurityAttributesRequestModel } from "@/model";
import { useStore } from "vuex";
import BaseComponent from "@/components/base/BaseComponent.vue";

@Options({
  components: {
    BreadCrumb,
  },
})
export default class SecurityAttributes extends BaseComponent {
  @Inject("securityAttributesService") service: ISecurityAttributesService;

  public store = useStore();
  public subscription: any = null;

  public standardAttributes: Array<SecurityAttributesRequestModel> = [
    {
      securityColumnName: "securityIdentifier",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "symbol",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "name",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "description",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "displayName",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
  ];

  public optionalAttributes: Array<SecurityAttributesRequestModel> = [
    {
      securityColumnName: "attribute1",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "attribute2",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "attribute3",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "attribute4",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "attribute5",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
    {
      securityColumnName: "attribute6",
      securityAttributeName: "",
      securityAttributeMapId: 0,
    },
  ];

  created() {
    this.getAttributes();
  }

  mounted() {
    this.subscription = this.store.subscribe((mutations, type) => {
      if (mutations.type == "onLoadSecurityAttribute") this.getAttributes();
    });
  }

  public getAttributes() {
    let response: Array<SecurityAttributesRequestModel> =
      this.store.getters.onSecurityAttribute;
    this.bindResponse(response);
  }

  private bindResponse(response: Array<SecurityAttributesRequestModel>) {
    response.forEach((item) => {
      this.standardAttributes.forEach((data) => {
        if (item.securityColumnName == data.securityColumnName) {
          data.securityAttributeName = item.securityAttributeName;
          data.securityAttributeMapId = item.securityAttributeMapId;
        }
      });
    });

    response.forEach((item) => {
      this.optionalAttributes.forEach((data) => {
        if (item.securityColumnName == data.securityColumnName) {
          data.securityAttributeName = item.securityAttributeName;
          data.securityAttributeMapId = item.securityAttributeMapId;
        }
      });
    });
  }

  public saveAttributes() {
    let request = this.standardAttributes;
    request = request.concat(this.optionalAttributes);

    this.service
      .saveAttributes(request)
      .then((response) => {
        this.confirmation("", "Security Attribute updated successfully");
        this.store.dispatch("clearSecurityAttribute");
        this.store.dispatch("loadSecurityAttribute");
      })
      .catch((err) => {
        if (err.response.status == 500)
          this.alert(
            "Oops, sorry!",
            "Something went wrong, Please contact administration"
          );
        else if (err.response.status == 400)
          this.alert("Oops, sorry!", err.response.data.message);
      });
  }
}
</script>