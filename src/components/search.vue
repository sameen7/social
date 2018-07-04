<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>检索</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover>
      <Row class="head" :gutter="16">
        <Col span="5">
          <p class="depart">
            <span>系别：</span>
            <Select class="departSel" v-model="depChoose">
              <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </p>
          <p class="date">
            <span>日期：</span>
            <DatePicker v-model="date" class="datePicker" type="date" placement="bottom-end" placeholder="请选择"></DatePicker>
          </p>
        </Col>
        <Col span="5">
          <p class="teamName">
            <span>队名：</span>
            <Input v-model="teamName" class="teamInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
          <p class="ID">
            <span>学号：</span>
            <Input v-model="ID" class="idInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
        </Col>
        <Col span="5">
          <p class="teacher">
            <span>教师：</span>
            <Input v-model="teacher" class="teacherInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
          <p class="name">
            <span>姓名：</span>
            <Input v-model="name" class="nameInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
        </Col>
        <Col span="5">
          <p class="province">
            <span>省/国：</span>
            <Input v-model="province" class="provinceInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
          <p class="city">
            <span>市/区：</span>
            <Input v-model="city" class="cityInput" icon="ios-search" placeholder="Enter something..."></Input>
          </p>
        </Col>
        <Col span="4" class="btn">
          <Button type="primary" icon="ios-search" shape="circle" class="innerBtn" @click="search" :loading="!(depChoose || date || teamName || ID || teacher || name || province || city)">
            <span v-if="depChoose || date || teamName || ID || teacher || name || province || city">Search</span>
            <span v-else>waiting...</span>
          </Button>
        </Col>
      </Row>
      <Row class="team">
        <Card>
          <p slot="title">
            <Icon type="steam"></Icon>
            实践队
            <Button type="info" icon="ios-cloud-download-outline" size="small" class="download" @click="exportData" :loading="ProjectList.length == 0">导出</Button>
          </p>
          <Table class="teamTable" height="240" stripe highlight-row ref="table1" @on-row-click="showInfo" :columns="team5" :data="ProjectList" :loading="ProjectList.length == 0"></Table>
        </Card>
      </Row>
      <Row :gutter="16">
        <Col span="10">
          <Row class="basic">
            <Card>
              <p slot="title">
                <Icon type="information-circled"></Icon>
                基本信息
              </p>
              <Table class="info" height="336" :loading="loading" :show-header="ifShow" stripe :columns="info" :data="Information" ref="table2"></Table>
            </Card>
          </Row>
          <Row class="memberInfo">
            <Card>
              <p slot="title">
                <Icon type="person"></Icon>
                队员信息
              </p>
              <Table class="member" height="240" :loading="loading" stripe :columns="mem" :data="Member" ref="table3"></Table>
            </Card>
          </Row>
        </Col>
        <Col span="14" class="scheInfo">
          <Card>
            <p slot="title">
              <Icon type="calendar"></Icon>
              日程
            </p>
            <Table class="schedule" height="690" :loading="loading" stripe :columns="sche" :data="Schedule" ref="table4"></Table>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Breadcrumb, BreadcrumbItem,Col, Icon, Input, Button, DatePicker, Table, Select, Option, Card, Row } from 'iview';
  Vue.component('Col', Col);
  Vue.component('Icon', Icon);
  Vue.component('Input', Input);
  Vue.component('Button', Button);
  Vue.component('DatePicker', DatePicker);
  Vue.component('Table', Table);
  Vue.component('Select', Select);
  Vue.component('Option', Option);
  Vue.component('Card', Card);
  Vue.component('Row', Row);
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('BreadcrumbItem', BreadcrumbItem);
  import axios from 'axios'
    export default {
      name: "search",
      data () {
        return {
          departList: [
            {
              value: "all",
              label: "全体"
            },
            {
              value: 1,
              label: "1系"
            },
            {
              value: 2,
              label: "2系"
            },
            {
              value: 3,
              label: "3系"
            },
            {
              value: 4,
              label: "4系"
            },
            {
              value: 5,
              label: "5系"
            },
            {
              value: 6,
              label: "6系"
            },
            {
              value: 7,
              label: "7系"
            },
            {
              value: 8,
              label: "8系"
            },
            {
              value: 9,
              label: "9系"
            },
            {
              value: 10,
              label: "10系"
            },
            {
              value: 11,
              label: "11系"
            },
            {
              value: 12,
              label: "12系"
            },
            {
              value: 13,
              label: "13系"
            },
            {
              value: 14,
              label: "14系"
            },
            {
              value: 15,
              label: "15系"
            },
            {
              value: 16,
              label: "16系"
            },
            {
              value: 17,
              label: "17系"
            },
            {
              value: 18,
              label: "18系"
            },
            {
              value: 19,
              label: "19系"
            },
            {
              value: 20,
              label: "20系"
            },
            {
              value: 21,
              label: "21系"
            },
            {
              value: 22,
              label: "22系"
            },
            {
              value: 23,
              label: "23系"
            },
            {
              value: 24,
              label: "21系"
            },
            {
              value: 26,
              label: "26系"
            },
            {
              value: 29,
              label: "29系"
            },
            {
              value: 30,
              label: "30系"
            },{
              value: 35,
              label: "35系"
            },{
              value: 73,
              label: "73系"
            },{
              value: 74,
              label: "74系"
            },{
              value: 75,
              label: "75系"
            },{
              value: 76,
              label: "76系"
            },{
              value: 77,
              label: "77系"
            },{
              value: 78,
              label: "78系"
            },{
              value: 79,
              label: "79系"
            },{
              value: 100,
              label: "蓝协"
            },{
              value: 101,
              label: "团委"
            },{
              value: 102,
              label: "校会"
            }
          ],
          depChoose: "",
          date: "",
          teamName: "",
          ID: "",
          teacher: "",
          name: "",
          team5: [
            {
              title: '系号',
              key: 'dep'
            },
            {
              title: '队名',
              key: 'tna'
            },
            {
              title: '队长',
              key: 'lna'
            },
            {
              title: '指导教师',
              key: 'tte'
            },
            {
              title: '人数',
              key: 'men'
            },
          ],
          ProjectList: [],
          Projects: [],
          ifShow: false,
          loading: true,
          info: [
            {
              title: ' ',
              key: 'key'
            },
            {
              title: ' ',
              key: 'value'
            },
          ],
          Information: [],
          mem: [
            {
              title: '学号',
              key: 'sno'
            },
            {
              title: '姓名',
              key: 'sna'
            },
          ],
          Member: [],
          sche: [
            {
              title: '天',
              key: 'dno'
            },
            {
              title: '日期',
              key: 'dat'
            },
            {
              title: '省',
              key: 'pro'
            },
            {
              title: '市',
              key: 'cit'
            }
          ],
          Schedule: [],
          province: "",
          city: ""
        }
      },
      methods: {
        formatDate (date, fmt) {
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
          };
          for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
            }
          }
          return fmt;
        },
        padLeftZero (str) {
          return ('00' + str).substr(str.length);
        },
        search() {
          if(this.depChoose || this.date || this.teamName || this.ID || this.teacher || this.name || this.province || this.city){
            var d = "";
            if(this.date != ""){
              d = this.formatDate(this.date, "yyyy-MM-dd");
            }
            console.log(d);
            axios.defaults.withCredentials = true;
            axios.get('/api/Search?dep=' + this.depChoose + "&tname=" + this.teamName + "&teacher=" + this.teacher + "&date=" + d + "&stno=" + this.ID + "&stname=" + this.name + "&pro=" + this.province + "&cit=" + this.city).then(response => {
              // console.log(response.data);
              this.ProjectList = response.data.ProjectList;
              this.Projects = response.data.Projects;
            }).catch(error => {
              console.log("error");
            })
          }
        },
        showInfo (data, index) {
          this.Information = this.Projects[index].Information;
          this.Member = this.Projects[index].Member;
          this.Schedule = this.Projects[index].Schedule;
          this.loading = false;
        },
        exportData () {
          this.$refs.table1.exportCsv({
            filename: '实践队'
          });
          if(!this.loading){
            this.$refs.table2.exportCsv({
              filename: '基本信息'
            });
            this.$refs.table3.exportCsv({
              filename: '队员信息'
            });
            this.$refs.table4.exportCsv({
              filename: '日程'
            });
          }else{
            this.$Notice.warning({
              title: '请选择一支队伍',
              desc: ''
            });
          }
        }
      }
    }
</script>

<style scoped>
  .bread {
    margin: 20px 0;
  }
  .head {
    position: relative;
  }

  .btn {
    position: absolute;
    top: 30%;
    right: 0;
    text-align: center;
  }

  .departSel,
  .datePicker,
  .teamInput,
  .idInput,
  .teacherInput,
  .nameInput{
    width: 80%;
  }

  .provinceInput,
  .cityInput {
    width: 75%;
  }

  .date,
  .ID,
  .name,
  .city {
    margin-top: 20px;
  }




  .innerBtn {
    width: 50%;
  }




  .team {
    margin-top: 40px;
  }
  .teamTable {
    max-height: 240px;
  }
  .info,
  .member,
  .schedule {
    margin-top: 10px;
  }
  .basic,
  .memberInfo,
  .scheInfo {
    margin-top: 20px;
  }

  .info {
    height: 336px;
  }
  .member {
    max-height: 240px;
  }
  .schedule{
    max-height: 690px;
  }
  .team p {
    height: 24px;
  }
  .download {
    float: right;
  }
</style>
