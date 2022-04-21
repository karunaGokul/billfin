<template>
  <div>
    <bread-crumb />
    <div class="card p-6">
      <div class="p-2">
        <h4 class="ps-4 pb-4">Standard Attributes</h4>
        <div class="row">
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
        </div>
        <h4 class="ps-4 pb-4">Optional Attributes</h4>
        <div class="row">
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
        </div>
        <div class="d-flex align-items-center justify-content-end pt-4 pb-4">
          <button type="button" class="btn btn-link text-gray">
            Cancel
          </button>
          <button type="button" class="btn btn-primary ms-8">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

import BreadCrumb from "@/components/layout/BreadCrumb.vue";
import SimpleInput from "@/components/controls/SimpleInput.vue";

@Options({
  components: {
    BreadCrumb,
    SimpleInput,
  },
})
export default class SecurityAttributes extends Vue {}
</script>