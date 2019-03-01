<template lang="pug">
  div.wapper
    v-navigation-drawer(v-model="drawerLocal" fixed app)
      v-list(dense)
        slot
        //- list-tile-component(:val.sync="QA" :icon="'send'" :title="'困ったときに'")
    //- nav-drawer-component(slot="drawer-component" :val.sync="QA") @naporin0624に連絡して
    //- slot(name="drawer-template")
</template>

<script>
/* eslint-disable */
import ListTile from "../molecules/ListTile";
import NavDrawer from "../molecules/NavigationDrawer";
export default {
  name: "LeftDrawer",
  components: {
    "list-tile-component": ListTile,
    "nav-drawer-component": NavDrawer
  },
  data() {
    return {};
  },
  props: {
    drawer: Boolean
  },
  computed: {
    drawerLocal: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit("update:drawer", val);
      }
    }
  }
};
</script>

<style scoped>
div {
  padding: 10px;
}
</style>
