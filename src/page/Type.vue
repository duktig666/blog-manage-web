<template>
    <v-app>
        <v-card>
            <v-card-title>
                <v-btn small min-width="120" min-height="32" color="orange" @click="saveType">添加</v-btn>
                <v-btn small min-width="120" min-height="32" color="#FFAB91">批量删除</v-btn>
            </v-card-title>
            <v-divider/>
            <!--       表格      -->
            <el-table
                    ref="typeTable"
                    :data="types"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
            >
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="博客类型"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.type }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="创建时间"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.createDate }}</template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        min-width="200">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTypeById(scope.row)">
                            修改
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTypeById(scope.row)">
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
        name: "type",
        data() {
            return {
                loading: true, // 是否在加载中
                // 当前页博客类型信息
                types: [],
                totalSize: 0,// 总条数
                //分页信息
                pageInfo: {
                    currentPage: 1, //当前页
                    rows: 10, //每页大小
                },
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getTypesData();
        },
        watch: {
            pageInfo: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getTypesData();
                }
            },
        },
        methods: {
            getTypesData() { // 从服务的加载数的方法。
                // 发起请求
                this.$http.get("/blog-type/all", {
                    params: {
                        currentPage: this.pageInfo.currentPage,// 当前页
                        rows: this.pageInfo.rows,// 每页大小
                    }
                }).then(resp => { // 这里使用箭头函数
                    console.log(resp);
                    this.types = resp.data.items;
                    this.totalSize = resp.data.total;
                    //完成赋值后，把加载状态赋值为false
                    this.loading = false;
                })
            },
            //多选框事件
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.typeTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.typeTable.clearSelection();
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
            //新增博客类型
            saveType() {
                this.$prompt('请输入博客类型', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{2,10}$/,
                    inputErrorMessage: '博客类型格式不正确（请输入2-10个字符）'
                }).then(({value}) => {
                    //发送请求
                    this.$http.post("/blog-type", this.$qs.stringify({
                            'type': value
                        })
                    ).then(resp => {
                        // 查询数据
                        this.getTypesData();
                        //回显消息
                        this.$message({
                            type: 'success',
                            message: '新增博客类型成功，博客类型: ' + value
                        });
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
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //删除一条博客类型
            deleteTypeById(row) {
                console.log(row)
                this.$confirm('此操作将永久删除该博客类型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    //点击确定按钮
                    //执行删除博客的方法
                    this.$http.delete("/blog-type/" + row.id
                    ).then(resp => {
                        // 查询数据
                        this.getTypesData();
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
            //修改一条博客类型
            updateTypeById(row) {
                console.log(row)
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
