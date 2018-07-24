<template>
  <div class="layout">
    <Layout class="main">
      <Header v-if="!loginPath">
        <Menu :class="activeName == 'home' ? 'light' : 'dark'" mode="horizontal" theme="dark" :active-name=activeName @on-select="goMenu">
          <div class="layout-logo" v-if="activeName != 'home'">北航社会实践大数据平台</div>
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
      <Content :class="activeName == 'home' || loginPath ? 'content2' : 'content'">
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
      activeName: "",
        loginPath: false
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
      console.log("111" + path);
      if(path == "/"){
        this.activeName = "home";
          this.loginPath = false;
      }else if(path == "/login" || path == "/register"){
        this.loginPath = true;
      }else{
          this.activeName = path.replace("/", "");
          this.loginPath = false;
      }
    }
  }
}
</script>

<style scoped>
  .main {
    height: 100%;
  }
  .content {
    padding: 0 50px;
  }
  .content2 {
    padding: 0 0;
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
  .layout-logo{
    /*width: 100px;*/
    /*height: 30px;*/
    float: left;
    position: relative;
    /*top: 15px;*/
    left: 20px;
    color: #fff;
    font-size: 1.7rem;
    font-weight: 500;
  }
  .layout-nav{
    width: 450px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .light {
    background-color: transparent;
    background-image: url("assets/bg_01.jpg");
    background-repeat: no-repeat;
    /*background-size: cover;*/
    background-size: 100% 100%;
  }
  .dark {
    background-color: #2d8cf0;
  }

</style>
