<template>
    <v-progress-linear
        v-model = scroll.progress
        style = 'position:fixed; z-index: 101;'
        color = '#004733'
        buffer-color = 'green lighten-2'
        height = 5
        :buffer-value = scroll.progress_bottom
        buffer-opacity = .3
     />
    <navi class = 'block glass elevate' @click = '($vuetify.display.mdAndUp ? show_nav ^= 1 : (show_nav ? () => {}: show_nav ^= 1))' :class = '[show_nav ? `tmp fixed` : `sticky`, !$vuetify.display.mdAndUp ? `text-center` : undefined]' id = 'title'>
        <img src = Logo/logo.png height = 20px />
        <!-- {{ alpha }} -->
        <a href = 'index.html' class = 'unfocused stroke'>
            <!-- <img src = 'logo.png' width = '10%' /> -->
            YC<font color = green class = film_ani>BS</font>
        </a>
        <template v-if = '$vuetify.display.mdAndUp'>
            <v-menu v-for = 'i, j in f' :key = i :value = j open-on-hover location = bottom scroll-strategy="none" attach = '#title'>
                <template #activator = '{props}'>
                    <div v-bind = props class = right>
                        <div :id = '`title-button-${j}`' v-if = '!show_nav'>
                            <v-icon> fa-sm fa-solid {{ i.icon }} </v-icon>&nbsp;
                            <b> {{ j }} </b>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </template>
                <v-card style = 'z-index: 100' :prepend-icon = i.icon class = glass>
                <template #title>
                    {{ j }}
                </template>
                <template #subtitle>
                    Sphinx
                </template>
                <template #text>
                    <v-list>
                    <v-list-item v-for = 'k in i.subpages' :key = k :title = title(hp(k.name)) :href = '`${(k.name)}.html`'></v-list-item>
                    </v-list>
                </template>
                </v-card>
            </v-menu>
        </template>

        

        <!-- <i class = 'material-icons right'> apps </i> -->
        <!-- <b class = right @mouseenter = show_subnav @mouseleave = hide_subnav id = menu> MENU </b> -->
        <div :style = 'show_nav ? `font-size: 40px;` : `font-size: 0px`' @click = '() => {}'>
            <!-- {{ show_nav }} -->
            <v-row v-if = show_nav class = ma-1>
                <template v-if = $vuetify.display.mdAndUp>
                    <v-hover v-for = 'i, j in f' :key = 'i' :value = 'j'>
                        <template v-slot:default = '{isHovering, props}'>
                            <v-col cols = 12 md = 4 lg = 3>
                                <v-card v-if = show_nav :variant = 'isHovering ? undefined : `tonal`' :color = i.color v-bind = props class = 'pa-1'>
                                    <template #title>
                                        <div class = 'text-center'>
                                            <v-icon style = 'font-size: 15px'> fa-solid {{ i.icon }} </v-icon> <br>
                                            {{ j }}
                                        </div>
                                    </template>
                                    <template #text>
                                        <v-list v-if = i.subpages style = 'border-radius: 10px;'>
                                            <v-list-item v-for = 'url in i.subpages' :key = url :href = '`${(url.name)}.html`'> {{ title(hp(url.name)) }} </v-list-item>
                                        </v-list>
                                    </template>
                                </v-card>
                            </v-col>
                        </template>
                    </v-hover>
                </template>
                
                <!-- Phone Version -->
                <v-carousel id = expanded_phone height = 100vh hide-delimiters v-else>
                    <v-carousel-item v-for = 'i, j in f' :key = i>
                        <v-card v-if = show_nav :variant = 'isHovering ? undefined : `tonal`' :color = i.color v-bind = props class = 'pa-1'>
                            <template #title>
                                <div class = 'text-center'>
                                    <v-icon style = 'font-size: 15px'> fa-solid {{ i.icon }} </v-icon> <br>
                                    {{ j }}
                                </div>
                            </template>
                            <template #text>
                                <v-list v-if = i.subpages style = 'border-radius: 10px;'>
                                    <v-list-item v-for = 'url in i.subpages' :key = url :href = '`${(url.name)}.html`'> {{ title(hp(url.name)) }} </v-list-item>
                                </v-list>
                            </template>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>

                <div v-if = '!$vuetify.display.mdAndUp' id = touch_swipe_guide>
                    <v-row justify = center>
                        <v-col justify = center>
                            <v-card variant = plain class = 'text-center text-grey' style = 'font-size: 20px;'>
                                <v-icon> fa-sm fa-solid fa-arrow-left </v-icon>
                                <v-icon> fa-sm fa-solid fa-arrow-pointer </v-icon>
                                <v-icon> fa-sm fa-solid fa-arrow-right </v-icon><br>
                                Swipe for navigation
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

                <!-- <v-btn
                v-if = '!$vuetify.display.mdAndUp' 
                rounded = xl
                icon = 'fa-solid fa-close'
                size = small
                style = 'position: fixed; top: 15px; left: calc(100vw - 70px);' /> -->
                
            </v-row>
        </div>
    </navi>
    <v-fab key = app app color = primary location = 'right bottom' size = large icon @click = 'show_nav = false' v-if = show_nav>
        <v-icon> fa-solid fa-close </v-icon>
    </v-fab>
    
    <transition name = scale>
        <v-fab key = app app color = transparent location = 'right bottom' size = large icon @click = 'real_goto(0)' v-if = 'show_top && !show_nav'>
            <v-icon> fa-solid fa-circle-up </v-icon>
            <!-- <v-img src = 'up.png' width = 100px height = 100px id = gotop /> -->
        </v-fab>
    </transition>
    
    <!-- <div class = subnav>
            <a href = '#'> <b class = right> Link 1 </b> </a><br>
            <a href = '#'> <b class = right> Link 2 </b> </a>
    </div> -->
    
    <!-- <br><br><br><br><br> -->
