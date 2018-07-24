<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>路线</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover>
      <Row class="date" :gutter="16">
        <span>日期：</span>
        <DatePicker class="datePicker" v-model="daterange" type="daterange" placeholder="请选择" @on-change="dateChange"></DatePicker>
      </Row>
      <Row>
        <Card class="map">
          <p slot="title">
            <Icon type="map"></Icon>
            社会实践队伍路线图
          </p>

            <div class="mapcon">
                <div id="chart">

                </div>
              <div class="table">
                <Table class="teamTable" height="700" border ref="table" :columns="column1" :data="data1"></Table>
              </div>


            </div>
          <div class="checkAll">
            <Row class="all">
              <Checkbox class="checkbox"
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
  import Vue from 'vue'
  import { Breadcrumb, BreadcrumbItem, Col, Icon, Checkbox, CheckboxGroup, DatePicker, Row, Card, Table} from 'iview';
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('BreadcrumbItem', BreadcrumbItem);
  Vue.component('Col', Col);
  Vue.component('Icon', Icon);
  Vue.component('Checkbox', Checkbox);
  Vue.component('CheckboxGroup', CheckboxGroup);
  Vue.component('DatePicker', DatePicker);
  Vue.component('Row', Row);
  Vue.component('Card', Card);
  Vue.component('Table', Table);
  import axios from 'axios'
  // const bmap = r => require.ensure([], () => r(require('echarts/extension/bmap/bmap')), 'bmap')
  require('echarts/extension/bmap/bmap');
    export default {
        name: "route",
      data () {
          return {
            indeterminate: false,
            checkAll: true,
            checkAllGroup: [],
            dno: [],
            coordinates: [],
            routes: [],
            all: [],
            daterange: [],
              column1: [
                  {
                      title: "路线",
                      key: "route"
                  },
                  {
                      title: "队",
                      key: "teamnum",
                      width: 45
                  }
              ],
              data1: [],
              username: ""
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
        var now = new Date();
        this.daterange[0] = this.formatDate(now, "yyyy-MM-dd");
        this.daterange[1] = this.formatDate(new Date(now.setDate(now.getDate()+7)), "yyyy-MM-dd");
        this.getData(this.daterange);
        var i;
        for(i = 1; i < 22; i++){
          this.dno.push(i + "系");
        }
        for(i = 23; i < 25; i++){
          this.dno.push(i + "系");
        }
        this.dno.push("26系");
        this.dno.push("29系");
        this.dno.push("30系");
        this.dno.push("35系");
        for(i = 73; i < 78; i++){
          this.dno.push(i + "系");
        }
        this.dno.push("79系");
        this.dno.push("蓝协（100）");
        this.dno.push("团委（101）");
        this.dno.push("校会（102）");
        this.checkAllGroup = this.dno;
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
        dateChange(val){
          this.getData(val);
        },
        getData(val) {
          axios.defaults.withCredentials = true;
          axios.get('/api/Route?startdate=' + val[0] + "&enddate=" + val[1]).then(response => {
            // console.log(response);
            this.routes = response.data.Routes;
            this.coordinates = response.data.Coordinates;
              this.data = [];
              for(var item in this.routes){
                  var routes = this.routes[item];
                  for(var key in routes){
                      var route = routes[key];
                      var c = {};
                      c["route"] = route[0].name + "->" + route[1].name;
                      c["teamnum"] = route[1].value;
                      this.data1.push(c);
                  }
              }
              console.log(this.data1);
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
        update (){
          var data = this.routes;
          var dep = [];
          var i, j, k, l;
          var flag = false;
          var mark = -1;
          var all = [];
          for(i = 0; i < this.checkAllGroup.length; i++){
            dep[i] = this.checkAllGroup[i].replace(/[^0-9]/ig,"");
          }
          for(i = 0; i < dep.length; i++){
            for(var key in data){
              if(key == dep[i]){
                var item = data[key]
                for(j = 0; j < item.length; j++){
                  // var tmp = [];
                  // tmp.push(item[j]);
                  // console.log("...");
                  // console.log(item[j]);
                  // console.log("...");
                  for(k = 0; k < all.length; k++){
                    if(item[j][0].name == all[k][0][0].name){
                      mark = k;
                      break;
                    }
                  }
                  if(mark == -1){
                    all.push([]);
                    var c = [{}, {}];
                    c[0]["name"] = item[j][0].name;
                    c[1]["name"] = item[j][1].name;
                    c[1]["value"] = item[j][1].value;
                    all[all.length-1].push(c);
                  }else{
                    for(l = 0; l < all[k].length; l++){
                      if(item[j][1].name == all[k][l][1].name){
                        flag = true;
                        break;
                      }
                    }
                    if(!flag){
                      var c = [{}, {}];
                      c[0]["name"] = item[j][0].name;
                      c[1]["name"] = item[j][1].name;
                      c[1]["value"] = item[j][1].value;
                      all[k].push(c);
                    }else{
                      all[k][l][1].value += item[j][1].value;
                    }
                    flag = false;
                  }
                  mark = -1;
                }
              }
            }
          }
          this.all = all;
          this.drawMap();
        },
        drawMap () {
          var myChart = echarts.init(document.getElementById("chart"));
          myChart.clear();
          var geoCoordMap = this.coordinates;

          var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

          var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var dataItem = data[i];
              var fromCoord = geoCoordMap[dataItem[0].name];
              var toCoord = geoCoordMap[dataItem[1].name];
              if (fromCoord && toCoord) {
                res.push({
                  fromName: dataItem[0].name,
                  toName: dataItem[1].name,
                  coords: [fromCoord, toCoord],
                  value: dataItem[1].value
                });
              }
            }
            return res;
          };

          var color = ['#6be6c1', '#46bee9', '#ffee51', '#e01f54'];
          var series = [];
          // console.log(this.all);
          if(this.all.length == 0){
            series.push({
                name: "",
                type: 'lines',
                coordinateSystem: "",
                zlevel: 1,
                effect: {
                  show: false,
                  period: 6,
                  trailLength: 0.7,
                  color: '#fff',
                  symbolSize: 3
                },
              },
              {
                name: "",
                type: 'lines',
                coordinateSystem: "",
                zlevel: 2,
                effect: {
                  show: false,
                  period: 6,
                  trailLength: 0,
                  symbol: planePath,
                  symbolSize: 13
                },
              },
              {
                name: "",
                type: 'effectScatter',
                coordinateSystem: '',
                zlevel: 2,
                rippleEffect: {
                  brushType: 'stroke'
                },
                label: {
                  normal: {
                    show: false,
                    position: 'right',
                    formatter: '{b}'
                  }
                },
                symbolSize: function (val) {
                  return val[2] / 8;
                },

              });
          }else{
            this.all.forEach(function (item, i) {
              i = i % 4;
              series.push({
                  name: item[0][0].name,
                  type: 'lines',
                  coordinateSystem: 'bmap',
                  zlevel: 1,
                  effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                  },
                  lineStyle: {
                    normal: {
                      color: color[i],
                      width: 0,
                      curveness: 0.2
                    }
                  },
                  data: convertData(item)
                },
                {
                  name: item[0][0].name,
                  type: 'lines',
                  coordinateSystem: 'bmap',
                  zlevel: 2,
                  effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 13
                  },
                  lineStyle: {
                    normal: {
                      color: color[i],
                      width: 1,
                      opacity: 0.4,
                      curveness: 0.2
                    }
                  },
                  data: convertData(item)
                },
                {
                  name: item[0][0].name,
                  type: 'effectScatter',
                  coordinateSystem: 'bmap',
                  zlevel: 2,
                  rippleEffect: {
                    brushType: 'stroke'
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'right',
                      formatter: '{b}'
                    }
                  },
                  symbolSize: function (val) {
                    return val[2] / 8;
                  },
                  itemStyle: {
                    normal: {
                      color: color[i]
                    }
                  },
                  data: item.map(function (dataItem) {
                    return {
                      name: dataItem[1].name,
                      value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                  })
                });
            });
          }


          var option = {
            // backgroundColor: '#404a59',
            tooltip : {
              formatter: function (obj) {
                var value = obj.value;
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 16px;padding-bottom: 7px;margin-bottom: 7px">'
                  + obj.seriesName + '</div>'
                  + "To " + obj.data.toName + '：' + value;
              }
            },
            bmap: { center: [104.114129, 37.550339], zoom: 5, roam: false, mapStyle: { styleJson: [ { "featureType": "water", "elementType": "all", "stylers": { "color": "#044161" } }, { "featureType": "land", "elementType": "all", "stylers": { "color": "#004981" } }, { "featureType": "boundary", "elementType": "geometry", "stylers": { "color": "#064f85" } }, { "featureType": "railway", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "highway", "elementType": "geometry", "stylers": { "color": "#004981" } }, { "featureType": "highway", "elementType": "geometry.fill", "stylers": { "color": "#005b96", "lightness": 1 } }, { "featureType": "highway", "elementType": "labels", "stylers": { "visibility": "off" } }, { "featureType": "arterial", "elementType": "geometry", "stylers": { "color": "#004981" } }, { "featureType": "arterial", "elementType": "geometry.fill", "stylers": { "color": "#00508b" } }, { "featureType": "poi", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "green", "elementType": "all", "stylers": { "color": "#056197", "visibility": "off" } }, { "featureType": "subway", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "manmade", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "local", "elementType": "all", "stylers": { "visibility": "off" } }, { "featureType": "arterial", "elementType": "labels", "stylers": { "visibility": "off" } }, { "featureType": "boundary", "elementType": "geometry.fill", "stylers": { "color": "#029fd4" } }, { "featureType": "building", "elementType": "all", "stylers": { "color": "#1a5787" } }, { "featureType": "label", "elementType": "all", "stylers": { "visibility": "off" } } ] } },
            series: series
          };
          // console.log(series);
          myChart.setOption(option, true);
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
    width: 80%;
    display: inline-block;
  }
  .map {
    margin-top: 20px;
  }
  .all {
    border-bottom: 1px solid #e9e9e9;
    padding-bottom:6px;
    margin-bottom:6px;
  }
  .datePicker {
    width: 17rem;
  }

  .checkbox {
    margin-top: 20px;
  }
  .table {
    width: 19%;
    display: inline-block;
  }
</style>
