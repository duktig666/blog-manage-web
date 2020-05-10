<template>
    <v-app>
        <!--    写博客的功能区    -->
        <div class="blog-top">
            <el-button id="publish-blog" @click="publishBlog">发布博客</el-button>
            <p>博客标题</p>
            <el-input
                    placeholder="请输入内容"
                    v-model="blogTitle"
                    clearable
                    class="el-input"
                    maxlength="50"
                    show-word-limit
                    autofocus
                    name="title"
                    type="text"
            >
            </el-input>
            <p>博客摘要</p>
            <el-input
                    type="textarea"
                    :rows="2"
                    autosize
                    placeholder="请输入内容"
                    v-model="blogSummary"
                    clearable
                    class="el-input"
                    maxlength="256"
                    show-word-limit
                    name="summary"
            >
            </el-input>
        </div>
        <!--    markdown组件    -->
        <div class="mavonEditor">
            <mavon-editor
                    v-model="blogMarkDownContent"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"
            />
        </div>
        <!--    点击发布博客触发的对话框    -->
        <el-dialog title="发布博客" :visible.sync="dialogSaveBlog">
            <el-form>
                <el-form-item label="博客类型">
                    <el-select v-model="blogTypeId" clearable placeholder="请选择">
                        <el-option
                                v-for="blogType in blogTypeAll"
                                :key="blogType.id"
                                :label="blogType.type"
                                :value="blogType.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="博客标签">
                    <el-checkbox-group v-model="blogLabelIds" size="mini">
                        <el-checkbox
                                v-for="blogLabel in blogLabelAll"
                                :key="blogLabel.id"
                                :label="blogLabel.id"
                                :value="blogLabel.id"
                                border
                                min="1"
                                max="6"
                        >{{blogLabel.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSaveBlog = false">取 消</el-button>
                <el-button type="primary" @click="saveBlog">确 定</el-button>
            </div>
        </el-dialog>

    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                blogTypeAll: [], //查到的所有的博客类型
                blogLabelAll: [], //查到的所有的博客标签
                blogTitle: '',  //博客标题
                blogSummary: '', //博客摘要
                blogMarkDownContent: "",//博客正文
                blogTypeId: '', //博客类型id
                blogLabelIds: [], //博客标签id
                dialogSaveBlog: false, //对话框默认不显示
                imgFile: [],  //markdown上传的图片信息
            };
        },
        methods: {
            //查询所有的博客类型
            getBlogTypeAll() {
                this.$http.get("/blog-type/all").then(resp => {
                    this.blogTypeAll = resp.data.items;
                })
            },
            //查看所有的博客标签
            getBlogLabelAll() {
                this.$http.get("/blog-label/all").then(resp => {
                    this.blogLabelAll = resp.data.items;
                })
            },
            //保存博客
            saveBlog() {
                this.$confirm('保存当前博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: "post",
                        url: "/blog",
                        data: {
                            blog: {
                                title: this.blogTitle,
                                summary: this.blogSummary,
                                content: this.blogMarkDownContent,
                                contentHtml: this.$refs.md.d_render,
                                typeId: this.blogTypeId,
                            },
                            blogLabelIds: this.blogLabelIds,
                        },
                    }).then(resp => {
                        //关闭对话框
                        this.dialogSaveBlog = false;
                        //回显消息
                        this.$message({
                            type: 'success',
                            message: '新增博客成功，博客: ' + this.blogTitle
                        });
                        //清空所输入的内容
                        this.clear();
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
                        message: '已取消保存此博客'
                    });
                });
            },
            //点击发布博客触发的事件
            publishBlog() {
                this.dialogSaveBlog = true;
                //查询所有博客类型
                this.getBlogTypeAll();
                //查询所有博客标签
                this.getBlogLabelAll();
            },
            //markdown的图片上传
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                let formData = new FormData();
                formData.append('file', $file);
                this.imgFile[pos] = $file;
                this.$http({
                    url: '/file/upload/',
                    method: 'post',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    this.$refs.md.$img2Url(pos, res.data);
                })
            },
            //markdown的图片删除
            $imgDel(pos) {
                delete this.imgFile[pos];
            },
            //发布博客成功，清空所有输入框的值为空
            clear() {
                this.blogTitle = "";
                this.blogSummary = "";
                this.blogMarkDownContent = "";
                this.blogTypeId = '';
                this.blogLabelIds = [];
            },
        },
    }
</script>
<style scoped>
    .mavonEditor {
        width: 100%;
        height: 100%;
    }

    .blog-top {
        padding: 30px 20px;
    }

    .el-input {
        margin-bottom: 16px;
    }

    #publish-blog {
        background-color: #ca0c16;
        color: #fff;
        margin-bottom: 16px;
        margin-left: 92%;
    }
</style>
