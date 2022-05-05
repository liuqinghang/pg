<template>
<div style="display: flex; width: 100%; height: 100%; ">
    <div class="div_paper" style="background: #d4d4d4; height: 100%;">
        <el-form :model="paper">
            <el-form-item label="试卷名称">
            <el-input label="试卷名称" v-model="paper.paperName"></el-input>
            </el-form-item>
            <el-form-item label="期望难度">
                <el-input label="期望难度" v-model="rule.difficulty"></el-input>
            </el-form-item>
            <el-form-item label="实际难度">
                {{actualDifficulty}}
            </el-form-item>
            <el-form-item label="试卷总分">
                    {{paperCount}}
                    <el-button @click="showRule" type="text">组卷规则</el-button>
            </el-form-item>
<!--{{this.singleList}}-->
                <div class="demo-collapse">
                    <el-collapse accordion>
                        <el-collapse-item name="1">
                            <template #title>
                                <h1>单选题      </h1>    <h1>总数 + {{this.singleList.length}}</h1>
                            </template>
                            <div v-for="(item,index) in this.singleList" :key="index" class="left_box">
                                <span class="id_style">{{item.questionId}} </span>
                                <span class="content_style">{{item.content}}</span>
                                <el-button @click="showpDetail(item)" type="text">详情</el-button>
                                <el-button @click="deleteQuestion(item)" type="text">删除</el-button>
                                <el-button @click="replaceQuestion(item)" type="text">替换</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="2">
                            <template #title>
                                <h1>多选题      </h1>    <h1>总数 + {{this.multiList.length}}</h1>
                            </template>
                            <div v-for="(item,index) in this.multiList" :key="index" class="left_box">
                                <span class="id_style">{{item.questionId}} </span>
                                <span class="content_style">{{item.content}}</span>
                                <el-button @click="showpDetail(item)" type="text">详情</el-button>
                                <el-button @click="deleteQuestion(item)" type="text">删除</el-button>
                                <el-button @click="replaceQuestion(item)" type="text">替换</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="3">
                            <template #title>
                                <h1>填空题      </h1>    <h1>总数 + {{this.blankList.length}}</h1>
                            </template>
                            <div v-for="(item,index) in this.blankList" :key="index" class="left_box">
                                <span class="id_style">{{item.questionId}} </span>
                                <span class="content_style">{{item.content}}</span>
                                <el-button @click="showpDetail(item)" type="text">详情</el-button>
                                <el-button @click="deleteQuestion(item)" type="text">删除</el-button>
                                <el-button @click="replaceQuestion(item)" type="text">替换</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="4">
                            <template #title>
                                <h1>简答题      </h1>    <h1>总数 + {{this.shortQuestionList.length}}</h1>
                            </template>
                            <div v-for="(item,index) in this.shortQuestionList" :key="index" class="left_box">
                                <span class="id_style">{{item.questionId}} </span>
                                <span class="content_style">{{item.content}}</span>
                                <el-button @click="showpDetail(item)" type="text">详情</el-button>
                                <el-button @click="deleteQuestion(item)" type="text">删除</el-button>
                                <el-button @click="replaceQuestion(item)" type="text">替换</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="5">
                            <template #title>
                                <h1>问答题      </h1>    <h1>总数 + {{this.questionList.length}}</h1>
                            </template>
                            <div v-for="(item,index) in this.questionList" :key="index" class="left_box">
                                <span class="id_style">{{item.questionId}} </span>
                                <span class="content_style">{{item.content}}</span>
                                <el-button @click="showpDetail(item)" type="text">详情</el-button>
                                <el-button @click="deleteQuestion(item)" type="text">删除</el-button>
                                <el-button @click="replaceQuestion(item)" type="text">替换</el-button>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            <el-form-item>
                <el-button @click="savePaper">保存预览</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="div_main" style="background: #d1ddf8; height: 100%;">
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
            <el-table :data="this.queryList" stripe border height="480" >
                <el-table-column prop="questionId" label="ID" width="40%" />
                <el-table-column prop="typeName" label="类型" width="80%" />
                <el-table-column prop="content" label="试题内容" width="360%" height="50" />
                <el-table-column  prop="difficulty" label="难度" width="40%"/>
                <el-table-column label="详情" width="80%">
                    <template v-slot="scope" >
                        <el-button @click="showDetail(scope.$index)" type="text">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="auto">
