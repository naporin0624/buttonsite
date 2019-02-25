<template lang="pug">
  div.wapper
    div#first-contents
      h1 〇〇ボタン
      p とりあえずつくりました
      p 音声のパースなどは作成者様がやっていただく形となります
    
    transition(name="fade")
      div#main-contents(v-if="renderCheck")
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

    div#footer
      div.controler
      v-btn(
        v-for="icon in audioControlIcon" 
        :key="icon.name" 
        fab 
        outline 
        icon 
        color="black"
      )
        v-icon {{icon.name}}
      div.progressbar
      v-progress-linear(
        color="blue"
        height="5"
        :value="audioProgressBar"
      )
</template>

<script>
  import axios_t from "../modules/myAxios.js"
  export default {
    name: "MainPage",
    data() {
      return {
        buttonData: [],
        audioControlIcon:{
          back: {
            name:'fast_rewind',
          },
          play: {
            name: 'play_arrow',
          },
          pause: {
            name: 'pause',
          },
          forward: {
            name: 'fast_forward',
          }
        },
        //再生しているインデックスを示す
        audioQueIndex:0,
        audioQue: [],
        ad: new Audio(),
        adConfig:{
          currentTime: 0,
          duration:1
        },
        playFlag: true,
      }
    },
    created() {
      //voiceディレクトリ構成から生成されたjsonを呼び出す
      axios_t.get("static/button.json").then(res => {
        this.buttonData = res.data
      })
    },
    mounted() {
      //audioにイベントリスナーを設置
      //音声が再生可能なら発火
      this.ad.addEventListener('loadstart', () => {
        this.adConfig.currentTime = 0
        this.playFlag = false
      })
      //音声が再生終了したら発火
      //次の音声を探しにいく
      this.ad.addEventListener('ended', () => {
        this.playFlag = true
        const url = this.nextAudioURL()
        this.playAudioFromURL(url)
      })
      this.ad.addEventListener("pause", ()=>{
        console.log("pauseEvent")
      })
      this.ad.addEventListener("play",()=>{
        console.log("playEvent")
      })
      this.ad.addEventListener("timeupdate", ()=>{
        this.adConfig.duration = this.ad.duration;
        this.adConfig.currentTime = this.ad.currentTime
      })
    },
    filters:{
      cutOutNameFromPath(urlPath){
        const retData = urlPath.split('/').pop().replace('.mp3', '')
        return retData
      }
    },
    methods: {
      buttonAction(buttonURLPath){
        console.log("buttonAction",buttonURLPath)
        this.audioQue.push(buttonURLPath)
      },
      nextButtonEvent(){

      },
      predBettonEvent(){

      },
      playButtonEvent(){

      },
      pauseButtonEvent(){

      }
      /*
      //ボタンが押されたのイベント関数
      buttonAction(indexI, indexJ) {
        console.log("buttonAction")
        //jsonから使用するデータを抽出
        const data = this.buttonData[indexI]
        //urlを生成して再生キューに入れる
        this.genURLForPlayAfterInsertQue(data, indexJ)
        //キューに入っている音声を取り出す
        const url = this.nextAudioURL()
        //再生する
        this.playManager(url)
      },
      playManager(url){
        console.log("playManager", url, this.audioQue, this.audioQueIndex)
        //引数urlがundefinedなら
        if(url==null || url == undefined){
          this.playFlag = true
        }else{
          //再生フラグがtrueかつ再生キューが存在するなら再生フラグを折る
          if(this.playFlag && this.audioQueCheck()){
            this.playFlag = this.playAudio(url)
          }
          //再生フラグがfalseで再生キューもないなら再生フラグを立てる
          else if(!this.playFlag && !this.audioQueCheck()){
            this.playFlag = true
          }
        }
      },
      //音声を再生する関数
      playAudio(url) {
        this.ad.src = url
        this.ad.play()
        return false
      },
      //キューにurlをセットする関数
      insertQue(url) {
        this.audioQue.push(url)
      },
      //urlを受け取って音声ファイルの名前のみを返す関数 -> return None
      audioTitle(targetURL) {
        if (targetURL == null) return this.nextMessage
        let url = decodeURIComponent(targetURL)
        url = url.split("/")
        return url[url.length - 1].replace(".mp3", "")
      },
      //再生するためのURLを生成する関数
      genURLForPlayAfterInsertQue(mp3Data, index) {
        //static以下のどのディレクトリを使うかをjsonから選択
        const basedir = mp3Data.basepath
        //mp3が格納されているディレクトリを選択
        const subdir = mp3Data.title
        //mp3を選択
        const fileName = mp3Data.button[index]
        //undefinedの場合が稀にあるので排除
        if (fileName == undefined) return 0;
        //access urlを作成
        let url = "static/" + basedir + "/" + subdir + "/" + fileName
        //再生キューに追加
        this.insertQue(url)
      },
      //次の音声URLを吐き出せるかチェックする関数
      nextAudioURLCheck(){
        console.log("nextAudioURL")
        
        if (this.audioQueIndex == this.audioQue.length-1) return false
        else return true
        // else{
        //   this.audioQueIndex+=1
        //   const url = this.audioQue[this.audioQueIndex]
        //   console.log(">>>", url)
        //   return url
        // }
      },
      //前の音声URLを吐き出せるかチェックする関数
      prevAudioURLCheck(){
        console.log("prevAudioURL")
        if(this.audioQueIndex==0) return false
        else return true
        // else{
        //   this.audioQueIndex-=1
        //   const url = this.audioQue[this.audioQueIndex]
        //   console.log(">>>",url)
        //   return url
        // }
      },
      //再生キューのリストサイスが1以上か確認
      audioQueCheck(){
        const size = this.audioQue.length - this.audioQueIndex
        if(size>=1) return true
        else return false
      },
      //オーディオコントロールボタンが押されたら発火
      audioControlButton(icon){
        console.log("audioControlButton")
        console.log(this.ad.src, this.ad.currentTime)
        //戻るボタン
        if(icon=="fast_rewind"){
          this.ad.currentTime = 0.0
        }
        //再生ボタン
        else if(icon=="play_arrow"){
          if(this.ad.currentTime>0.5){
            this.ad.play()
            this.playFlag = false
          }else{
            const url = this.nextAudioURL()
            this.playManager(url)
          }
        }
        //進むボタン
        else if(icon=="fast_forward"){
          const url = this.nextAudioURL()
          this.playManager(url)
        }
        //止めるボタン
        else if(icon="pause"){
          this.ad.pause()
          this.playFlag = true
        }else console.log(icon)
      },
      */
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
        return this.adConfig.currentTime*100/this.adConfig.duration
      },
    },
    watch: {
      audioQue(item) {
        console.log(item[this.audioQueIndex++])
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
  h2 {
    text-align: left;
    padding-left: 10px;
  }
  /*ボタン生成時の動作*/
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  /*フッター*/
  #footer {
    position: fixed;
    background-color: rgb(194, 194, 194);
    color: #ffffff;
    bottom: 0;
    width: 100%;
    /* height: 70px; */
  }

  /*今はいらない*/
  .inline-block {
    display: inline-block;
    /* margin-top: 10px */
    width: 300px;
  }

</style>