</template>

<script>
import $ from 'jquery'
import M from 'materialize-css'
import { useGoTo } from 'vuetify/lib/composables/goto';

import { animate } from 'animejs';

export default {
    name: 'title_nav',
    data() {
        return {
            pre: ['education', 'integrated-human-practices', 'members', 'wetlab', 'introduction-to-problems', 'software',  ],
            f: {
                'Sponsor': {
                    icon: 'fa-solid fa-key',
                    subpages: [{name: 'sponsor-Partnership', icon: undefined}],
                    color: 'red'
                },
                'Team': {
                    icon: 'fa-solid fa-circle-user',
                    subpages: [
                        {name: 'attributions', icon: undefined}, 
                        {name: 'members', icon: undefined}
                    ],
                    color: 'cyan'
                },
                'HP': {
                    icon: 'fa-solid fa-person',
                    subpages: [
                        {name: 'human-practice', icon: undefined},
                        // {'name': 'overview', 'icon': undefined},
                        {'name': 'integrated-human-practice', 'icon': undefined},
                        {'name': 'education', 'icon': undefined},
                        {'name': 'connecting-with-igemers', 'icon': undefined},
                        {'name': 'entrepreneurship', 'icon': undefined},
                        {'name': 'fundraising', 'icon': undefined},
                    ],
                    color: 'primary'
                },
                'DRY': {
                    icon: 'fa-solid fa-computer',
                    subpages: [
                        {name: 'software', icon: undefined}, 
                    ],
                    color: 'orange'
                },
                'WET': {
                    icon: 'fa-solid fa-flask',
                    subpages: [
                        {name: 'design', icon: undefined},
                        {name: 'experiments', icon: undefined}, 
                        {name: 'notebook', icon: undefined}, 
                        {name: 'safety-and-security', icon: undefined}
                    ],
                    color: 'pink'
                },
                'Project': {
                    icon: 'fa-solid fa-bars-progress',
                    subpages: [
                        {name: 'description', icon: undefined}, 
                        {name: 'engineering', icon: undefined}, 
                        {name: 'results', icon: undefined},
                        {name: 'contribution', icon: undefined},
                    ],
                    color: 'grey'
                },
            },
            show_nav: false,
            scroll: {
                progress: 0,
                progress_bottom: 0,
                now: 0,
                length: 0,
                height: 0
            },
            hide: [],
            goto: useGoTo(),
            show_top: false
        }
    },
    mounted() {
        M.AutoInit();
        window.addEventListener('scroll', this.update_scroll);
        this.hide = new Array(this.f.length);
        this.init_top();
    },
    methods: {
        init_subnav() {
            for(var i in this.f) {
                let j = this.f[i];j;
                // console.log(`#title-button-${i}`);
                // console.log($(`#title-button-${i}`).first().position().left);
                $(`#title-${i}`).css({
                    right: window.innerWidth - ($(`#title-button-${i}`).first().position().left + $(`#title-button-${i}`).first().innerWidth())
                });
            }
        },
        title(x) {
            while(x.indexOf('-') != -1) x = x.replace('-', ' ');
            var f = [];
            for(var i of x.split(' ')) {
                f.push(i[0].toUpperCase() + i.substr(1).toLowerCase());
            }
            return (f.join(' '));
        },
        update_scroll() {
            this.scroll.length = document.body.clientHeight;
            this.scroll.height = window.innerHeight;
            this.scroll.now = window.scrollY;
            this.scroll.progress = this.scroll.now / this.scroll.length * 100 + this.scroll.height * this.scroll.now / ((this.scroll.length - this.scroll.height) * this.scroll.length) * 100;
            // this.scroll.progress_bottom = (this.scroll.now + this.scroll.height) / this.scroll.length * 100;
        },
        show_subnav() {
            var now = ($('#menu').first().position());
            var x = now.top;
            var y = now.left;
            x += ($('#menu').first().height());
            //console.log(`${x} ${y}`);
            console.log(now);
            if(!$('#menu').first().is('sponsor')){
            $('.subnav').first().css({top: x, left: y, 'z-index': 1000});
            $('.subnav').show();
            }
        },
        hide_subnav() {
            $('.subnav').hide();
        },
        init_top() {
            addEventListener('scroll', () => {
                this.show_top = window.scrollY >= 100;
            })
        },
        real_goto(x) {
            animate('#gotop', {
                y: '-30rem',
                opacity: 0,
                duration: 300
            })
            this.goto(x)
        },
        hp(x) {
            if(x.indexOf('hp_') == 0) return x.substr(3);
            return x;
        }
    }
}
</script>

