<template>
  <div class="layout">
    <Layout class="main">
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name=activeName @on-select="goMenu">
          <div class="layout-logo"><img src="./assets/logo.png"/></div>
          <div class="layout-nav">
            <MenuItem name="home">
              <Icon type="home"></Icon>
              首页
            </MenuItem>
            <MenuItem name="search">
              <Icon type="search"></Icon>
              检索
            </MenuItem>
            <MenuItem name="number">
              <Icon type="ios-people"></Icon>
              分布
            </MenuItem>
            <MenuItem name="route">
              <Icon type="map"></Icon>
              路线
            </MenuItem>
            <MenuItem name="upload">
              <Icon type="ios-upload"></Icon>
              导入
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="content">
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center">2018北京航空航天大学      地址：北京市海淀区学院路37号      邮编：100083      电话：82317114</Footer>
    </Layout>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Layout, Menu, MenuItem, Icon, Footer } from 'iview';
  Vue.component('Layout', Layout);
  Vue.component('Menu', Menu);
  Vue.component('MenuItem', MenuItem);
  Vue.component('Icon', Icon);
  Vue.component('Footer', Footer);
const home = r => require.ensure([], () => r(require('./components/home')), 'home')
const Search = r => require.ensure([], () => r(require('./components/search')), 'search')
const Number = r => require.ensure([], () => r(require('./components/number')), 'number')
const Route = r => require.ensure([], () => r(require('./components/route')), 'route')
const Upload = r => require.ensure([], () => r(require('./components/upload')), 'upload')
export default {
  name: 'app',
  components: {
    Route,
    Upload,
    Search,
    Number,
    home
  },
  data () {
    return {
      activeName: ""

    }
  },
  created: function () {
    this.pathChange();
  },
  mounted: function() {
  },
  watch: {
    '$route': "pathChange"
  },
  methods: {
    goMenu (name) {
      this.menuChoice = name;
      if(name != 'home'){
        this.$router.push("/"+name);
      }else{
        this.$router.push("/");
      }
    },
    pathChange () {
      var path = this.$route.path;
      if(path == "/"){
        this.activeName = "home";
      }else{
        this.activeName = path.replace("/", "");
      }
    }
  }
}
</script>

<style scoped>
  .content {
    padding: 0 50px;
  }
  .bread {
    margin: 20px 0;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .main {
    height: 100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 450px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
