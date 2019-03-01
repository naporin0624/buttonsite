<template lang="pug">
  //- PC版以上 
  v-container(grid-list-xs justify-space-between)
    v-layout(row wrap)
      v-flex(xs2)
        iconlineup-component.controler(
          :iconNameList="useButtonChoice"
          @iconClickEvnet="catchClildEvent"
        )
      v-flex(xs2)
        div.slider
          v-slider(v-model="sliderLocal")
      v-flex(xs4)
        v-card(flat tile)
          v-layout(row wrap)
            v-flex(xs2)
              iconlineup-component(
                :iconSize="'small'"
                :iconNameList="['shuffle']"
                @iconClickEvnet="catchClildEvent"
              )
            v-flex(xs8)
              div.music-title {{musicTitle}}
            v-flex(xs2)
              iconlineup-component(
                :iconSize="'small'"
                :iconNameList="['repeat']"
                @iconClickEvnet="catchClildEvent"
              )
          
          v-layout(row wrap)
            v-flex(xs2)
              div.now-time {{audioNowTime|second2Time}}
            v-flex(xs8)
              div.music-category Kangaroo Valley Safari
            v-flex(xs2)
              div.remain-time -{{(audioFullTime-audioNowTime)|second2Time}}
          
          v-progress-linear(
            color="black"
            height="3"
            :button="true"
            v-model="audioProgressBarValue"
          )
      
      v-flex(xs)
        iconlineup-component.list(
          :iconSize="'large'"
          :iconNameList="['list']"
          @iconClickEvnet="catchClildEvent"
        )
      
      v-flex(xs3)
        v-text-field(
          box
        )

</template>

<script>
import IconLineUp from "../molecules/IconLineUp"
export default {
  name: "iTunesLikes",
  components:{
    "iconlineup-component": IconLineUp
  },
  props:{
    slider: {
      type: Number,
      default: 30,
      required: true,
    },
    musicTitle: {
      type: String,
    },
    playAllowFlag: {
      type: Boolean,
      default: true,
      required: true,
    },
    audioNowTime: {
      type: Number,
      default: 0
    },
    audioFullTime: {
      type: Number,
      default: 1
    }
  },
  data(){
    return{
      playNow: ['fast_rewind', 'pause', 'fast_forward'],
      stopNow: ['fast_rewind', 'play_arrow', 'fast_forward'],
    }
  },
  methods:{
    catchClildEvent(val){
      if(val === 'fast_rewind') val = 'back'
      else if(val === 'false_forward') val = 'next'
      else if(val === 'play_arrow') val = 'play'
      else if(val === 'pause') val = 'stop'
      this.$emit("buttonClickEvent", val)
    }
  },
  filters:{
    second2Time(val){
      const minutes = Math.floor(val/60)
      const seconds = val%60
      let retTime  = ''
      if(seconds>=10) retTime = minutes + ':' + seconds
      else retTime = minutes + ':0' + seconds
      return retTime
    }
  },
  computed:{
    useButtonChoice(){
      if(this.playAllowFlag) return this.stopNow
      else return this.playNow
    },
    audioProgressBarValue(){
      return (this.audioNowTime*100) / this.audioFullTime
    },
    sliderLocal:{
      get(){
        return this.slider
      },
      set(val){
        this.$emit('update:slider', val)
      }
    }
  },
}
</script>

<style scoped>
.controler{
  padding-top: 12px;
}
.slider{
  width: 80%;
}
.now-time{
  text-align: left;
}
.remain-time{
  text-align: right;
}
.music-title{
}
.music-category{
  color:gray;
}
.list{
  padding-top: 12px;
}
</style>
