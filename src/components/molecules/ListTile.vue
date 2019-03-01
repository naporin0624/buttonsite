<template lang="pug">
  v-list-tile(@click.stop="valLocal = !valLocal")
    v-list-tile-action
      v-icon {{icon}}

    v-list-tile-content
      v-list-tile-title {{title}}
</template>

<script>
/* eslint-disable */
export default {
  name: "ListTitle",
  props: {
    icon: String,
    title: String,
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

<style scoped>
</style>
