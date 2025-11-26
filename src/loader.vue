<template>
    <transition name = fade>
        <div class = 'screen center-align valign-wrapper' v-if = loading>
            <div class = center v-if = old>
                <div class = center-align>
                    <div class="preloader-wrapper big active">
                        <template v-for = 'i in [`blue`, `red`, `yellow`, `green`]' :key = 'i'>
                        <div class="spinner-layer" :class = '`spinner-${i}`'>
                            <div class="circle-clipper left">
                            <div class="circle"></div>
                            </div><div class="gap-patch">
                            <div class="circle"></div>
                            </div><div class="circle-clipper right">
                            <div class="circle"></div>
                            </div>
                        </div>
                        </template>
                    </div>
                    <br>
                    <b> 請稍等 </b>
                </div>
            </div>

            <div class = ct>
                <!-- <load v-if = '!rev & !old'></load>
                <loadrev v-if = 'rev & !old'></loadrev> -->
            </div>
        </div>
    </transition>
</template>

<script>
// import $ from 'jquery'
import M from 'materialize-css'

// import load from '@/loader/load.vue'
// import loadrev from '@/loader/loadrev.vue'

export default {
    name: 'page_loader',
    data() {
        return {
            real_loader: false,
            fade: false,
            old: true,
            rev: false
        }
    },
    props: [
        'loading'
    ],
    components: {
        // load,
        // loadrev
    },
    mounted() {
        M.AutoInit();
        this.real_loader = this.fade = this.loading;
        setInterval(() => {
            this.rev ^= 1;
        }, 2560);
    },
    watch: {
        // loading(l, r) {
            // console.log(`${l} ${r}`)
            // if(r) this.real_loader = this.fade = true;
            // else {
            //     this.fade = false;
            //     setTimeout(() => {
            //         console.log('1')
            //         this.real_loader = false;
            //     }, 1000)
            // }
            // this.real_loader = r;
        // }
    },
    methods: {
    }
}
</script>

<style>
* {
  transition: 0.5s all;
}
body {
    /* font-family: 'font', sans-serif; */
    /* background-image: linear-gradient(to bottom, #49a06f, wheat); */
    background-color: #FBF7EF;
}
.screen {
  background-color: rgba(255, 255, 255, .75);
  z-index: 500;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(50px);
}
.blur {
  z-index: 10;
  background-color: rgba(255, 255, 255, .75);
  backdrop-filter: blur(5px);
  position: absolute;
}
.center {
  position: fixed;
  left: calc(50% - 70px);
  transform: translateX(50%);
}
.ct {
  position: fixed;
  left: calc(50% - 700px);
  transform: translateX(50%);
}
.bold {
  font-weight: 700;
}
.ani {
    animation: loader 1s ease 0s 1;
    opacity: 0%;
}
@keyframes loader {
    0% {
        opacity: 0%;
    }
    100% {
        opacity: 100%;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>