<script lang="ts">
import { Vue } from "vue-class-component";

import { Settings } from '@/config';

import moment from "moment";
import moment_timezone from "moment-timezone";

export default class BaseComponent extends Vue {
  confirmation(title: string, message: string) {
    let root: any = this.$root;

    return root.$confirmation(title, message);
  }

  alert(title: string, message: string) {
    let root: any = this.$root;

    return root.$alert(title, message);
  }

  convertUTC(date: string) {
    let tzone = moment_timezone(new Date());
    let utc = moment.tz(date, "America/New_York");
    let convertedDate = new Date(utc.format());

    return convertedDate;
  }

  create(createdTime: string, updatedTime: string) {
    let fromDate = this.convertUTC(createdTime);
    let toDate = this.convertUTC(updatedTime);
    let currentDate = new Date();

    let timeLimit = Settings.timeLimit;

    if (
      fromDate.getDate() == currentDate.getDate() &&
      fromDate.getMonth() == currentDate.getMonth() &&
      fromDate.getFullYear() == currentDate.getFullYear() &&
      fromDate.getHours() == currentDate.getHours() &&
      fromDate.getMinutes() == currentDate.getMinutes()
    ) {
      let seconds = currentDate.getSeconds() - fromDate.getSeconds();
      if (seconds <= timeLimit) return "new";
    } else if (
      toDate.getDate() == currentDate.getDate() &&
      toDate.getMonth() == currentDate.getMonth() &&
      toDate.getFullYear() == currentDate.getFullYear() &&
      toDate.getHours() == currentDate.getHours() &&
      toDate.getMinutes() == currentDate.getMinutes()
    ) {
      let seconds = currentDate.getSeconds() - toDate.getSeconds();
      if (seconds <= timeLimit) return "update";
    } else return 'old';

  }
}
</script>