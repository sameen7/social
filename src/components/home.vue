<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover>
      <Row>
        <Carousel autoplay v-model="value" loop>
          <CarouselItem>
            <div class="demo-carousel"><img src="../assets/1.jpg"/></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><img src="../assets/2.jpg"/></div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel"><img src="../assets/3.jpg"/></div>
          </CarouselItem>

        </Carousel>
      </Row>
      <br/>
      <Row class="part2">
        <div class="card">
          <Card class="search" @click.native="goSearch">
            <img src="../assets/search.png"/>
          </Card>
          <Card class="number" @click.native="goNumber">
            <img src="../assets/number.png"/>
          </Card>
          <Card class="route" @click.native="goRoute">
            <img src="../assets/route.png"/>
          </Card>
          <Card class="upload" @click.native="goUpload">
            <img src="../assets/upload.png"/>
          </Card>
        </div>
      </Row>

    </Card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Breadcrumb, BreadcrumbItem, Card, Row, Carousel, CarouselItem } from 'iview';
  import CollapseTransition from 'iview/src/components/base/collapse-transition'
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
          value: 0
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
  .demo-carousel {
    text-align: center;
  }
  .bread {
    margin: 20px 0;
  }
  .part2 {
    border-top: solid 2px #e8e8e8;
  }
  .card {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  /*img {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
</style>
