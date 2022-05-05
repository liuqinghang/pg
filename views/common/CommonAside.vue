<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
    >
        <el-menu-item index="1">
            <router-link :to="{name:'view'}">试题查询</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link :to="{name:'save'}">试题录入</router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link :to="{name:'autogenerate'}">智能组卷</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link :to="{name:'manualgenerate'}">手动组卷</router-link>
        </el-menu-item>
        <el-menu-item index="5">
            <router-link :to="{name:'my'}">我的</router-link>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>

</style>
