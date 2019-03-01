<template lang="pug">
  div.wapper
    div#first-contents
      h1 〇〇ボタン
      p とりあえずつくりました
      p 音声のパースなどは作成者様がやっていただく形となります
    
    transition(name="fade")
      div#main-contents(v-if="renderCheck")
        //- v-menu(
        //-   transition="slide-y-transition"
        //-   bottom
        //-   max-height="300"
        //- )
        //-   v-btn(
        //-     slot="activator"
        //-   ) タイトルリスト
        //-   v-list
        //-     v-list-tile(
        //-       v-for="(item, index) in buttonDataFilter"
        //-       :key="index"
        //-       @click="selectTitle=item.title"
        //-     )
        //-       v-list-tile-title {{ item.title }}

        div.each-button-contents(
          v-for="eachData in buttonDataFilter" 
          :key="eachData.title"
        )
          h2 {{eachData.title}}
          div.button-box
            button.audio-button(
              v-for="eachButton in eachData.button"
              @click="buttonAction(eachButton)"
            ) {{ eachButton|cutOutNameFromPath }}
          hr

    v-footer(fixed height="10vh" fill-height="true")
      v-container(grid-list-xs fluid)
        v-layout(row wrap)
          v-flex(xs3)
            v-icon(
              v-for="icon in audioControlIcon" 
              :key="icon.name"
              x-large
              @click="controlButoonEvent(icon.name)"
            ) {{icon.name}}
          
          v-flex(xs2)
            v-slider(v-model="slider")
          
          v-flex(xs5)
            v-card(flat)
              h3 nowPlaying
              p {{playingVoiceName|cutOutNameFromPath}}
          
          v-flex(xs2)
            v-icon(large) list
          
          //- v-flex(xs2)
          //-   v-text-field(
          //-     append-icon="search"
          //-     box
          //-     height="auto"
          //-   )

      //-   h5 音声タイトル
      //-   v-progress-linear(
      //-     color="blue"
      //-     height="5"
      //-     :value="audioProgressBar"
      //-   )
</template>

<script>
  import axios_t from "../modules/myAxios.js"
  export default {
    name: "MainPage",
    data() {
      return {
        buttonData: [],
        selectTitle: null,
        slider: 30,
        audioQue: [],
        ad: new Audio(),
        playFlag: true,
        playingVoiceName: "",
      }
    },
    created() {
      //voiceディレクトリ構成から生成されたjsonを呼び出す
      axios_t.get("static/button.json").then(res => {
        this.buttonData = res.data
        const firstShowButtonIndex = Math.floor(Math.random()*(this.buttonData.length-1))
        this.selectTitle = res.data[firstShowButtonIndex].title
      })
    },
    mounted() {
      //audioにイベントリスナーを設置
      //音声が再生可能なら発火
      this.ad.addEventListener('loadstart', () => {
        this.playFlag = false
      })
      //音声が再生終了したら発火
      //次の音声を探しにいく
      this.ad.addEventListener('ended', () => {
        this.playFlag = true
        this.playAudioFromQue()
      })
      this.ad.addEventListener("pause", ()=>{
        console.log("pauseEvent")
      })
      this.ad.addEventListener("play",()=>{
        console.log("playEvent")
      })
      this.ad.addEventListener("timeupdate", ()=>{
        // this.adConfig.duration = this.ad.duration;
        // this.adConfig.currentTime = this.ad.currentTime
      })
    },
    filters:{
      cutOutNameFromPath(urlPath){
        const retData = urlPath.split('/').pop().replace('.mp3', '')
        return retData
      },
    },
    methods: {
      buttonAction(buttonURLPath){
        this.audioQue.push(buttonURLPath)
        if(this.playFlag)this.playAudioFromQue()
      },
      playAudioFromQue(){
        if(this.audioQue.length>0){
          const url = this.audioQue.shift()
          this.ad.src = url
          this.playingVoiceName = url
          this.ad.play()
          this.playFlag = false
        }else{
          console.log("Que empty")
          this.playFlag = true
        }
      },
      controlButoonEvent(iconName){
        switch(iconName){
          case 'fast_rewind':
            console.log("戻る")
            break
          case 'play_arrow':
            console.log("再生")
            break
          case 'pause':
            console.log("停止")
            break
          case 'fast_forward':
            console.log("進む")
            break
          default:
            console.log("？？")
            break
        }
      },
      nextButtonEvent(){

      },
      predBettonEvent(){

      },
      playButtonEvent(){

      },
      pauseButtonEvent(){

      }
    },
    computed: {
      renderCheck(){
        return this.buttonData.length>0
      },
      buttonDataFilter() {
        const ret = this.buttonData.filter(element => {
          return element.button.length > 0
        })
        return ret
      },
      audioProgressBar(){
        // return this.adConfig.currentTime*100/this.adConfig.duration
      }
    }
  }

</script>

<style scoped>
  /*再生ボタン*/
  .audio-button{
    background-color: rgb(221, 221, 221);
    border-radius: 5px;
    padding: 1px;
    margin: 2px;
  }
  /*ボタンを囲うdivの指定*/
  .button-box {
    text-align: left;
    padding-left: 10px
  }
  /*サブタイトル*/
  .each-button-contents h2 {
    text-align: left;
    padding-left: 10px;
  }
  /*ボタン生成時の動作*/
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
