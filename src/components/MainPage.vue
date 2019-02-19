<template>
    <div>
        <transition name="fade">
            <div v-if="buttonData.length!=0">
                <div v-for="i in buttonDataFilter.length-1" :key="i">
                    <h2>{{buttonData[i].title}}</h2>
                    <div class="button-box">
                        <button 
                        v-for="j in buttonDataFilter[i].button.length-1" 
                        :key="j" @click="playAudio(i,j)"
                        >
                        {{buttonDataFilter[i].button[j]}}
                        </button>
                    </div>
                    <hr>
                </div>
            </div>
        </transition>
        <div id="footer">
            <div class="controlor">
            <div class="inline-block">
                <span>現在の音声</span>
                <br>
                <span>{{nowPlaying}}</span>
            </div>
            <audio id="ad" controls class="inline-block"></audio>
            <div class="inline-block">
                <span>次の音声</span>
                <br>
                <span>{{next}}</span>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios_t from "../modules/myAxios.js"
export default {
    name: "MainPage",
    data(){
        return{
            audioQue:[null],
            buttonData:[],
            ad: new Audio(),
            playFlag: true,
            nowPlaying:"まだ入ってないよ",
            next: "次はまだ入ってないよ"
        }
    },
    created(){
        axios_t.get("api/button").then(res=>{
            this.buttonData = res.data.button
        })
    },
    mounted(){
        this.ad = document.getElementById('ad');
        this.ad.addEventListener('loadstart',()=>{
            this.nowPlaying = this.audioTitle(this.ad.src)
            this.next = this.audioTitle(this.audioQue[0])
        })
        this.ad.addEventListener('ended',()=>{
            if(this.audioQue[0]==null) this.playFlag = true
            else{
                this.ad.src = this.audioQue[0]
                this.audioQue.shift()
                this.ad.play()
            }
        })
    },
    methods:{
        playAudio(indexI, indexJ){
            let data = this.buttonData[indexI]
            let basedir = data.basepath
            let subdir = data.title
            let fileName = data.button[indexJ]
            if(fileName==undefined) return 0;
            let url = "static/"+basedir+"/"+subdir+"/"+fileName
            console.log(url)
            if(this.playFlag){
                this.ad.src = url
                this.ad.play()
            }else{
                this.audioQue.splice(this.audioQue.length-1,0,url)
                this.next = this.audioTitle(this.audioQue[0])
            }
            this.playFlag = false
        },
        audioTitle(targetURL){
            if(targetURL==null) return "次はまだ入ってないよ"
            let url = decodeURIComponent(targetURL);
            url = url.split("/")
            return url[url.length-1]
        }
    },
    computed:{
        buttonDataFilter(){
            let ret = this.buttonData.filter(element=>{
                return element.button.length>0
            })
            return ret
        }
    }
}
</script>

<style scoped>
h2{
    text-align: left;
    padding-left: 10px;
}
.button-box{
    text-align: left;
    padding-left: 10px
}
button{
    margin: 2px
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#footer {
    position: fixed;
    background-color: #35495E;
    color: #ffffff;
    bottom: 0;
    width: 100%;
    height: 70px;
}
.inline-block{
    display: inline-block;
    /* margin-top: 10px */
}
.inline-block span{
    font-size: large;
    padding: 5px;
}
.controlor{
    /* text-align: right; */
    padding: 10px;
}
</style>
