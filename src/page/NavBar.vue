<template>
    <v-app :dark="dark">
        <v-row no-gutters>
            <!-- 左侧导航条 -->
            <v-col cols="2">
                <v-navigation-drawer
                    v-model="drawer"
                    :mini-variant="miniVariant"
                    persistent
                    enable-resize-watcher

                    dark
                    :color="dark ? 'secondary' : 'primary'"
            >
                    <v-list>
                        <v-list-item two-line :class="miniVariant && 'px-0'">
                            <v-list-item-avatar>
                                <img src="https://randomuser.me/api/portraits/men/81.jpg">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>个人博客后台管理系统</v-list-item-title>
                                <v-list-item-subtitle>任世伟&焦前进</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider></v-divider>
                        <v-list>
                            <v-list-group
                                    v-for="item in items"
                                    :key="item.title"
                                    v-model="item.active"
                                    :prepend-icon="item.action"
                                    no-action
                            >
                                <template slot="activator">
                                    <v-list-item :to="item.path">
                                        <v-list-item-content >
                                            <v-list-item-title v-text="item.title"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                <!-- 二级菜单 -->
                                <v-list-item
                                        v-for="subItem in item.items"
                                        :key="subItem.title"
                                        :to="item.path + subItem.path">
                                    <v-list-item-action>
                                        <v-icon>{{ subItem.action }}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content class="ml-2">
                                        <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-list>
            </v-navigation-drawer>
            </v-col>
            <v-col cols="10">
                <!-- 顶部工具条 -->
                <v-toolbar
                        dark
                        :mini-variant="miniVariant"
                        :color="dark ? 'secondary' : 'primary'"
                >
                    <!-- 隐藏左侧菜单的按钮-->
                    <v-btn icon @click.stop="drawer = !drawer">
                        <v-icon>fas fa-list</v-icon>
                    </v-btn>
                    <!-- 收起左侧菜单的按钮-->
                    <v-btn icon @click.stop="miniVariant = !miniVariant" @click="width=1380">
                        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"  />
                    </v-btn>
                    <!-- 切换黑暗主题 -->
                    <v-flex xs1>
                        <v-switch
                                :label="dark ? '暗黑' : '明亮'"
                                v-model="dark"
                                color="dark"
                                hide-details
                        />
                    </v-flex>
                    <!-- 顶部导航标题 -->
                    <v-flex xs3></v-flex>
                    <v-toolbar-title v-text="title"/>
                    <v-spacer/>

                    <!-- 调色板 -->
                    <v-btn icon>
                        <v-icon>invert_colors</v-icon>
                    </v-btn>
                    <!-- 顶部导航用户菜单 -->
                    <v-btn icon>
                        <v-icon>account_box</v-icon>
                    </v-btn>
                </v-toolbar>

                <!--中间内容主体-->
                <v-content>
<!--                    <v-breadcrumbs>-->
<!--                        <v-icon slot="divider">chevron_right</v-icon>-->
<!--                        <v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>-->
<!--                        <v-breadcrumbs-item>{{item2}}</v-breadcrumbs-item>-->
<!--                    </v-breadcrumbs>-->
                    <div>
                        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
                        <router-view/>
                    </div>
                </v-content>
            </v-col>
        </v-row>
    </v-app>

</template>
<script>
    import menus from "../menu";
    export default {
        data() {
            return {
                dark: true,// 是否暗黑主题
                drawer: true,// 左侧导航是否隐藏
                miniVariant: false,// 左侧导航是否收起
                title: '个人博客后台管理',// 顶部导航条名称,
                menuMap: {},
            }
        },
        computed: {
            items() {
                return menus;
            },
        },
        name: 'App',
        watch: {},
    }
</script>
<style scoped>
    .box {
        width: 90%;
    }
</style>
