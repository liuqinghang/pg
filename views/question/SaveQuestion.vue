<template>
  <div class="hello">

    <div class="menu">
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          科目:
        </div>
          <div class="input-content" style="background: #ffffff">
              <el-select v-model="this.questionModel.subject"
                         @change="getChapterList"
                         filterable placeholder="Select"
                         class="m-2">
                  <el-option
                          v-for="item in this.subjectList"
                          :key="item.selectKey"
                          :label="item.selectLabel"
                          :value="item.selectValue"/>
              </el-select>
          </div>
      </div>

      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          章节:
        </div>
          <div class="input-content" style="background: #ffffff">
              <el-select v-model="this.questionModel.chapter"
                         filterable placeholder="Select">
                  <el-option
                          v-for="item in this.chapterList"
                          :key="item.selectKey"
                          :label="item.selectLabel"
                          :value="item.selectValue"/>
              </el-select>
          </div>
      </div>

      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          试题类型:
        </div>
          <div class="input-content">
              <el-select v-model="this.questionModel.type" filterable placeholder="Select">
                  <el-option
                          v-for="item in this.typeList"
                          :key="item.selectKey"
                          :label="item.selectLabel"
                          :value="item.selectValue"/>
              </el-select>
          </div>
      </div>
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          评分:
        </div>
        <div class="input-content">
<!--          <div class="Rate" style="height: 20px; background: #1863d2">-->
<!--          <rate :length="5" v-model="questionModel.difficulty" style="height: 20px"/>-->
<!--          </div>-->
            <el-rate v-model="questionModel.difficulty" allow-half />
        </div>
      </div>
<!--      <div class="input-box" style=" background: #ffffff">-->
<!--        <div class="input-text" style="background: #ffffff">-->
<!--          是否公开:-->
<!--        </div>-->
<!--        <div class="input-content">-->
<!--          <input type="checkbox" v-model="value1" style="">-->
<!--        </div>-->
<!--      </div>-->
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          题目内容
        </div>
          <div class="input-content" >
              <el-input v-model="questionModel.content" placeholder="请输入试题" />
          </div>
      </div>
      <el-button @click="saveQuestion">录入试题</el-button>
        <span style="display: inline; padding-left: 50px">试题详情</span>
        <div>
              <div v-if="Number(questionModel.type) == 1 || Number(questionModel.type) == 2" style="background: #ffffff">
                <div class="title">
                  <h3>选项设置</h3>
                  <div class="numButton">
                    <el-button @click="addOption">新增选项</el-button>
                    <el-button @click="delOption">删除选项</el-button>
                  </div>
                </div>
                <div v-for="(item, index) in this.form.options" :key="index">
                  <span>选项{{index+1}}:</span>
                  <el-input v-model="form.options[index]"/>
                </div>
              </div>
              <div v-else>

                  <el-input
                          v-model="form.detail"
                          :rows="2"
                          type="textarea"
                          placeholder="Please input"
                  />
              </div>
        </div>
<!--      <br/>-->
<!--      试题类型 :: {{ questionModel.type }}-->

<!--      科目 :: {{ questionModel.subject }}-->

<!--      章节 :: {{ questionModel.chapter }}-->

<!--      是否公开 :: {{ value1 }}-->

<!--      试题内容 :: {{questionModel.questionContent}}-->

<!--      <br/>-->

    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'save',
  components: {


  },
  data () {
    return {
      urlHeader: 'http://localhost:8080/question/',
      subjectList: [],
      chapterList: [],
      typeList: [],
      questionList: [],
      questionModel: {
        subject: '',
        chapter: '',
        type: '',
        master: '1',
        content: '',
        difficulty: ''
      },
      m_subject: 'getSubject',
      m_questionType: 'getQuestionType',
      m_chapter: 'getChapter',
      m_question: 'getQuestion',
      s_question: 'saveQuestion',
      value1: true,
      // 保存选择题选项的数组
      form: {
        detail: '',
        options: ['选项1']
      }

    }
  },
  methods: {
    getChapterList () {
      axios.get(this.urlHeader + this.m_chapter, {
        params: {
          subjectId: this.questionModel.subject
        }
      }).then(response => (
        this.chapterList = response.data.data

      ))
      this.questionModel.chapter = ''
      // this.$refs.chapter.resetChoosed()
      // this.$refs.chapter.updateInfo(this.chapterList)
    },
    getQuestionType (res) {
      this.questionModel.type = res
    },
    getSubject (res) {
      // update chapter list after get subject
      this.questionModel.subject = res
      this.getChapterList()
    },
    getChapter (res) {
      this.questionModel.chapter = res
    },
    // commit question content
    saveQuestion () {
      let model = this.questionModel
      if (model.type === undefined || model.type === '') {
        alert('未选择试题类型')
        return
      } else if (model.subject === undefined || model.subject === '') {
        alert('未选择科目')
        return
      } else if (model.chapter === undefined || model.chapter === '') {
        alert('未选择章节')
        return
      } else if (model.content === undefined || model.content === '') {
        alert('未输入试题')
        return
      } else if (model.difficulty === undefined || model.difficulty === '') {
        alert('未选择试题难度')
        return
      }
      // 选择题
      if (model.type === '1' || model.type === '2') {
        for (let i = 0; i < this.form.options.length; i++) {
          if (this.form.options[i] === undefined || this.form.options[i] === '') {
            alert('试题选项未填写')
            return
          }
        }
        this.questionModel.content = this.questionModel.content + '\\$' + JSON.stringify(this.form.options)
      } else { // 其他
        if (this.form.detail === null || this.form.detail === '') {
          alert('试题具体内容未填写')
          return
        }
        this.questionModel.content = this.questionModel.content + '\\$' + this.form.detail
      }
      console.log('model is')

      console.log(this.questionModel)
      console.log(this.form)
      axios({
        method: 'post',
        url: this.urlHeader + this.s_question,
        data: this.questionModel
      }
      ).then(response => (
        this.questionList = response.data.data
      )).then(
        this.resetAll
      )
    },
    // question detail
    resetAll () {
      this.questionModel.subject = ''
      this.questionModel.chapter = ''
      this.questionModel.type = ''
      this.questionModel.master = '1'
      this.questionModel.content = ''
      this.questionModel.difficulty = ''
      this.form.options = ['选项1']
      this.form.detail = ''
      // this.$refs.subject.resetChoosed()
      // this.$refs.chapter.resetChoosed()
      // this.$refs.type.resetChoosed()
    },
    addOption () {
      if (this.form.options.length <= 4) {
        this.form.options.push('')
      } else {
        alert('options count exceed!')
      }
    },
    delOption () {
      if (this.form.options.length > 1) {
        // 寻找最后一个输入框
        this.form.options.pop()
      } else {
        alert('can not delete')
      }
    }
  },
  mounted () {
    axios.get(this.urlHeader + this.m_subject).then(response => (
      this.subjectList = response.data.data
    ))
    axios.get(this.urlHeader + this.m_questionType).then(response => (
      this.typeList = response.data.data
    ))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #ffffff;
    }

    .menu {
        padding: 2px;

    }
    .input-box {
        width: 32%;
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

</style>
