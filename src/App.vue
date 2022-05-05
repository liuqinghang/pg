<template>
    <div class="common-layout">
        <el-container style="height: 100%">
            <el-aside width="auto">
            </el-aside>
            <el-container>
                <el-header>
                    <CommonAside></CommonAside>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from "../views/common/CommonAside";
export default {
  name: 'App',
  components: {
      CommonAside
  },
    methods:{

    }
}
</script>

<style lang="less" scoped>



.el-header{
  background: #5cee9d;
}
.el-mian{
  padding: 0;
}
</style>
