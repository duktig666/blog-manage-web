<template>
    <v-app>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-titletitle>个人博客后台管理</v-toolbar-titletitle>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <!-- 表单   -->
                                <v-form
                                        ref="form"
                                        v-model="valid"
                                        lazy-validation>
                                    <v-text-field prepend-icon="person"  v-model="username" label="用户名" type="text"/>
                                    <v-text-field
                                            ref="password"
                                            prepend-icon="lock"
                                            v-model="password"
                                            label="密码"
                                            id="password"
                                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                            :append-icon-cb="() => (e1 = !e1)"
                                            :type="e1 ? 'text' : 'password'"
                                    ></v-text-field>
                                        <v-row no-gutters>
                                            <v-col cols="8">
                                                <v-text-field
                                                    prepend-icon="code"
                                                    v-model="code"
                                                    label="验证码"
                                                    type="text">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-container fluid fill-height>
                                                    <v-layout align-center justify-center>
                                                    <img src="../assets/code.png"/>
                                                    </v-layout>
                                                </v-container>
                                            </v-col>
                                        </v-row>
<!--                                    <v-content class="d-inline-block">-->


<!--                                    </v-content>-->
<!--                                    <v-content class="d-inline-block ">-->
<!--                                        <img src="../assets/code.png"/>-->
<!--                                    </v-content>-->

                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="error"
                                        class="mr-4"
                                        @click="reset"
                                >
                                    重置
                                </v-btn>
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
            dialog: false,
            e1:false
        }),
        methods: {
            reset () {
                this.$refs.form.reset()
            },
            doLogin() {
                if (!this.username || !this.password) {
                    this.dialog = true;
                    return false;
                }
                console.log(this.username + " ... " + this.password);
                this.$router.push("/");
            }
        }
    };
</script>
