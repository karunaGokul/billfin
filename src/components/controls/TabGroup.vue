<template>
    <div>
        <p>This is tabs group</p>
        <slot name="parent"></slot>
    </div>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export default class TabGroup extends Vue {
    
}
</script>