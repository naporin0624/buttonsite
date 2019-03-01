<template lang="pug">
  v-toolbar(dark fixed app clipped-right flat color="#35495E")
    v-toolbar-side-icon(@click.stop="drawerLocal = !drawerLocal")
    v-toolbar-title 〇〇ボタンメーカ
    v-spacer
</template>

<script>
/* eslint-disable */
export default {
  name: "Header",
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
</style>
