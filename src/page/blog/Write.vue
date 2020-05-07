<template>
    <v-app>
        <div class="mavonEditor">
            <mavon-editor v-model="blogMarkDown"/>
        </div>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                blogMarkDown: ""
            };
        },
    }
</script>
<style scoped>
    .mavonEditor {
        width: 100%;
        height: 100%;
    }
</style>
