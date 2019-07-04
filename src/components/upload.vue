<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>导入</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover class="card">
      <Row class="step">
        <Steps :current="current">
          <Step title="上传数据" content="Excel格式"></Step>
          <Step title="数据验证" content="审查缺失与冲突"></Step>
          <Step title="数据概览" content="通过审查且需要添加的数据"></Step>
          <Step title="数据导入" content="将数据导入数据库"></Step>
        </Steps>
      </Row>
      <Row class="content">
        <Upload
                ref="upload"
                type="drag"
                action="/api/Upload"
                :format="['xlsx', 'xls', 'csv']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                show-upload-list v-if="current == 0" class="ucontent">
          <div class="upload">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
        <Collapse v-if="current == 1 && !ifValidate">
          <Panel v-for="(item, key, index) in vList" :name="key">
            {{key}}
            <div slot="content">
              <Collapse>
                <Panel v-for="(ite, key, index) in item" :name="key">
                  {{key}}
                  <div slot="content">
                    <!--<Table v-for="it in ite.data" :columns="ite.head" :data="it">-->
                    <!--</Table>-->
                    <div class="tablewrapper" v-for="(it, key, index) in ite.data" :class="ite.data.length > 1 ? 'multi' : ''">
                      <li class="tablehead">
                        <Row class="thitem">
                          <div class="cell" v-for="h in ite.head">{{h.title}}</div>
                        </Row>
                      </li>
                      <li class="tableitem" v-for="(i, key, index) in it">
                        <Row class="titem">
                          <!--<div class="cell" v-for="(ii, key, index) in i" :class="ite.head[index].colored == 1 ? 'colored' : ''">{{ii}}</div>-->
                          <div class="cell" v-for="(ii, key, index) in ite.head" :class="ii.colored == 1 ? 'colored' : ''">{{i[ii.key]}}</div>
                        </Row>
                      </li>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Panel>
        </Collapse>
        <div class="success" v-if="(current == 1 && ifValidate) || (current == 3 && ifcode == 0 && ifExport)">
          <img class="icon" src="../assets/success.png"/>
        </div>
        <div class="show" v-if="current == 2">
          <Row class="row1">
            <div id="deps"></div>
            <div id="places"></div>
            <div id="pros"></div>
          </Row>
          <Row class="row2">
            <div id="stus"></div>
            <div id="teas"></div>
          </Row>
        </div>
        <div class="codemodal" v-if="current == 3 && ifcode == 1">
          <div class="mask" @click="cancelExport"></div>
          <div class="cmodal">
            <div class="modalhead"><img class="pass" src="../assets/password.png"/>Code</div>
            <div class="ccontent">
              <Row class="c1">
                <Input type="password" v-model="code" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </Row>
              <Row class="c2">
                <Button type="primary" @click="comfirm">确认导入</Button>
              </Row>
            </div>
          </div>
        </div>
        <div class="toexport" v-if="current == 3 && ifcode == 0 && !ifExport">
          <Spin size="large"></Spin>
        </div>
      </Row>
      <Button class="backbtn" v-if="ifback" type="primary" @click="back">Back</Button>
      <Button class="nextbtn" v-if="current != 3" :disabled="!ifnext" type="primary" @click="next">Next step</Button>
      <Tooltip>
        <Button class="downloadbtn" v-if="current == 1" type="primary"><a class="export" :href="'/api/Download?fid=' + id">Download</a></Button>
        <div slot="content" class="tooltip">
          已去掉重复提交的数据表，重复提交指队名及队长相同，保留该实践队最后一次提交记录
        </div>
      </Tooltip>
    </Card>
    <div class="modal" v-if="showHint">
      <div class="mask" @click="close"></div>
      <div class="notice">
        <div class="nhead">
          <img class="wpic" src="../assets/warning.png"/>
          <span class="title">
          WARNING!
        </span>
        </div>
        <div class="ncontent">
          文件格式错误！请上传后缀名为xls、xlsx或csv的文件！
        </div>
        <Button class="okbtn" type="primary" @click="close">OK</Button>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import validation from '../Validation_sample'
    import { Steps, Step, Breadcrumb, BreadcrumbItem, Card, Button, Row, Upload, Collapse, Panel, Table, Col, Tooltip, Input, Spin } from 'iview';
    Vue.component('Steps', Steps);
    Vue.component('Step', Step);
    Vue.component('Breadcrumb', Breadcrumb);
    Vue.component('BreadcrumbItem', BreadcrumbItem);
    Vue.component('Card', Card);
    Vue.component('Button', Button);
    Vue.component('Row', Row);
    Vue.component('Col', Col);
    Vue.component('Upload', Upload);
    Vue.component('Collapse', Collapse);
    Vue.component('Panel', Panel);
    Vue.component('Table', Table);
    Vue.component('Tooltip', Tooltip);
    Vue.component('Input', Input);
    Vue.component('Spin', Spin);
    require('echarts/lib/chart/gauge')
    import axios from 'axios'
    export default {
        name: "upload",
        data () {
            return {
                username: "",
                current: 0,
                ifnext: false,
                validation: {},
                status: 0,
                vList: {},
                id: 0,
                ifValidate: false,
                ifback: false,
                showHint: false,
                ifcode: 0,
                ifExport: false,
                code: ""
            }
        },
        created: function () {
            axios.defaults.withCredentials = true;
            axios.get('/api/Logged').then(response => {
                var str = response.data;
                if(str == 0){
                    this.$router.push("/login");
                }else{
                    this.username = str.slice(2, str.length);
                    console.log(this.username);
                }
            })
        },
        methods: {
            cancelExport(){
                this.current = 1;
                this.ifnext = true;
                this.next();
            },
            next(){
                if(this.ifnext){
                    if(this.current == 3) {

                    }else if(this.current == 0) {
                        this.current += 1;
                        axios.get('/api/Validate?fid=' + this.id).then(response => {
                            console.log(response.data)
                            this.validation = response.data;
                            this.status = response.data.Status;
                            this.vList = response.data.Data.data;
                            if(this.status != 0){
                                this.ifValidate = false;
                                this.ifnext = false;
                                this.ifback = true;

                            }else{
                                this.ifValidate = true;
                            }
                        })
                    }else if(this.current == 1){
                        this.current += 1;
                        axios.get('/api/UploadSummary?fid=' + this.id).then(response => {
                            console.log(response.data);
                            if(response.data.Status == 0){
                                this.drawmap(response.data.Data);
                            }else {
                                this.ifnext = 1;
                            }
                        })
                    }else if(this.current == 2){
                        this.current += 1;
                        this.ifcode = true;
                    }
                }
            },
            back(){
              this.current = 0;
              this.ifback = false;
            },
            close(){
              this.showHint = false;
            },
            handleFormatError(){
                this.showHint = true;
            },
            handleSuccess(response){
              this.ifnext = true;
              this.id = response.Message;
              console.log(this.id);
            },
            drawmap(list){
                console.log(list);
                var depsChart = echarts.init(document.getElementById('deps'));
                var deps = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '系别',
                            type: 'gauge',
                            max: 40,
                            detail: {
                                formatter:'{value}个',
                                fontSize: 18
                            },
                            data: [{value: list.depCount, name: '系别个数'}],
                            title : {
                                fontWeight: 'bolder',
                                fontSize: 16,
                                fontStyle: 'italic'
                            },
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 10
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                backgroundColor: 'auto',
                                borderRadius: 2,
                                color: '#eee',
                                padding: 3,
                                textShadowBlur: 2,
                                textShadowOffsetX: 1,
                                textShadowOffsetY: 1,
                                textShadowColor: '#222',
                                fontSize: 14
                            },
                            pointer: {
                                width: 5
                            }
                        }
                    ]
                };
                depsChart.setOption(deps);

                var placesChart = echarts.init(document.getElementById('places'));
                var places = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '地点',
                            type: 'gauge',
                            max: 1000,
                            detail: {
                                formatter:'{value}个',
                                fontSize: 18,
                                fontWeight: 'bolder',
                                borderRadius: 3,
                                backgroundColor: '#444',
                                borderColor: '#aaa',
                                shadowBlur: 5,
                                shadowColor: '#333',
                                shadowOffsetX: 0,
                                shadowOffsetY: 3,
                                borderWidth: 2,
                                textBorderColor: '#000',
                                textBorderWidth: 2,
                                textShadowBlur: 2,
                                textShadowColor: '#fff',
                                textShadowOffsetX: 0,
                                textShadowOffsetY: 0,
                                fontFamily: 'Arial',
                                width: 40,
                                color: '#eee',
                                rich: {}
                            },
                            data: [{value: list.places, name: '地点数量'}],
                            title : {
                                fontWeight: 'bolder',
                                fontSize: 16,
                                fontStyle: 'italic'
                            },
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 10
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                backgroundColor: 'auto',
                                borderRadius: 2,
                                color: '#eee',
                                padding: 3,
                                textShadowBlur: 2,
                                textShadowOffsetX: 1,
                                textShadowOffsetY: 1,
                                textShadowColor: '#222',
                                fontSize: 12
                            },
                            pointer: {
                                width: 5
                            }
                        }
                    ]
                };
                placesChart.setOption(places);

                var prosChart = echarts.init(document.getElementById('pros'));
                var pros = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '项目',
                            type: 'gauge',
                            max: 1500,
                            detail: {
                                formatter:'{value}个',
                                fontSize: 18
                            },
                            data: [{value: list.projects, name: '项目数量'}],
                            title : {
                                fontWeight: 'bolder',
                                fontSize: 16,
                                fontStyle: 'italic'
                            },
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 10
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                backgroundColor: 'auto',
                                borderRadius: 2,
                                color: '#eee',
                                padding: 3,
                                textShadowBlur: 2,
                                textShadowOffsetX: 1,
                                textShadowOffsetY: 1,
                                textShadowColor: '#222',
                                fontSize: 12
                            },
                            pointer: {
                                width: 5
                            }
                        }
                    ]
                };
                prosChart.setOption(pros);

                var stusChart = echarts.init(document.getElementById('stus'));
                var stus = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '学生',
                            type: 'gauge',
                            max: 10000,
                            detail: {
                                formatter:'{value}个',
                                fontSize: 18
                            },
                            data: [{value: list.students, name: '学生数量'}],
                            title : {
                                ontWeight: 'bolder',
                                fontSize: 16
                            },
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 10
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                fontSize: 12
                            },
                            pointer: {
                                width: 5
                            }
                        }
                    ]
                };
                stusChart.setOption(stus);

                var teasChart = echarts.init(document.getElementById('teas'));
                var teas = {
                    tooltip : {
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '老师',
                            type: 'gauge',
                            max: 3000,
                            detail: {
                                formatter:'{value}个',
                                fontSize: 18
                            },
                            data: [{value: list.teachers, name: '老师数量'}],
                            title : {
                                ontWeight: 'bolder',
                                fontSize: 16
                            },
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    width: 10
                                }
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto'
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    color: 'auto'
                                }
                            },
                            axisLabel: {
                                fontSize: 12
                            },
                            pointer: {
                                width: 5
                            }
                        }
                    ]
                };
                teasChart.setOption(teas);
            },
            comfirm(){
                this.ifcode = 0;
                axios.post('/api/Insert?fid=' + this.id + "&pwd=" + this.code).then(response => {
                    console.log(response.data);
                    if(response.data.Status == 0){
                        this.ifExport = true;
                    }else{
                        this.cancelExport();
                        alert("验证错误！");
                    }
                })
                this.code = "";
            }
        }
    }
