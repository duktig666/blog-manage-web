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
                                                    :rules="[codeRules]"
                                                    required
                                            >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <!--                                            <v-container fluid fill-height>-->
                                            <v-layout align-center justify-center>
                                                <!--    图片验证码    -->
                                                <div @click="refreshCode">
                                                    <identify-code
                                                            :identifyCode="identifyCode"
                                                            :contentWidth="150"
                                                            :contentHeight="50"
                                                            :fontSizeMin="50"
                                                    />
                                                </div>
                                            </v-layout>
                                            <!--                                            </v-container>-->
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
    import IdentifyCode from '../components/IdentifyCode'

    export default {
        name: 'login',
        components: {
            'identify-code': IdentifyCode,
        },
        data: () => ({
            username: "",
            password: "",
            code: "",
            dialog: false,
            e1: false,
            valid: true,
            identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
            identifyCode: "",
            isSuccessCode: false,
            nameRules: [
                v => !!v || '用户名不能为空',
            ],
            passwordRules: [
                v => !!v || '密码不能为空',
            ],
        }),
        methods: {
            reset() {
                //重置表单
                this.$refs.form.reset();
                //取消验证
                this.$refs.form.resetValidation();
            },
            doLogin() {
                //进行表单验证
                this.$refs.form.validate();
                this.$router.push("/navBar")
                //调用后台接口，如果登录成功，进行router跳转
                this.$http({
                    method: 'GET',
                    url: '/user/all',
                }).then(res => {
                    console.log(res)
                    if (res) {
                        //跳转到首页
                        this.$router.push("/navBar")
                    }
                }).catch({});
            },
            //图片验证规则校验
            codeRules(value) {
                if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                    return "验证码输入不正确";
                } else if (value.length === 0) {
                    return "验证码不能为空";
                } else {
                    return true;
                }
            },
            //生成随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            //刷新验证码
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            //生成验证码
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
    };
</script>
