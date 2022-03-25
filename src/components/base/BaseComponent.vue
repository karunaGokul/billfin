<script lang="ts">
import { Vue } from "vue-class-component";

import moment from "moment";

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

    let date = new Date(createdTime);
    let currentDate = new Date();

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

    if (date.getDate() == currentDate.getDate() && date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()) {
      console.log(currentDate, date);
      //console.log(currentDate.getSeconds(), date.getSeconds());
     // console.log(currentDate.getSeconds() - date.getSeconds());
    }

  }
}
</script>