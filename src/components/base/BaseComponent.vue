<script lang="ts">
import { Vue } from "vue-class-component";

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

  create(createdTime: string) {
    //console.log(createdTime);

    //let date = new Date(createdTime);

    //console.log(date);
    //console.log(date.getFullYear());

    /*let UTCDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    let UTC = new Date(UTCDate);*/

    let tzone = moment_timezone(new Date());
    let utc = moment.tz(createdTime, "America/New_York");
    let date = new Date(utc.format());
    let currentDate = new Date();

    if (
      date.getDate() == currentDate.getDate() &&
      date.getMonth() == currentDate.getMonth() &&
      date.getFullYear() == currentDate.getFullYear() &&
      date.getHours() == currentDate.getHours() &&
      date.getMinutes() == currentDate.getMinutes()
    ) {
      console.log(currentDate, date);
      //console.log(currentDate.getSeconds(), date.getSeconds());
      // console.log(currentDate.getSeconds() - date.getSeconds());
    }

    //console.log(c.toUTCString());

    //console.log(moment(c).utc().format());

    //console.log(moment.utc(createdTime).format("MM/DD/YYYY HH:mm:ssZ"));
    //console.log('-===============-');
    //console.log('current date', moment.utc(new Date()).format("MM/DD/YYYY HH:mm:ss") );
    //let currentDate = new Date();

    //console.log(moment(String(new Date(createdTime))).format("MM/DD/YYYY HH:MM:SS"));

    /*let convertedDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
      new Date().getMilliseconds()
    );*/

    //console.log(currentDate);
    //console.log(convertedDate);

    //console.log('====================');

    /*console.log(currentDate.getDate() == convertedDate.getDate());
    console.log(currentDate.getMonth() == convertedDate.getMonth());
    console.log(currentDate.getFullYear() == convertedDate.getFullYear());
    console.log(currentDate.getHours() == convertedDate.getHours());
    console.log(currentDate.getMinutes() == convertedDate.getMinutes());
    console.log(currentDate.getSeconds() == convertedDate.getSeconds());
    console.log(currentDate.getMilliseconds() == convertedDate.getMilliseconds());
    console.log(currentDate == convertedDate);*/

    /*if (date.getDate() == currentDate.getDate() && date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()) {
      console.log(currentDate, date);
      //console.log(currentDate.getSeconds(), date.getSeconds());
     // console.log(currentDate.getSeconds() - date.getSeconds());
    }*/
  }
}
</script>