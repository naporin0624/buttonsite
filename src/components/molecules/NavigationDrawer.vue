<template>
  <v-navigation-drawer v-model="valLocal" temporary fixed>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
/* eslint-disable */
export default {
  name: "NavigationDrawer",
  data() {
    return {};
  },
  props: {
    val: Boolean
  },
  computed: {
    valLocal: {
      get() {
        return this.val;
      },
      set(val) {
        this.$emit("update:val", val);
      }
    }
  }
};
</script>