<!--                    <template v-slot="scope">-->
<!--                        <el-button @click="downQuestion(type,scope.$index)">下移</el-button>-->
<!--                        <el-button @click="upQuestion(scope.$index)">上移</el-button>-->
<!--                        <el-button @click="deleteQuestion(scope.$index)">删除</el-button>-->
<!--                    </template>-->
                    <template v-slot="scope" >
                        <el-button @click="addQuestion(scope.$index)" type="text">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="详情"
                       v-model="detailShow">
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
                    <el-button @click="detailShow = false">取 消</el-button>
                    <el-button type="primary" @click="detailShow = false">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="试题详情"
                       v-model="pDetailShow">
                <el-form :model="pCurrentQuestion">
                    <el-form-item label="试题内容">
                        <!--                  <el-input v-model="currentQuestion.content"/>-->
                        <el-input v-model="pCurrentQuestion.content"></el-input>
                    </el-form-item>
                    <el-form-item label="试题类型">
                        <!--                  <el-input v-model="currentQuestion.typeName"/>-->
                        {{pCurrentQuestion.typeName}}
                    </el-form-item>
                    <el-form-item label="科目">{{pCurrentQuestion.subject}}</el-form-item>
                    <el-form-item label="章节">{{pCurrentQuestion.chapter}}</el-form-item>
                    <el-form-item label="难度">
                        <el-input v-model="pCurrentQuestion.difficulty"></el-input>
                    </el-form-item>
                    <el-form-item label="详情" >
                        <div v-if="pCurrentQuestion.type < 3">
                            <div  v-for="(item,index) in pCurrentQuestion.detail" :key="index">
                                <el-input v-model="item.choosedContent"></el-input>
                            </div>
                        </div>
                        <div v-else>
                            <el-input v-model="pCurrentQuestion.detail[0].choosedContent"></el-input>
                        </div>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button @click="pDetailShow = false">取 消</el-button>
                    <el-button type="primary" @click="saveDetailModify">保 存</el-button>
                </div>
            </el-dialog>

            <el-dialog title="组卷规则" v-model="ruleShow">
                <el-form :model="rule">
<!--                    <el-input label="单选题" v-model="rule.singleScore"/>-->
<!--                    <el-input label="多选题" v-model="rule.multiScore"/>-->
<!--                    <el-input label="填空题" v-model="rule.blankScore"/>-->
<!--                    <el-input label="简答题" v-model="rule.shortQuestionScore"/>-->
<!--                    <el-input label="问答题" v-model="rule.questionScore"/>-->
                    <el-form-item label="单选题分值">
                        <el-input label="单选题分值" v-model="rule.singleScore"/>
                    </el-form-item>
                    <el-form-item label="多选题分值">
                        <el-input label="多选题" v-model="rule.multiScore"/>
                    </el-form-item>
                    <el-form-item label="填空题分值">
                        <el-input label="填空题" v-model="rule.blankScore"/>
                    </el-form-item>
                    <el-form-item label="简答题分值">
                        <el-input label="简答题" v-model="rule.shortQuestionScore"/>
                    </el-form-item>
                    <el-form-item label="问答题分值">
                        <el-input label="问答题" v-model="rule.questionScore"/>
                    </el-form-item>
                </el-form>

                <div class="dialog-footer">
                    <el-button @click="ruleShow = false">取 消</el-button>
                    <el-button type="primary" @click="ruleShow = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>


    </div>
</div>
</template>

<script>

