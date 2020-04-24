<template>
    <v-app>
        <v-card>
            <v-card-title>
                <!--搜索框，与search属性关联-->
                <v-flex xs3>
                    <v-text-field label="输入关键字搜索" v-model.lazy="search" append-icon="search" hide-details/>
                </v-flex>
                <v-btn color="primary" class="ml-5">搜索</v-btn>
                <v-btn color="primary" class="ml-5">重置</v-btn>
                <v-btn color="primary" class="ml-5">批量删除</v-btn>
            </v-card-title>
            <v-divider/>
            <v-data-table
                    :headers="headers"
                    :items="blogs"
                    :server-items-length="totalBrands"
                    :options.sync="options"
                    :loading="loading"
                    class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.id }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.type }}</td>
                    <td class="text-xs-center">{{ props.item.label }}</td>
                    <td class="text-xs-center">{{ props.item.date }}</td>
                    <td class="justify-center layout px-0">
                        <v-btn icon>
                            <i class="el-icon-edit"/>
                        </v-btn>
                        <v-btn icon>
                            <i class="el-icon-delete"/>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>

        </v-card>
    </v-app>
</template>
<script>
    export default {
        name: "manage",
        data() {
            return {
                search: '', // 搜索过滤字段
                loading: true, // 是否在加载中
                totalBrands: 0, // 总条数
                options: {}, // 分页信息
                // 当前页博客信息
                blogs: [],
                headers: [
                    {text: 'id', align: 'center', value: 'id'},
                    {text: '标题', align: 'center', sortable: false, value: 'title'},
                    {text: '类别', align: 'center', sortable: false, value: 'type'},
                    {text: '标签', align: 'center', sortable: false, value: 'label'},
                    {text: '发布日期', align: 'center', sortable: true,value: 'update_date', },
                    {text: '操作', align: 'center',sortable: false, value: 'work', }
                ],
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getDataFromServer();
        },
        watch: {
            pagination: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getDataFromServer();
                }
            },
            search: { // 监视搜索字段
                handler() {
                    this.getDataFromServer();
                }
            }
        },
        method: {
           getDataFromServer() { // 从服务的加载数的方法。
                // 发起请求
                this.$http.get("/blog/5", {
                    // params: {
                    //     currentPage: this.pagination.page,// 当前页
                    //     rows: this.pagination.rowsPerPage,// 每页大小
                    //     sort: null,// 排序字段
                    //     blogDimSearchStr: this.search, // 博客模糊查询所需数据
                    // }
                }).then(resp => { // 这里使用箭头函数
                    console.log(resp);
                    // this.blogs = resp.data.items;
                    // this.totalBrands = resp.data.total;
                    // 完成赋值后，把加载状态赋值为false
                    this.loading = false;
                })
            },
        }
    }
</script>
<style scoped>

</style>
