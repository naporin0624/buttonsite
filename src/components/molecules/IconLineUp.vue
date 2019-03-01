<template lang="pug">
  div.wapper
    v-icon.icon-button(
      :x-large="xlargeCheck"
      :large="largeCheck"
      :medium="mediumCheck"
      :small="smallCheck"
      v-for="icon in $props.iconNameList"
      :key="icon"
      @click="clickEvent(icon)"
    ) {{icon}}
</template>

<script>
export default {
  name: 'PlayButtonList',
  props:{
    iconNameList:{
      type: Array,
      required: true,
    },
    iconSize:{
      type: String,
      // required: true,
      default: "x-large"
    }
  },
  methods:{
    clickEvent(iconName){
      this.$emit("iconClickEvnet", iconName)
    },
    typeCheck(str){
      const ret = this.iconSize === str
      console.log(ret)
      return ret
    }
  },
  computed:{
    xlargeCheck(){
      return this.typeCheck("x-large")
    },
    largeCheck(){
      return this.typeCheck("large")
    },
    mediumCheck(){
      return this.typeCheck("medium")
    },
    smallCheck(){
      return this.typeCheck("small")
    }
  }
}
</script>

<style scoped>
.icon-button:hover{
  cursor: pointer;
}
.icon-button:active{
  color: black;
  cursor: pointer;
}
</style>
