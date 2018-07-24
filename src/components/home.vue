<template>
  <div class="main">
    <!--<Breadcrumb class="bread">-->
      <!--<BreadcrumbItem>首页</BreadcrumbItem>-->
    <!--</Breadcrumb>-->
    <!--<Card dis-hover>-->
      <!--<Row>-->
        <!--<Carousel autoplay v-model="value" loop>-->
          <!--<CarouselItem>-->
            <!--<div class="demo-carousel"><img src="../assets/1.jpg"/></div>-->
          <!--</CarouselItem>-->
          <!--<CarouselItem>-->
            <!--<div class="demo-carousel"><img src="../assets/2.jpg"/></div>-->
          <!--</CarouselItem>-->
          <!--<CarouselItem>-->
            <!--<div class="demo-carousel"><img src="../assets/3.jpg"/></div>-->
          <!--</CarouselItem>-->

        <!--</Carousel>-->
      <!--</Row>-->
      <!--<br/>-->
      <!--<Row class="part2">-->
        <!--<div class="card">-->
          <!--<Card class="search" @click.native="goSearch">-->
            <!--<img src="../assets/search.png"/>-->
          <!--</Card>-->
          <!--<Card class="number" @click.native="goNumber">-->
            <!--<img src="../assets/number.png"/>-->
          <!--</Card>-->
          <!--<Card class="route" @click.native="goRoute">-->
            <!--<img src="../assets/route.png"/>-->
          <!--</Card>-->
          <!--<Card class="upload" @click.native="goUpload">-->
            <!--<img src="../assets/upload.png"/>-->
          <!--</Card>-->
        <!--</div>-->
      <!--</Row>-->

    <!--</Card>-->
    <p class="text">北航社会实践大数据平台</p>
    <button class="btn" @click="goSearch">开始检索</button>
    <div class="card">
      <div class="team">
        <p class="pt">{{team1}}</p>
        <p>实践队</p>
      </div>
      <div class="people">
        <p class="pp">{{people1}}</p>
        <p>人数</p>
      </div>
      <div class="position">
        <p class="ppos">{{pos1}}</p>
        <p>实践地</p>
      </div>
      <div class="day">
        <p class="pd">{{day1}}</p>
        <p>天</p>
      </div>
    </div>
  </div>
</template>

<script>
    import TweenLite from 'gsap'
    import Vue from 'vue'
  import { Breadcrumb, BreadcrumbItem, Card, Row, Carousel, CarouselItem } from 'iview';
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
  import axios from 'axios'
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('BreadcrumbItem', BreadcrumbItem);
  Vue.component('Card', Card);
  Vue.component('Row', Row);
  Vue.component('Carousel', Carousel);
  Vue.component('CarouselItem', CarouselItem);
    export default {
      name: "home",
      components: {CollapseTransition},
      data () {
        return {
          value: 0,
            team: 0,
            people: 0,
            pos: 0,
            day: 0,
            tweenedNumber: 0,
            tweenedNumber2: 0,
            tweenedNumber3: 0,
            tweenedNumber4: 0,
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
            //     .catch(error => {
            //     console.log("error");
            // });


            axios.get('/api/Summary').then(response => {
                // console.log(response.data);
                this.team = response.data.team;
                this.people = response.data.people;
                this.pos = response.data.place;
                this.day = response.data.day;
                TweenLite.to(this.$data, 3, { tweenedNumber: this.team});
                TweenLite.to(this.$data, 3, { tweenedNumber2: this.people});
                TweenLite.to(this.$data, 3, { tweenedNumber3: this.pos});
                TweenLite.to(this.$data, 3, { tweenedNumber4: this.day});
            }).catch(error => {
                console.log("error");
            });
        },
        computed: {
          team1: function () {
              return this.tweenedNumber.toFixed(0);
          },
            people1: function () {
                return this.tweenedNumber2.toFixed(0);
            },
            pos1: function () {
                return this.tweenedNumber3.toFixed(0);
            },
            day1: function () {
                return this.tweenedNumber4.toFixed(0);
            }
        },
      methods: {
        goSearch () {
          this.$router.push("/search");
        },
        goNumber () {
          this.$router.push("/number");
        },
        goRoute () {
          this.$router.push("/route");
        },
        goUpload () {
          this.$router.push("/upload");
        }
      }
    }
</script>

<style scoped>
  /*.demo-carousel {*/
    /*text-align: center;*/
  /*}*/
  /*.bread {*/
    /*margin: 20px 0;*/
  /*}*/
  /*.part2 {*/
    /*border-top: solid 2px #e8e8e8;*/
  /*}*/
  /*.card {*/
    /*display: flex;*/
    /*justify-content: space-around;*/
    /*flex-wrap: wrap;*/
    /*margin-top: 10px;*/
  /*}*/
  /*img {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  .main {
    height: 64rem;
    width: 100%;
    position: relative;
    background-image: url("../assets/bg_02.jpg");
    background-repeat: no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
  }
  .text {
    position: absolute;
    top: 29%;
    left: 12%;
    color: #2d8cf0;
    font-size: 5rem;
    font-weight: 500;
  }
  .btn {
    position: absolute;
    top: 42%;
    left: 12%;
    width: 8.5rem;
    height: 2.5rem;
    background-color: #52adb2;
    color: #fff;
    font-size: 1rem;
    outline: none;
    border: transparent;
  }
  .card {
    position: absolute;
    width: 31rem;
    height: 23rem;
    /*background-color: #33ffff;*/
    top: 28%;
    right: 12%;
    padding: 1.3rem 1.3rem;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .team,
  .people,
  .position,
  .day {
    width: 14rem;
    height: 10rem;
    background-color: #fff;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    text-align: center;
    color: #2d8cf0;
    font-weight: 500;
    /*position: relative;*/
    /*border-bottom: 1rem solid transparent;*/
  }
  .position,
  .day {
    margin-top: 0.4rem;
  }
  .pt,
  .pp,
  .ppos,
  .pd {
    /*padding-top: 7rem;*/
    font-size: 4rem;
    font-weight: 500;
    line-height: 6rem;
    margin-top: 1rem;
  }
</style>
