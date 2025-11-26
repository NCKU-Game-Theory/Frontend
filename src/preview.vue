<template>
    <v-dialog v-model = preview max-width="90vw">
        <v-card justify = center>
            <v-img class = "preview mx-auto"
            :src = now_image
            contain
            max-height = 80vh
            width = auto
            />
        </v-card>
    </v-dialog>
</template>

<script>
// import $ from 'jquery'
import M from 'materialize-css'
import $ from 'jquery'

export default {
    name: 'image_previewer',
    data() {
        return {
            preview: false,
            now_image: ''
        }
    },
    mounted() {
        M.AutoInit();
        addEventListener('scroll', () => {
            // $('img').map((a, b) => {console.log(b.getAttribute('src'))});
            $('.preview img').map((a, b) => {
                // console.log(b.getAttribute('listener'));
                // if(!b.getAttribute('listener')) return;

                b.addEventListener('click', () => {
                    // console.log(b.getAttribute('src'));
                    if(this.preview) return;
                    this.now_image = b.getAttribute('src');
                    this.preview = true;
                });
            });
        });
    }
}
</script>

<style>
</style>