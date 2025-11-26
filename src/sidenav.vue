<template>
    <div style = 'position: fixed' class = 'ma-5' v-if = '$vuetify.display.mdAndUp' >
        <!-- {{ scroller.now }} -->
          <!-- <b class = stroke>1</b> -->
        <v-hover>
            <template v-slot:default = '{isHovering, props}'>
                <v-card min-width = '20vw' prepend-avatar = Logo/logo.png class = 'sdv'>
                    <template v-slot:title>
                        <div v-bind = props>
                            <!-- {{ isHovering ? `< Back` : `Navigation` }} -->
                            <a href = '.' v-text = '`< Back`' v-if = isHovering></a>
                            <b v-else> Navigation </b>
                        </div>
                    </template>
                    <template v-slot:subtitle>
                        <a href = '.' v-if = isHovering> Click to return to Homepage </a>
                        <b v-else> {{ name }} </b>
                    </template>
                    <template v-slot:text>
                        <!-- Place holder -->
                         <!-- {{ this.scroller.name[this.scroller.now] }} -->
                         <!-- {{ this.scroller.now }} -->
                         <!-- {{ this.scroller.ns == -1 ? '' : this.scroller.subtitles[this.scroller.now][this.scroller.ns] }} -->
                        <v-list v-model:opened = 'open_controller'>
                            <template v-for = 'i, j in scroller.name' :key = i>
                                <v-list-group
                                    :value = 'i'
                                    v-if = 'scroller.subtitles[j].length != 0'
                                >
                                <!-- {{ i }} -->
                                    <template #activator = '{props}'>
                                        <!-- <a :href = '`#${i}`'> -->
                                        <v-list-item v-bind = props @click = 'goto(`#${i}`)' prepend-icon = 'fa-solid fa-star'>
                                                <!-- <b> {{ tmp[j] }} {{ j }} {{ j == this.scroller.now }} </b> -->
                                            <b class = 'text-primary'> {{ title(i) }} </b>
                                        </v-list-item>
                                        <!-- </a> -->
                                    </template>
                                    <v-list-item v-for = 'k in scroller.subtitles[j]' :value = k :key = k @click = 'goto(`#${k}`)'>
                                        <b class = 'text-primary'> <a> {{ title(k) }} </a> </b>
                                    </v-list-item>
                                </v-list-group>
                                <v-list-item :value = i  @click = 'goto(`#${i}`)' class = 'text-primary' prepend-icon = 'fa-solid fa-star' v-else> <b> {{ title(i) }} </b> </v-list-item>
                            </template>
                        </v-list>
                    </template>
                </v-card>
            </template>
        </v-hover>
    </div>
</template>

<script>
 /* eslint-disable */ 
import $ from 'jquery'
import M from 'materialize-css'

import { useGoTo } from 'vuetify/lib/composables/goto'

export default {
    name: 'sidenav',
    data() {
        return {
            tmp: [false, false, false, false],
            scroller: {
                now: 0,
                ns: -1,
                name: [],
                subtitles: []
            },
            goTo: useGoTo(),
            open_controller: ['Screening']
        }
    },
    props: {
        name: ''
    },
    mounted() {
        M.AutoInit();
        this.scroller.name = $('.scroller');

        this.init_scroller();
        setInterval(() => {
            console.log(this.tmp);
        }, 3000);
    },
    methods: {
        title(x) {
            while(x.indexOf('-') != -1) x = x.replace('-', ' ');
            while(x[0] == ' ') x = x.substr(1);
            while(x[x.length - 1] == ' ') x = x.substr(0, x.length - 1);
            var f = [];
            for(var i of x.split(' ')) {
                f.push(i[0].toUpperCase() + i.substr(1).toLowerCase());
            }
            return (f.join(' '));
        },
        init_scroller() {
            this.scroller.name = ($('.scroller').map(function(index) {
                return this.id;
            }).get());
            
            for(var i of this.scroller.name) {
                // console.log(i);
                this.scroller.subtitles.push($(`#${i}`).find('.subtitle').map(function(index) {
                    return (this.id);
                }).get());
            }
            // console.log(this.scroller.subtitles);
            window.addEventListener('scroll', () => {
                var now = window.scrollY + 200;
                var overed = (x) => {
                    if($(`#${x}`).first().position() == undefined) console.log(`ERROR -> ${x}`);
                    return $(`#${x}`).first().position().top < now;
                };
                var latest = (x) => {
                    if((x || []).length == 0) return -1;
                    var order = 0;
                    for(var i in x) {
                        if(overed(x[i])) order = i;
                    }
                    return order;
                }

                var order = latest(this.scroller.name);

                // console.log(this.scroller.ns);
                this.scroller.ns = latest(this.scroller.subtitles[order]);

                this.scroller.now = order;
                this.tmp = this.scroller.name.map((_, j) => (this.scroller.now == j));

                this.open_controller = [this.scroller.name[this.scroller.now]];
            });
        },
        goto(x) {
            // M.toast({html: `going to ${x}`, classes: 'amber rounded'});
            this.goTo(x, {
                container: 'html',
                duration: 300,
                easing: 'easeInOutCubic',
                offset: -100
            });
        }
    }
}
</script>

<style scoped>
.stroke {
    -webkit-text-stroke: .5px #efe4d1;
    text-stroke: 1.5px #efe4d1;
    text-shadow:
        -1px -1px 0 #fff,
        1px -1px 0 #fff,
        -1px 1px 0 #fff,
        1px 1px 0 #fff;
}
.sdv {
    margin: 0px !important;
    padding: 10px !important;
}
</style>