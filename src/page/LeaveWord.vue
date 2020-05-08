<template>
    <v-app>
        <v-card>
            <v-card-title >
                <v-btn small min-width="120" min-height="32" color="#FFAB91" @click="deleteLeaveWords" class="ml-10">批量删除
                </v-btn>
            </v-card-title>
            <v-divider/>
            <!--       表格      -->
            <el-table
                    ref="leaveWordTable"
                    :data="leaveWords"
                    tooltip-effect="dark"
                    style="width: 100%"
                    stripe
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="游客昵称"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.user.nickname }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="留言内容"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.leaveWord.leaveContent }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="留言时间"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.leaveWord.createDate }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="回复内容"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.leaveWord.replyContent }}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="回复时间"
                        min-width="120">
                    <template slot-scope="scope">{{ scope.row.leaveWord.updateDate }}</template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        min-width="200">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateLeaveWordById(scope.row)">
                            回复
                        </el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteLeaveWordById(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--      分页      -->
            <div class="block">
                <el-pagination
                        class="page"
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
        name: "leaveWord",
        data() {
            return {
                // 留言信息
                leaveWords: [],
                totalSize: 0,// 总条数
                //分页信息
                pageInfo: {
                    currentPage: 1, //当前页
                    rows: 10, //每页大小
                },
                multipleSelection: [], //存储表格多选信息
            }
        },
        mounted() { // 渲染后执行
            // 查询数据
            this.getLeaveWordData();
        },
        watch: {
            pageInfo: { // 监视pagination属性的变化
                deep: true, // deep为true，会监视pagination的属性及属性中的对象属性变化
                handler() {
                    // 变化后的回调函数，这里我们再次调用getDataFromServer即可
                    this.getLeaveWordData();
                }
            },
        },
        methods: {
            getLeaveWordData() { // 从服务的加载数的方法。
                // 发起请求
                this.$http.get("/leave-word/all", {
                    params: {
                        currentPage: this.pageInfo.currentPage,// 当前页
                        rows: this.pageInfo.rows,// 每页大小
                    }
                }).then(resp => { // 这里使用箭头函数
                    this.leaveWords = resp.data.items;
                    console.log(this.leaveWords)
                    this.totalSize = resp.data.total;
                })
            },
            //多选框事件
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.leaveWordTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.leaveWordTable.clearSelection();
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
            //表格多选事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删除一条留言
            deleteLeaveWordById(row) {
                this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    //点击确定按钮
                    //执行删除博客的方法
                    this.$http.delete("/leave-word/" + row.leaveWord.id
                    ).then(resp => {
                        // 查询数据
                        this.getLeaveWordData();
                        //回显消息
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        console.log(resp)
                    }).catch(error => {
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
            //批量删除博客类型
            deleteLeaveWords() {
                //博客的id数组
                let leaveWordIds = [];
                this.multipleSelection.forEach(leaveWord => {
                    leaveWordIds.push(leaveWord.leaveWord.id);
                    }
                );
                console.log(leaveWordIds)
                if (leaveWordIds.length !== 0) {
                    //点击确定按钮
                    //执行删除博客的方法
                    this.$confirm('此操作将永久批量删除这些留言, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.$http({
                            method:"post",
                            url:"/leave-word/ids",
                            dataType: "json",
                            data: JSON.stringify(leaveWordIds),
                            headers:{
                                'Content-Type':'application/json;charset=UTF-8',
                            }
                        }).then(resp => {
                            // 查询数据
                            this.getLeaveWordData();
                            //回显消息
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            console.log(resp)
                        }).catch(error => {
                                console.log(error);
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
                } else {
                    this.$message({
                        type: 'warn',
                        message: '请选择留言后，再批量删除'
                    });
                }

            },
            //修改一条博客类型
            updateLeaveWordById(row) {
                this.$prompt('请输入回复内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{2,50}$/,
                    inputErrorMessage: '留言类型格式不正确（请输入2-50个字符）',
                    inputValue: row.leaveWord.replyContent
                }).then(({value}) => {
                    //发送请求
                    this.$http({
                        method: 'put',
                        url: '/leave-word',
                        data: this.$qs.stringify({
                            id: row.leaveWord.id,
                            replyContent: value
                        })
                    }).then(resp => {
                        // 查询数据
                        this.getLeaveWordData();
                        //回显消息
                        this.$message({
                            type: 'success',
                            message: '修改留言成功',
                        });
                        console.log(resp)
                    }).catch(error => {
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
        }
    }
</script>
<style scoped>
    .page {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
</style>
