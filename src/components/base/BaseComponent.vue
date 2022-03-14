<script lang="ts">
import { Vue } from "vue-class-component";

export default class BaseComponent extends Vue {
  confirmation(title: string, message: string) {
    let root: any = this.$root;

    return root.$confirmation(title, message);
  }

  alert(title: string, message: string) {
    let root: any = this.$root;

    return root.$alert(title, message);
  }

}
</script>