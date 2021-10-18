<template>
  <div class="w-75 mx-auto pt-10">
    <h3 class="text-center mt-8">BillFin Licence Terms & Conditions</h3>
    <p class="text-left mt-8">
      By accessing this web site, you are agreeing to be bound by these web site
      Terms and Conditions of Use, all applicable laws and regulations, and
      agree that you are responsible for compliance with any applicable local
      laws. If you do not agree with any of these terms, you are prohibited from
      using or accessing this site. The materials contained in this web site are
      protected by applicable copyright and trade mark law.
    </p>
    <p class="text-left mt-8">
      The materials on Redi2 Technologies’s web site are provided “as is”. Redi2
      Technologies makes no warranties, expressed or implied, and hereby
      disclaims and negates all other warranties, including without limitation,
      implied warranties or conditions of merchantability, fitness for a
      particular purpose, or non-infringement of intellectual property or other
      violation of rights. Further, Redi2 Technologies does not warrant or make
      any representations concerning the accuracy, likely results, or
      reliability of the use of the materials on its Internet web site or
      otherwise relating to such materials or on any sites linked to this site.
    </p>
    <p class="text-left mt-8">
      In no event shall Redi2 Technologies or its suppliers be liable for any
      damages (including, without limitation, damages for loss of data or
      profit, or due to business interruption,) arising out of the use or
      inability to use the materials on Redi2 Technologies’s Internet site, even
      if Redi2 Technologies or a Redi2 Technologies authorized representative
      has been notified orally or in writing of the possibility of such damage.
      Because some jurisdictions do not allow limitations on implied warranties,
      or limitations of liability for consequential or incidental damages, these
      limitations may not apply to you. Redi2 Technologies has not reviewed all
      of the sites linked to its Internet web site and is not responsible for
      the contents of any such linked site.
    </p>

    <p
      class="
        form-check form-check-solid form-check-inline
        fs-6
        text-center
        mt-8
      "
    >
      <input class="form-check-input" type="checkbox" />
      I agree to these terms and conditions
    </p>

    <div class="text-center mt-8 mb-8">
      <button class="btn btn-light me-5" @click="back">Back</button>
      <button class="btn btn-primary ms-5">Subscribe</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

export default class Subscribe extends Vue {
  back() {
    this.$emit("back");
  }
}
</script>