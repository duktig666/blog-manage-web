<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>个人博客后台管理</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <!-- 表单   -->
                                <v-form
                                        ref="form"
                                        lazy-validation
                                        v-model="valid"
                                >
                                    <v-text-field
                                            prepend-icon="fa-user"
                                            v-model="username"
                                            label="用户名"
                                            type="text"
                                            :rules="nameRules"
                                            required
                                    />
                                    <v-text-field
                                            ref="password"
                                            prepend-icon="fa-lock"
                                            v-model="password"
                                            label="密码"
                                            id="password"
                                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                            :type="e1 ? 'text' : 'password'"
                                            @click:append="e1 = !e1"
                                            :rules="passwordRules"
                                            required
                                    />
                                        <v-row no-gutters>
                                            <v-col cols="8">
                                                <v-text-field
                                                    prepend-icon="fas fa-check-square"
                                                    v-model="code"
                                                    label="验证码"
                                                    type="text"
                                                    :rules="codeRules"
                                                    required
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-container fluid fill-height>
                                                    <v-layout align-center justify-center>
                                                    <img src="../assets/code.png" alt="验证码"/>
                                                    </v-layout>
                                                </v-container>
                                            </v-col>
                                        </v-row>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="error" class="mr-4" @click="reset">重置</v-btn>
                                <v-btn color="primary" @click="doLogin">登录</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-dialog v-model="dialog" width="300px">
            <v-alert icon="warning" color="error" :value="true">
                用户名和密码不能为空
            </v-alert>
        </v-dialog>
    </v-app>
</template>

<script>

    export default {
        data: () => ({
            username: "",
            password: "",
            code:"",
            dialog: false,
            e1:false,
            valid: true,
            nameRules: [
                v => !!v || '用户名不能为空',
            ],
            passwordRules: [
                v => !!v || '密码不能为空',
            ],
            codeRules: [
                v => !!v || '验证码不能为空',
            ],
        }),
        methods: {
            reset () {
                //重置表单
                this.$refs.form.reset();
                //取消验证
                this.$refs.form.resetValidation();
            },
            doLogin() {
                //进行表单验证
                this.$refs.form.validate();
                //调用后台接口，如果登录成功，进行router跳转
                this.$http({
                    method: 'GET',
                    url:'/api/user/all',
                }).then(res => {
                    console.log(res)
                    if (res){
                        //跳转到首页
                        this.$router.push("/helloWorld")
                    }
                }).catch({

                });
            }
        }
    };
</script>
