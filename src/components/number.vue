<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>分布</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover>
      <Row class="date">
        <span>日期：</span>
        <DatePicker class="datePicker" type="date" placeholder="请选择" v-model="date" @on-change="dateChange"></DatePicker>
      </Row>
      <Row>
        <Card class="map">
          <p slot="title">
            <Icon type="map"></Icon>
            社会实践队伍分布图
            <span class="switch">
              世界
              <i-switch size="small" @on-change="change"></i-switch>
            </span>
          </p>
          <div id="chart">

          </div>
          <div class="checkAll">
            <Row class="all">
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选</Checkbox>
            </Row>
            <Row>
              <CheckboxGroup v-model="checkAllGroup" v-for="item in dno" @on-change="checkAllGroupChange">
                <Col span="3"><Checkbox :label=item></Checkbox></Col>
              </CheckboxGroup>
            </Row>
          </div>
        </Card>
      </Row>
    </Card>
  </div>
</template>

<script>
  import info from '../MemberMap_sample'
  import Vue from 'vue'
  import { Breadcrumb, BreadcrumbItem, Col, Icon, Checkbox, CheckboxGroup, DatePicker, Row, Card, Switch} from 'iview';
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('BreadcrumbItem', BreadcrumbItem);
  Vue.component('Col', Col);
  Vue.component('Icon', Icon);
  Vue.component('Checkbox', Checkbox);
  Vue.component('CheckboxGroup', CheckboxGroup);
  Vue.component('DatePicker', DatePicker);
  Vue.component('Row', Row);
  Vue.component('Card', Card);
  Vue.component('iSwitch', Switch);
  import axios from 'axios'
  // const bmap = r => require.ensure([], () => r(require('echarts/extension/bmap/bmap')), 'bmap')
  require('echarts/extension/bmap/bmap');
  export default {
      name: "number",
      data () {
        return {
          indeterminate: false,
          checkAll: true,
          checkAllGroup: [],
          dno: [],
          coordinates: [],
          count: [],
          countData: [],
          date: "",
            zoom: 5,
            username: "",
            center: [104.114129, 37.550339]
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
      mounted: function() {
        this.date = this.formatDate(new Date(), "yyyy-MM-dd")
        this.getData(this.date);
        var i;
        for(i = 1; i < 22; i++){
          this.dno.push(i + "系");
        }
        for(i = 23; i < 31; i++){
          this.dno.push(i + "系");
        }
        this.dno.push("35系");
        this.dno.push("39系");
        for(i = 73; i < 78; i++){
          this.dno.push(i + "系");
        }
        this.dno.push("79系")
        this.dno.push("蓝协（100）");
        this.dno.push("团委（101）");
        this.dno.push("校会（102）");
        this.checkAllGroup = this.dno;
      },
      methods: {
          change (val) {
              if(val){
                  this.zoom = 1;
                  this.center = [17.929863,29.547525];
              }else{
                  this.zoom = 5;
                  this.center = [104.114129, 37.550339];
              }
              this.drawMap();
          },
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
        dateChange(val){
          this.getData(val);
        },
        getData(val) {
          axios.defaults.withCredentials = true;
          axios.get('/api/MemberMap?date=' + val).then(response => {
            this.count = response.data.Count;
            this.coordinates = response.data.Coordinates;
            this.update();
          }).catch(error => {
            console.log("error");
          })
        },
        handleCheckAll () {
          if (this.indeterminate) {
            this.checkAll = false;
          } else {
            this.checkAll = !this.checkAll;
          }
          this.indeterminate = false;

          if (this.checkAll) {
            this.checkAllGroup = this.dno;
          } else {
            this.checkAllGroup = [];
          }
          this.update();
        },
        checkAllGroupChange (data) {
          if (data.length === 39) {
            this.indeterminate = false;
            this.checkAll = true;
          } else if (data.length > 0) {
            this.indeterminate = true;
            this.checkAll = false;
          } else {
            this.indeterminate = false;
            this.checkAll = false;
          }
          this.update();
        },
        update () {
          var i, j;
          var data = this.checkAllGroup;
          var cdata = [];

          for(i = 0; i < data.length; i++){
            var value = data[i].replace(/[^0-9]/ig,"");
            for(j = 0; j < this.count.length; j++){
              if(this.count[j].dep == value){
                var k, l, flag = false;
                for(k = 0; k < this.count[j].data.length; k++){
                  for(l = 0; l < cdata.length; l++){
                    if(this.count[j].data[k].name == cdata[l].name){
                      cdata[l].value = cdata[l].value + this.count[j].data[k].value;
                      flag = true;
                    }
                  }
                  if(!flag){
                    var c = {};
                    c["name"] = this.count[j].data[k].name;
                    c["value"] = this.count[j].data[k].value;
                    cdata.push(c);
                  }
                  flag = false;
                }
              }
            }
          }
          this.countData.splice(0, this.countData.length);
          this.countData = [].concat(cdata);
          this.drawMap();
        },
        drawMap () {
          var myChart = echarts.init(document.getElementById("chart"));
          var data = this.countData;
          var geoCoordMap = this.coordinates;


          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                res.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value)
                });
              }
            }
            return res;
          };
          var option = {
            tooltip : {
              trigger: 'item'
            },
            bmap: { center: this.center, zoom: this.zoom, roam: false, mapStyle: { styleJson: [ { "featureType": "water", "elementType": "all", "stylers": { "color": "#044161" } }, { "featureType": "land", "elementType": "all", "stylers": { "color": "#004981" } }, { "featureType": "boundary", "elementType": "geometry", "stylers": { "color": "#064f85" } }, { "featureType": "railway", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "highway", "elementType": "geometry", "stylers": { "color": "#004981" } }, { "featureType": "highway", "elementType": "geometry.fill", "stylers": { "color": "#005b96", "lightness": 1 } }, { "featureType": "highway", "elementType": "labels", "stylers": { "visibility": "off" } }, { "featureType": "arterial", "elementType": "geometry", "stylers": { "color": "#004981" } }, { "featureType": "arterial", "elementType": "geometry.fill", "stylers": { "color": "#00508b" } }, { "featureType": "poi", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "green", "elementType": "all", "stylers": { "color": "#056197", "visibility": "off" } }, { "featureType": "subway", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "manmade", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "local", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "arterial", "elementType": "labels", "stylers": { "visibility": "off" } }, { "featureType": "boundary", "elementType": "geometry.fill", "stylers": { "color": "#029fd4" } }, { "featureType": "building", "elementType": "all", "stylers": { "color": "#1a5787" } }, { "featureType": "label", "elementType": "all", "stylers": { "visibility": "off" } } ] } },
            series : [
              {
                name: 'Number',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function (val) {
                  var v = val[2];
                  if(val[2] > 40){
                    v = 40 + (val[2]-40)/100;
                  }
                  return v;
                },
                tooltip: {
                  formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">'
                      + obj.seriesName + '</div>'
                      + obj.name + '：' + value[2];
                  }
                },
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#ddb926"
                  }
                }
              },
              {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(data.sort(function (a, b) {
                  return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function (val) {
                  var v = val[2];
                  if(val[2] > 40){
                      v = 40 + (val[2]-40)/100;
                  }
                  return v;
                },
                tooltip: {
                  formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">'
                      + obj.seriesName + '</div>'
                      + obj.name + '：' + value[2];
                  }
                },
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#f4e925",
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                zlevel: 1
              }
            ]
          };
          myChart.clear();
          myChart.setOption(option);
        }
      }
    }
</script>

<style scoped>
  .bread {
    margin: 20px 0;
  }
  #chart {
    height: 700px;
  }
  .map {
    margin-top: 20px;
  }
  .all {
    border-bottom: 1px solid #e9e9e9;
    padding-bottom:6px;
    margin-bottom:6px;
    margin-top: 20px;
  }
  .switch {
    float: right;
    /*outline: none;*/
    margin-right: 2px;
    font-size: 1rem;
    font-weight: 400;
  }
</style>
