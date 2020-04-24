<template>
    <v-app>
        <div><h1>我是类别</h1></div>
        <v-row>
            <v-col cols="2" offset="1">
                <v-btn small min-width="120" min-height="32" color="orange">添加</v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn small min-width="120" min-height="32" color="#FFAB91">批量删除</v-btn>
            </v-col>
        </v-row>
        <!--博客类别表格展示信息-->
        <div>
            <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :options.sync="options"
                    :server-items-length="totalDesserts"
                    :loading="loading"
                    class="elevation-1"
            />
        </div>

    </v-app>
</template>
<script>
    export default {

    }
</script>
<style scoped>

</style>