<style scoped>
* {
    transition: all 0.3s;
}
.bold {
  font-weight: 700;
}
a.unfocused, a.unfocused:visited, a.unfocused:hover, a.unfocused:active {
    color: inherit;
}
.block {
    background-color: rgba(255, 255, 255, .7);
    text-decoration: none;
    color: black;
    transition: 1s all;
    /* display: flex; */
    padding: 10px;
    font-size: large;
    font-weight: 900;
    backdrop-filter: blur(25px);
    /* position: sticky; */
    /* top: 10px; */
    left: 0px;
    z-index: 100;
    width: calc(100vw - 15px * 2);
    border-radius: 10px;
    margin: 15px;
    padding: 15px;
}
v-btn:hover {
    text-align: center;
}
@keyframes test {
    25% {
        left: calc(50vw - 100px);
        height: 200px;
        width: 200px;
        border-radius: 100%;
        font-size: 0px;
    }
    50% {
        top: calc(50vh - 100px);
    }
    100% {
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        border-radius: 0px;
        font-size: normal;
        /* opacity: 70%; */
    }
}
.tmp {
    /* animation-name: test;
    animation-fill-mode: backwards;
    animation-duration: 2s; */
    /* animation: test 2s ease 0s 1 alternate backwards; */

    width: 100vw;
    height: 100vh;
    border-radius: 0px;
    margin: 0px;
    padding: 20px;
    background-color: rgba(255, 255, 255, .3);
    text-decoration: none;
    font-weight: 900;
    backdrop-filter: blur(50px);
}
navi>a:hover {
    height: 100%;
    background-color: grey;
    border-radius: 10px;
}
.title_img {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
}
.subnav {
    position: fixed;
    top: 500px;
    background-color: grey;
    border-radius: 10px;
    padding: 10px;
    /* filter: blur(10px); */
    opacity: 70%;
}

.film_ani {
    animation: film 5s ease 0s;
}
@keyframes film {
    0% {
        color: orange;
    }
    25% {
        color: red;
    }
    50% {
        color: blue;
    }
    75% {
        color: green;
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


.stroke {
    /* -webkit-text-stroke: .5px #efe4d1; */
    /* text-stroke: 1.5px #efe4d1; */
    text-shadow:
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
}
.title_showcase {
    position: fixed;
    /* top: 10px;
    left: 50px; */
    /* right: 1200px; */
    background-color: rgba(255, 255, 255, .75);
    backdrop-filter: blur(10px);
    z-index: 100;
}
.sticky {
    position: sticky;
    top: 10px;
}
.fixed {
    position: fixed;
    top: 0px;
}

.scale-enter-active, .scale-leave-active {
    transition: all 0.5s;
}
.scale-enter-from, .scale-leave-to {
    opacity: 0%;
    max-height: 0px;
    max-width: 0px;
}
.scale-enter-from, .scale-leave-to {
    opacity: 100%;
    max-height: 100vh;
    max-width: 100vw;
}
#expanded_phone {
    margin-top: 30px;
    height: calc(100vh - 30px);
}
#touch_swipe_guide {
    position: fixed;
    top: 80vh;
    left: 0px;
    width: 100vw;
    height: 10vh;
}
</style>