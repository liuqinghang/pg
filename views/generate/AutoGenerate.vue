<template>
  <div>
    <div class="input-box">
    <div class="input-text">单选题数量</div>
      <div class="input-content">
        <input v-model="rule.singleNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.singleScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">多选题数量</div>
      <div class="input-content">
        <input v-model="rule.multiNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.multiScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">填空题数量</div>
      <div class="input-content">
        <input v-model="rule.completeNum">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.completeScore">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">简答题数量</div>
      <div class="input-content">
        <input v-model="rule.subjectiveNum" style="display: inline; width: fit-content">
      </div>
    </div>
    <div class="input-box">
      <div class="input-text">分值</div>
      <div class="input-content">
        <input v-model="rule.subjectiveScore">
      </div>
    </div>
    <div class="input-text">试题期望难度</div>
    <div class="input-content">
      <input v-model="rule.difficulty">
    </div>
    <button @click="getSmartPaper">自动组卷</button>
    <button @click="jump2Preview">试卷预览</button>
      <button @click="manualGenerate">调整试卷</button>
      <button @click="savePaper">保存试卷信息</button>
<!--    <div v-if="this.das.length > 0" style="padding: 5px; border: solid; border-radius: 5px">-->
<!--      <table v-for="(item,index) in this.das" :item="item" :key="index">-->
<!--        <tr>-->
<!--          <td class="content">{{index}}</td>-->
<!--          <td class="content">{{item.questionId}}</td>-->
<!--          <td class="content">{{item.typeName}}</td>-->
<!--          <td class="content">{{item.content}}</td>-->
<!--&lt;!&ndash;          <td class="content">{{item.detail}}</td>&ndash;&gt;-->
<!--          <td @click="upQuestion(index)" class="">上移</td>-->
<!--          <td @click="downQuestion(index)">下移</td>-->
<!--          <td @click="deleteQuestion(index)" >删除</td>-->
<!--        </tr>-->
<!--      </table>-->
        <el-table :data="this.das"
                  :row-class-name="tableRowClassName"
                  stripe border height="460">
            <el-table-column prop="questionId" label="ID" width="40" />
            <el-table-column prop="typeName" label="类型" width="60" />
            <el-table-column prop="content" label="试题内容" width="220" height="20" />
            <el-table-column  prop="difficulty" label="难度" width="60">
<!--                <template #default="scope">-->
<!--                    &lt;!&ndash; <el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> &ndash;&gt;-->
<!--                    <el-rate v-model="sc ope.row.difficulty" :allow-half="true"-->
<!--                             show-score disabled text-color="#ff9900"></el-rate>-->
<!--                </template>-->
            </el-table-column>
            <el-table-column label="详情">
                <template v-slot="scope" width="40">
                    <el-button @click="showDetail(scope.$index)" type="text">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template v-slot="scope">
                    <el-button @click="downQuestion(scope.$index)">下移</el-button>
                    <el-button @click="upQuestion(scope.$index)">上移</el-button>
                    <el-button @click="deleteQuestion(scope.$index)">删除</el-button>
                </template>
            </el-table-column>

<!--            <el-table-column label="操作" @click="">修改</el-table-column>-->
<!--            <el-table-column label="操作" @click="downQuestion(scope.$index)">下移</el-table-column>-->
<!--            <el-table-column label="操作" @click="deleteQuestion(scope.$index)">删除</el-table-column>-->
        </el-table>
<!--      详情弹窗-->
      <el-dialog title="详情"
                 v-model="dialogShow">
          <el-form :model="currentQuestion">
              <el-form-item label="试题内容">
<!--                  <el-input v-model="currentQuestion.content"/>-->
                  {{currentQuestion.content}}
              </el-form-item>
              <el-form-item label="试题类型">
<!--                  <el-input v-model="currentQuestion.typeName"/>-->
                  {{currentQuestion.typeName}}
              </el-form-item>
              <el-form-item label="科目">{{currentQuestion.subject}}</el-form-item>
              <el-form-item label="章节">{{currentQuestion.chapter}}</el-form-item>
              <el-form-item label="难度">{{currentQuestion.difficulty}}</el-form-item>
              <el-form-item label="详情" >
                <div v-if="currentQuestion.type < 3">
                    <div  v-for="(item,index) in currentQuestion.detail" :key="index">
                    {{item.choosedContent}}
                    </div>
                </div>
                  <div v-else>
                      {{currentQuestion.detail[0].choosedContent}}
                  </div>
              </el-form-item>
          </el-form>
              <div class="dialog-footer">
                  <el-button @click="dialogShow = false">取 消</el-button>
                  <el-button type="primary" @click="dialogShow = false">确 定</el-button>
              </div>
      </el-dialog>
