<template lang="pug">
  v-app
    header-component(:drawer.sync="drawer")
    drawer-component(:drawer.sync="drawer")
      r-link(:link="'Main'")
    v-content
      router-view
</template>

<script>
import HeaderComponent from "./components/organisms/Header";
import DrawerComponent from './components/organisms/Drawer';
export default {
  name: 'app',
  components:{
    "header-component": HeaderComponent,
    "drawer-component": DrawerComponent
  },
  data(){
    return{
      drawer: false
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  /* margin-top: 40px; */
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
