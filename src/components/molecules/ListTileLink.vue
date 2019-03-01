<template lang="pug">
  router-link(:to="{name: link}")
    v-list-tile
      v-list-tile-action
        v-icon {{getRoutes(link, "icon")}}

      v-list-tile-content
        v-list-tile-title {{getRoutes(link, "name")}}
</template>

<script>
/* eslint-disable */
export default {
  name: "ListTitleLink",
  props: {
    link: String
  },
  methods: {
    getRoutes(name, key) {
      let routerData = this.$router.options.routes.find(item => {
        return item.name === name;
      });
      return routerData.meta[key];
    }
  }
};
</script>

