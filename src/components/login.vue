<template>
    <div class="main">
        <div class="login_panel">
            <p class="title">北航社会实践大数据平台</p>
            <!--<Icon class="userIcon" type="person"></Icon>-->
            <p class="user">
                <img class="userIcon" src="../assets/user.png"/>
                <input class="username" v-model="username" placeholder="请输入您的用户名"/>
            </p>
            <p class="pass">
                <img class="passIcon" src="../assets/lock.png"/>
                <input class="password" type="password" v-model="password" placeholder="请输入您的密码"/>
            </p>
            <button class="login">登录</button>
            <p class="register"><span @click="goRegister">还没注册账号！</span></p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Icon} from 'iview';
    Vue.component('Icon', Icon);
    export default {
        name: "login",
        data () {
          return {
              username: "",
              password: ""
          }
        },
        created: function () {

        },
        methods: {
            goRegister () {
                this.$router.push("/register")
            }
        }
    }
</script>

<style scoped>
.main {
    background-image: url("../assets/login-bg.jpg");
    /*background-size: cover;*/
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 69rem;
    /*width: 120rem;*/
}
.login_panel {
    position: absolute;
    margin: auto;
    top: 15rem;
    left: 0;
    right: 0;
    height: 25rem;
    width: 30rem;
    text-align: center;
}
.title {
    color: #fff;
    font-size: 2.5rem;
}

.user,
.pass {
    position: relative;
}

.userIcon,
.passIcon{
    position: absolute;
    width: 2rem;
    height: 2rem;
    top: 2.75rem;
    left: 5.5rem;
}

.username,
.password {
    background-color: transparent;
    outline: none;
    border: solid 2px #8a8a8a;
    width: 21rem;
    height: 3.5rem;
    border-radius: 2rem;
    padding-left: 4rem;
    color: #fff;
    margin-top: 2rem;
    font-size: 1.3rem;
}

.login {
    background-color: #1997e3;
    outline: none;
    border: solid 2px #1997e3;
    width: 21rem;
    height: 3.5rem;
    border-radius: 2rem;
    text-align: center;
    color: #fff;
    margin-top: 2rem;
    font-size: 1.8rem;
    line-height: 3.5rem;
    font-weight: 500;
}

.register {
    text-decoration: underline;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2rem;
}

input::-webkit-input-placeholder{
    color:#fff;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#fff;
}

</style>