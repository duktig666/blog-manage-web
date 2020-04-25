<template>
    <v-app>
        <v-card>
            <v-card-title>
                <!--搜索框，与search属性关联-->
                <v-flex xs3>
                    <v-text-field id="search" label="输入关键字搜索" v-model.lazy="search" append-icon="search" hide-details/>
                </v-flex>
                <v-btn color="primary" class="ml-5" @click="getBlogsData">搜索</v-btn>
                <v-btn color="primary" class="ml-5" @click="reset">重置</v-btn>
                <v-btn color="primary" class="ml-5">批量删除</v-btn>
            </v-card-title>
            <v-divider/>
            <!--       表格      -->
            <el-table
                    ref="blogTable"
                    :data="blogs"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @sort-change="sortBlog"
                    @row-click="clickRow"
            >
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="标题"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.blog.title }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="类型"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.blogType.type }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="标签"
                        min-width="120">
                    <template slot-scope="scope">
                        <div v-for="labelList in scope.row.blogLabelList">
                            {{ labelList.label }}
                        </div>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="发布日期"
                        min-width="120"
                        sortable="custom"
                        prop="create_date"
                >
                    <template slot-scope="scope">{{ scope.row.blog.createDate }}</template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        min-width="200">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateBlogById(scope.row)">
                            修改
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBlogById(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--      分页      -->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page="pageInfo.currentPage"
                        :page-sizes="[1,10, 15, 20, 50,100]"
                        :page-size="pageInfo.rows"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize">
                </el-pagination>
            </div>

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
                // 当前页博客信息
                blogs: [],
                totalSize: 0,// 总条数
                //分页信息
                pageInfo: {
                    currentPage: 1, //当前页
                    rows: 10, //每页大小
                    sort: "", //排序方式
                },
                rowInfo: "",
                columnInfo: "",
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getBlogsData();
        },
        watch: {
            pageInfo: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getBlogsData();
                }
            },
        },
        methods: {
            getBlogsData() { // 从服务的加载数的方法。
                // 发起请求
                this.$http.get("/blog/all", {
                    params: {
                        currentPage: this.pageInfo.currentPage,// 当前页
                        rows: this.pageInfo.rows,// 每页大小
                        sort: this.pageInfo.sort,// 排序字段
                        blogDimSearchStr: this.search, // 博客模糊查询所需数据
                    }
                }).then(resp => { // 这里使用箭头函数
                    console.log(resp);
                    this.blogs = resp.data.items;
                    this.totalSize = resp.data.total;
                    //完成赋值后，把加载状态赋值为false
                    this.loading = false;
                })
            },
            //获得排序信息
            sortBlog(val) {
                if (val.order === "descending") {
                    this.pageInfo.sort = val.prop + " DESC";
                } else if (val.order === "ascending") {
                    this.pageInfo.sort = val.prop + " ASC";
                }
            },
            //重置按钮执行事件
            reset() {
                //清除多选
                this.$refs.blogTable.clearSelection();
                //清除默认的排序方式
                this.$refs.blogTable.clearSort();
                //清空搜索框内容
                this.search = "";
            },
            //多选框事件
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.blogTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.blogTable.clearSelection();
                }
            },
            //当前条数改变
            handleSizeChange(val) {
                this.pageInfo.rows = val;
            },
            //当前页改变
            handleCurrentChange(val) {
                this.pageInfo.currentPage = val;
            },
            //表格行背点击执行的事件
            clickRow(row, column, event) {
                this.rowInfo = row;
                return row;
            },
            //删除一篇博客
            deleteBlogById(row) {
                console.log(row)
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    //点击确定按钮
                    //执行删除博客的方法
                    this.$http.delete("/blog/" + row.id
                    ).then(resp => {
                        // 查询数据
                        this.getBlogsData();
                        //回显消息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        console.log(resp)
                    }).catch(error => {
                        console.log(error.response);
                            this.$message({
                                type: 'error',
                                message: error.response.data.message,
                            })
                        }
                    );
                }).catch(() => {
                    //点击取消按钮
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改博客
            updateBlogById(row) {
                // this.$http({
                //     method: 'put',
                //     url: '/blog',
                //     data: this.$qs.stringify(row)
                // }).then(() => {
                //     // 关闭窗口
                //     this.$emit("close");
                //     this.$message.success("修改成功！");
                // })
                //     .catch(() => {
                //         this.$message.error("修改失败！");
                //     });
            },
        }
    }
</script>
<style scoped>

</style>