</script>

<style scoped>
  .bread {
    margin: 20px 0;
  }
  .card {
    min-height: 56rem;
  }
  .step {
    height: 7rem;
    border-bottom: #e8eaec solid 1px;
  }
  .content {
    margin-top: 2rem;
    min-height: 20rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .ucontent {
    width: 40rem;
    margin: 10rem auto;
  }
  .upload {
    padding: 5rem 0;
  }
  .nextbtn {
    float: right;
  }
  .export {
    color: white;
  }
  .tooltip {
    white-space: normal;
  }
  .colored {
    background-color: #ed4014;
    color: #fff;
  }
  .tablewrapper {
    border: solid 1px #dcdee2;
    border-radius: 2px;
  }
  .multi {
    margin-bottom: 2rem;
  }
  .tablehead {
    text-align: center;
    font-weight: 500;
    border-bottom: solid 1px #dcdee2;
    background-color: #f8f8f9;
  }
  .tableitem {
    text-align: center;
    border-bottom: solid 1px #dcdee2;
  }
  .thitem {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    flex-grow: 1;
    background-color: #2db7f5;
    color: #fff;
  }
  .titem {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    flex-grow: 1;
    justify-content: space-between;
  }
  .cell {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 50%;
  }
  .success {
    position: relative;
  }
  .icon {
    position: absolute;
    width: 128px;
    top: 50%;
    left: 50%;
    margin-top: 5rem;
    margin-left: -64px;
  }
  li {
    list-style: none;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
  .notice {
    position: fixed;
    width: 27rem;
    height: 10rem;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: #fff;
    border: solid 1px #dcdee2;
    border-radius: 4px;
  }
  .nhead {
    position: relative;
    height: 3rem;
    border-bottom: solid 2px #dcdee2;
    padding-left: 1rem;
    padding-bottom: 1rem;
    padding-top: 0.5rem;
    font-size: 1rem;
    color: #5cadff;
    font-weight: 500;
  }
  .wpic {
    position: absolute;
    width: 24px;
  }
  .title {
    position: absolute;
    left: 3.5rem;
    top: 0.8rem
  }
  .ncontent {
    padding: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }
  .okbtn {
    margin-left: 18rem;
  }
  .row1,
  .row2 {
    display: -webkit-flex;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  #deps,
  #places,
  #pros,
  #stus,
  #teas {
    min-height: 25rem;
    width: 33%;
  }

  .cmodal {
    position: fixed;
    width: 24rem;
    height: 12rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: #f8f8f9;
    border: solid 1px #dcdee2;
    border-radius: 4px;
  }
  .modalhead {
    height: 3rem;
    border-bottom: solid 2px #dcdee2;
    text-align: center;
    color: #000;
    font-weight: 500;
    line-height: 3rem;
    font-size: 2rem;
  }
  .pass {
    width: 1.5rem;
  }
  .ccontent {
    padding: 1.5rem;
    padding-right: 5rem;
    padding-left: 5rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
  }
  .c1 {
    height: 3.8rem;
    line-height: 3.8rem;
  }
  .toexport {
    display: inline-block;
    margin-top: 15rem;
  }
</style>


