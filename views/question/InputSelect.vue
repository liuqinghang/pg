<template>
    <div>
<!--  <select v-model="res" @change="retRes(res)" style="width: 100%">-->
<!--    <option-->
<!--      v-for="item in infos"-->
<!--      :key="item.selectKey"-->
<!--      :label="item.selectLabel"-->
<!--      :value="item.selectValue"-->
<!--    >-->
<!--    </option>-->
<!--  </select>-->
    <el-select v-model="res" filterable placeholder="Select">
        <el-option
            v-for="item in infos"
            :key="item.selectKey"
            :label="item.selectLabel"
            :value="item.selectValue"/>
    </el-select>
    </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: {
    info: [],
    method: {
        type: [String, Number],
        default: ''
    }
  },
  data: function () {
    return {
        infos: [],
      res: ''
    }
  },
  beforeCreate () {
    console.log()
  },
  created: function () {
  },
  methods: {
    retRes (res) {
      console.log('调用返回2')
      this.$emit(this.method, res)
    },
    updateInfo (info) {
      this.infos = info
    },
    resetChoosed () {
      this.res = ''
    }
  },
  // 组件初始化时 加载数据
  mounted () {
      this.infos = this.info
  }
}
</script>
