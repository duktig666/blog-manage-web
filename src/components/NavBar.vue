<template>
    <v-app :dark="dark">
        <v-row no-gutters>
            <!-- 左侧导航条 -->
            <v-col cols="2">
                <v-navigation-drawer
                    v-model="drawer"
                    :expand-on-hover="expandOnHover"
                    :mini-variant="miniVariant"
                    :right="right"
                    :src="bg"
                    absolute
                    dark
                    :color="dark ? 'secondary' : 'primary'"
            >
                <v-list
                        dense
                        nav
                        class="py-0"
                >
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

                    <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            </v-col>
            <v-col cols="10">
                 <!-- 顶部工具条 -->
                <v-toolbar
                        app
                        dark
                        :color="dark ? 'secondary' : 'primary'"
                >
                    <!-- 隐藏左侧菜单的按钮-->
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
                    <!-- 收起左侧菜单的按钮-->
                    <v-btn icon @click.stop="miniVariant = !miniVariant">
                        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
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
                    <v-btn icon @click.stop="dark = !dark">
                        <v-icon>invert_colors</v-icon>
                    </v-btn>
                    <!-- 顶部导航用户菜单 -->
                    <v-btn icon @click.stop="dark = !dark">
                        <v-icon>account_box</v-icon>
                    </v-btn>
                </v-toolbar>
                <!--中间内容主体-->
                <v-content>

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
                dark: false,// 是否暗黑主题
                drawer: true,// 左侧导航是否隐藏
                miniVariant: false,// 左侧导航是否收起
                title: '个人博客后台管理',// 顶部导航条名称,
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
</style>