import axios from "axios";
export default {
    name: "",
    components:{

    },
    data () {
        return {
            //查询模块所需变量
            urlHeader: 'http://localhost:8080/question/',
            m_subject: 'getSubject',
            m_questionType: 'getQuestionType',
            m_chapter: 'getChapter',
            m_question: 'getQuestion',
            subjectList: [],
            chapterList: [],
            typeList: [],
            value1: true,
            detailFlag: false,

            //查询列表的数组
            queryList:[],
            //查询试题详情弹窗以及对应展示标识
            currentQuestion: {},
            detailShow:false,
            //试卷中试题的详情弹窗以及对应展示标识 和位置
            pCurrentQuestion: {},
            pDetailIndex: '',
            pDetailShow:false,
            //保存当前数据
            questionTemp: {},
            //规则弹窗
            ruleShow: false,
            questionModel: {
                subject: '',
                chapter: '',
                type: '',
                master: '',
                content: '',
                difficulty: ''
            },
            // 构建的试题规则 设定各个题型的分数
            rule: {
                totalMark: 0,
                singleNum: 0,
                singleScore: 2,
                multiNum: 0,
                multiScore: 4,
                blankNum: 0,
                blankScore: 2,
                shortQuestionNum: 0,
                shortQuestionScore: 10,
                questionNum: 0,
                questionScore: 10,
                //期望难度
                difficulty: 0,
            },
            //保存到数据库的试卷试卷
            paper:{
                paperName: '',
                totalScore: '',
                questionList: [],
                difficulty: ''
            },
            //试卷中的每个题型对应数组
            singleList:[],
            multiList: [],
            blankList: [],
            shortQuestionList: [],
            questionList: [],

        }
    },
    mounted() {
        //获取查询信息
        axios.get(this.urlHeader + this.m_subject).then(response => (
            this.subjectList = response.data.data
        ))
        axios.get(this.urlHeader + this.m_questionType).then(response => (
            this.typeList = response.data.data
        ))
        //加载路由传的试题数据
        this.paper.paperName = '测试卷'
        if(this.$route.query.paperData === undefined){ return }
        let dataObj = decodeURIComponent(this.$route.query.paperData)
        this.paper.questionList = JSON.parse(dataObj)
        console.log(this.paper.questionList)
        // 将试题数据分组
        this.handlePaperData()
        console.log('singlelist')
        console.log(this.singleList)
    },
    computed:{
        paperCount: function (){
            return this.rule.singleScore * this.singleList.length + this.rule.multiScore * this.multiList.length + this.rule.blankScore * this.blankList.length + this.rule.shortQuestionScore * this.shortQuestionList.length + this.rule.questionScore * this.questionList.length

        },
        actualDifficulty: function (){
            let _difficulty = 0
            for(let i = 0; i < this.singleList.length; i++) {
                let question = this.singleList[i]
                _difficulty += this.rule.singleScore * Number(question.difficulty)
            }
            console.log(_difficulty)
            for(let i = 0; i < this.multiList.length; i++) {
                let question = this.multiList[i]
                _difficulty += this.rule.multiScore * Number(question.difficulty)
            }
            for(let i = 0; i < this.blankList.length; i++) {
                let question = this.blankList[i]
                _difficulty += this.rule.blankScore * Number(question.difficulty)
            }
            for(let i = 0; i < this.shortQuestionList.length; i++) {
                let question = this.shortQuestionList[i]
                _difficulty += this.rule.shortQuestionScore * Number(question.difficulty)
            }
            for(let i = 0; i < this.questionList.length; i++) {
                let question = this.questionList[i]
                _difficulty += this.rule.questionScore * Number(question.difficulty)
            }
            _difficulty = _difficulty / this.paperCount
            return _difficulty.toFixed(3)
        }
    },
    methods: {
        showDetail(index) {
            console.log(this.queryList[index])
            this.currentQuestion = this.queryList[index]
            this.detailShow = true
        },
        showpDetail(item) {
            // console.log(item)
            this.pDetailShow = true
            this.pCurrentQuestion = item
            // this.pCurrentQuestion
        },
        saveDetailModify() {
            this.pDetailShow  = false
            let item = this.pCurrentQuestion
            this.deleteQuestion(item)
            //
            if (item.type === 1) {
                this.singleList.push(item)
            } else if (item.type === 2) {
                this.multiList.push(item)
            } else if (item.type === 3) {
                this.blankList.push(item)
            } else if (item.type === 4) {
                this.shortQuestionList.push(item)
            } else if (item.type === 5) {
                this.questionList.push(item)
            }
        },
        showRule(){
            this.ruleShow = true
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
        commitForm () {
            console.log('model is')
            console.log(this.questionModel)
            axios({
                    method: 'post',
                    url: this.urlHeader + this.m_question,
                    data: this.questionModel
                }
            ).then(response => (
                //将查询结果渲染到queryList中
                this.queryList = response.data.data
            ))
        },
        //TODO
        //调整试卷中各个题型的顺序
        upQuestion (type,index) {
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
        downQuestion (type,index) {
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
        deleteQuestion (item) {
            if (item.type === 1) {
                for(let i = 0; i <this.singleList.length; i++){
                    if(this.singleList[i].questionId === item.questionId){
                        this.singleList.splice(i, 1)
                    }
                }
            } else if (item.type === 2) {
                this.multiList.push(item)
                for(let i = 0; i <this.multiList.length; i++){
                    if(this.multiList[i].questionId === item.questionId){
                        this.multiList.splice(i, 1)
                    }
                }
            } else if (item.type === 3) {
                this.blankList.push(item)
                for(let i = 0; i <this.blankList.length; i++){
                    if(this.blankList[i].questionId === item.questionId){
                        this.blankList.splice(i, 1)
                    }
                }
            } else if (item.type === 4) {
                this.shortQuestionList.push(item)
                for(let i = 0; i <this.shortQuestionList.length; i++){
                    if(this.shortQuestionList[i].questionId === item.questionId){
                        this.shortQuestionList.splice(i, 1)
                    }
                }
            } else if (item.type === 5) {
                this.questionList.push(item)
                for(let i = 0; i <this.questionList.length; i++){
                    if(this.questionList[i].questionId === item.questionId){
                        this.questionList.splice(i, 1)
                    }
                }
            }
        },
        replaceQuestion (item) {
            this.questionModel.subject = item.subjectId
            this.questionModel.chapter = item.chapterId
            this.questionModel.type = item.type
            this.commitForm()
        },
        //添加试题到试卷
        addQuestion(index){
            // eslint-disable-next-line no-debugger
            // debugger
            // console.log(this.queryList[index].type)
            // console.log(this.singleList)
            // console.log(this.queryList)
            console.log('begin')
            switch (this.queryList[index].type){
                case 1:
                    this.singleList.push(this.queryList[index])
                    break
                case 2:
                    this.multiList.push(this.queryList[index])
                    break
                case 3:
                    this.blankList.push(this.queryList[index])
                    break
                case 4:
                    this.shortQuestionList.push(this.queryList[index])
                    break
                case 5:
                    this.questionList.push(this.queryList[index])
                // eslint-disable-next-line no-fallthrough
                default:
                        break
            }
        },
        handlePaperData () {
            let i = 0
            while (i < this.paper.questionList.length) {
                let item = this.paper.questionList[i]
                if (item.type === 1) {
                    this.singleList.push(item)
                } else if (item.type === 2) {
                    this.multiList.push(item)
                } else if (item.type === 3) {
                    this.blankList.push(item)
                } else if (item.type === 4) {
                    this.shortQuestionList.push(item)
                } else if (item.type === 5) {
                    this.questionList.push(item)
                }
                i++
            }
        },
        //保存试卷信息
        savePaper (){
            this.paper.questionList = [].concat(this.singleList).concat(this.multiList).concat(this.blankList).concat(this.shortQuestionList).concat(this.questionList)
            this.paper.difficulty = this.actualDifficulty
            this.paper.totalScore = this.paperCount
            if(this.paper.questionList.length < 1){
                alert('试卷无数据')
                return
            }
            axios.post('http://localhost:8080/paper/savePaper', this.paper).then(response => (
                console.log('save success' + response)
            ))
            this.$router.push({
                path: '/paper2word',
                query: {
                    paperData: encodeURIComponent(JSON.stringify(this.paper.questionList))
                }
            })
        },
    },


}
</script>

<style scoped>
    .div_paper{
        /*display: inline;*/
        width: 25%;
    }
    .div_main{
        /*display: inline;*/
        width: 73%;
    }
    .left_box{
        height: auto;

    }
    .id_style{
        height: auto;
        width: 10px;
        padding-left: 2px;
        padding-right: 5px;
    }
    .content_style{
        height: auto;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }


    .menu {
        padding: 2px;

    }

    /*.head {*/
    /*    height: 40px;*/
    /*    top: 0px;*/
    /*    left: 0px;*/
    /*    width: 100%;*/
    /*}*/

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
</style>