<!--    </div>-->
<!--    <div v-for="item in this.das" :item="item" :index="index" :key="item.questionId">-->
<!--      {{item.questionId}} ++-->
<!--      <div class="content">-->
<!--      {{item.content}}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'auto_generate',
  data () {
    return {
      mode: '0',

      paperName: '',
      rule: {
        paper: '',
        formId: '',
        totalMark: 0,
        singleNum: 2,
        singleScore: 3,
        multiNum: 2,
        multiScore: 4,
        completeNum: 0,
        completeScore: 0,
        subjectiveNum: 2,
        subjectiveScore: 10,
        difficulty: 4.0,
        pointIds: ''
      },
      das: [],
        dialogShow: false,
        currentQuestion:{}
    }
  },
  methods: {
      savePaper (){
          let paper = {}
          //默认试卷名为 用户id + paper
          let id = '管理员'
          paper.paperName = this.paperName + '_auto_' + id
          paper.questionList = this.das
          paper.formId = this.formId
          axios.post('http://localhost:8080/paper/savePaper', paper).then(response => (
              console.log('save success' + response)
          ))
      },
      manualGenerate() {
          this.$router.push({
              path: '/manual_generate',
              query: {
                  paperData: encodeURIComponent(JSON.stringify(this.das))
              }
          })
      },
      showDetail(index) {
          console.log(this.das[index])
            this.currentQuestion = this.das[index]
          this.dialogShow = true
      },

    getSmartPaper () {
      // pointIds = 1#2#3#4#5#6#7#8#9#
      this.rule.pointIds = '1#2#3#4#5#6#7#8#9#'
      let total = 0
      total += this.rule.singleNum * this.rule.singleScore
      total += this.rule.multiNum * this.rule.multiScore
      total += this.rule.completeNum * this.rule.completeScore
      total += this.rule.subjectiveNum * this.rule.subjectiveScore
      this.rule.totalMark = total
      console.log(total)

      axios.post('http://localhost:8080/paper/getSmartPaperList', this.rule).then(response => (
        this.das = response.data.data.questionList
      ))
      this.sortQuestion()
      console.log('result')
    },
    // resort question after got question
    sortQuestion () {
      for (var i = 1; i < this.das.length;) {
        if (this.das[i].type < this.das[i - 1].type) {
          this.upQuestion(i)
        } else {
          i += 1
        }
      }
    },
    upQuestion (index) {
      if (index === 0) {
        alert('can not up')
        return
      }
      let temp = this.das[index]
      console.log(temp)
      // this.$set(this.das, index - 1, this.das[index])
      // this.$set(this.das, index, temp)
      this.das[index] = this.das[index - 1]
      this.das[index - 1] = temp
    },
    downQuestion (index) {
        console.log(index)
      if (index === this.das.length - 1) {
        alert('can not down')
        return
      }
      const temp = this.das[index]
      // this.$set(this.das, index + 1, this.das[index])
      // this.$set(this.das, index, temp)
      this.das[index] = this.das[index + 1]
      this.das[index + 1] = temp
    },
    deleteQuestion (index) {
      this.das.splice(index, 1)
    },
    jump2Preview () {
      if (this.das.length <= 0) {
        alert('no data')
        return
      }
      // for (let i = 0; i < this.das.length; i++) {
      //   axios.get('http://localhost:8080/question/' + 'getDetail' + '?questionId=' + this.das[i].questionId).then(response => (
      //     this.das[i].details = response.data.data
      //   ))
      // }
        console.log('before push')
        console.log(this.das)
      this.$router.push({
        path: '/paper2word',
        query: {
          paperData: encodeURIComponent(JSON.stringify(this.das))
        }
      })
    },
      tableRowClassName({row, rowIndex}) {
          row.tableId = rowIndex+1;
      }
  }
}
</script>

<style scoped>
.input-box{
    width: 24%;
    padding-top: 20px;
    padding: 5px;
    border-radius: 2px;
    float: left;
}
.input-text {
    text-align:center;
    width: 30%;
    float: left;
}

.input-content{
    width: 70%;
    float: left;
}

.content{
  width: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.inline_button{
    with: 40px;
}

</style>
