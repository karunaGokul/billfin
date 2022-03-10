import { Vue } from "vue-class-component";

export class BaseComponent extends Vue {
  success(title: string, message: string) {
    let root: any = this.$root;

    return root.$success(title, message);
  }
}
