<template>
    <v-app>
        <div><h1>回收站</h1></div>
        <div class="mavonEditor">
            <mavon-editor
                    v-html="blogContentHtml"
            />
        </div>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                blogContentHtml: '', //查到的所有的博客类型
            };
        },
        methods: {
            getBlogById() {
                this.$http.get("/blog/26"
                ).then(data => { // 这里使用箭头函数
                    console.log(data);
                    this.blogContentHtml = data.data.blog.contentHtml;
                })
            }
        },
        mounted() {
            this.getBlogById();
        }
    }
</script>
<style scoped>

</style>
