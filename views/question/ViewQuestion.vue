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

      <div class="input-box" style=" background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          是否公开:
        </div>
        <div class="input-content">
<!--          <input type="checkbox" v-model="value1" style="float: left">-->
            <el-switch v-model="value1" active-text="公开" inactive-text="私密" />
        </div>
      </div>
      <div class="input-box" style="background: #ffffff">
        <div class="input-text" style="background: #ffffff">
          题目内容
        </div>
        <div class="input-content" >
<!--          <input v-model="questionModel.content" placeholder="请输入试题" name="question-content">-->
            <el-input v-model="questionModel.content" placeholder="请输入试题" />
        </div>
      </div>

      <br/>
        <el-button @click="commitForm">提交信息</el-button>
<!--        <table v-for="(item,index) in this.questionList" :item="item" :key="index">-->
<!--          <tr>-->
<!--            <td class="content">{{index}}</td>-->
<!--            <td class="content">{{item.questionId}}</td>-->
<!--            <td class="content">{{item.typeName}}</td>-->
<!--            <td class="content">{{item.content}}</td>-->
<!--&lt;!&ndash;            <td><button @click="upQuestion(index,$event)" >上移</button></td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td><button @click="downQuestion(index,$event)">下移</button></td>&ndash;&gt;-->
<!--&lt;!&ndash;            <td><button @click="deleteQuestion(index,$event)" >删除</button></td>&ndash;&gt;-->
<!--          </tr>-->
<!--        </table>-->
        <el-table :data="this.questionList" stripe border height="480" >
            <el-table-column prop="questionId" label="试题ID" width="180" />
            <el-table-column prop="typeName" label="类型" width="180" />
            <el-table-column prop="content" label="试题内容" width="180" height="100" />
            <el-table-column  label="难度">
                <template #default="scope">
                    <!-- <el-rate v-model="scope.row.evaValue" :allow-half="true"  disabled show-score text-color="#ff9900" score-template="{value}"></el-rate> -->
                    <el-rate v-model="scope.row.difficulty" :allow-half="true"
                             show-score disabled text-color="#ff9900"></el-rate>
                </template>
            </el-table-column>
            <el-table-column label="详情">
<!--                <el-icon><eye @click="showDetail"/></el-icon>-->
            </el-table-column>
        </el-table>

<!--      <br/>-->
<!--      试题类型 :: {{ questionModel.type }}-->

<!--      科目 :: {{ questionModel.subject }}-->

<!--      章节 :: {{ questionModel.chapter }}-->

<!--      是否公开 :: {{ value1 }}-->

<!--      试题内容 :: {{questionModel.questionContent}}-->
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'view',
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
        master: '',
        content: '',
        difficulty: ''
      },
      m_subject: 'getSubject',
      m_questionType: 'getQuestionType',
      m_chapter: 'getChapter',
      m_question: 'getQuestion',
      value1: true,
      detailFlag: false
    }
  },
  methods: {
      showDetail (){
          this.detailFlag = !this.detailFlag
          console.log(this.questionList)
      },
    getChapterList () {
      axios.get(this.urlHeader + this.m_chapter, {
        params: {
          subjectId: this.questionModel.subject
        }
      }).then(response => (
        this.chapterList = response.data.data
      ))
      this.questionModel.chapter = ''
    },
    // getQuestionType (res) {
    //   this.questionModel.type = res
    // },
    // getSubject (res) {
    //   // update chapter list after get subject
    //   this.questionModel.subject = res
    //   this.getChapterList()
    // },
    // getChapter (res) {
    //   this.questionModel.chapter = res
    // },
    // commit question content
    commitForm () {
      console.log('model is')
      console.log(this.questionModel)
      axios({
        method: 'post',
        url: this.urlHeader + this.m_question,
        data: this.questionModel
      }
      ).then(response => (
        this.questionList = response.data.data
      ))
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

  .head {
    height: 40px;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .input-box {
    width: 32%;
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
</style>
