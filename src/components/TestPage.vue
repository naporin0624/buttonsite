<template lang="pug">
  itunes-likes-component(
    :slider.sync="slider",
    :musicTitle="musicTitle"
    :playAllowFlag="playAllowFlag"
    :audioFullTime="60"
    :audioNowTime="30"
    @buttonClickEvent="catchChildEvent"
  )
</template>

<script>
import iTunesLikesHeader from "./organisms/iTunesLikesHeader"
export default {
  name: "test",
  components:{
    "itunes-likes-component": iTunesLikesHeader
  },
  data(){
    return{
      slider: 30,
      musicTitle: "aaa",
      playAllowFlag: true
    }
  },
  methods:{
    catchChildEvent(val){
      if(val === 'play') this.playAllowFlag = false
      else if(val === 'stop') this.playAllowFlag = true
    }
  }
}
</script>
