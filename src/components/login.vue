<template>
    <div class="main">
        <div class="login_panel">
            <p class="title">北航社会实践大数据平台</p>
            <!--<Icon class="userIcon" type="person"></Icon>-->
            <p class="user">
                <img class="userIcon" src="../assets/user.png"/>
                <input class="username" v-model="username" @input="usernameCheck" placeholder="请输入您的用户名"/>
                <img class="checkIcon" v-if="username != '' && userCheck" src="../assets/yes.png"/>
                <img class="checkIcon" v-else-if="username != '' && !userCheck" src="../assets/no.png"/>
            </p>
            <p class="pass">
                <img class="passIcon" src="../assets/lock.png"/>
                <input class="password" type="password" v-model="password" @input="passwordCheck" placeholder="请输入您的密码"/>
                <img class="checkIcon" v-if="password != '' && passCheck" src="../assets/yes.png"/>
                <img class="checkIcon" v-else-if="password != '' && !passCheck" src="../assets/no.png"/>
            </p>
            <p class="info" v-if="showHint">{{hint}}</p>
            <button class="login" @click="goLogin">登录</button>
            <p class="register"><span @click="goRegister">还没注册账号！</span></p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Icon} from 'iview';
    import axios from 'axios'
    Vue.component('Icon', Icon);
    export default {
        name: "login",
        data () {
          return {
              username: "",
              password: "",
              passCheck: false,
              userCheck: false,
              hint: "",
              showHint: false
          }
        },
        created: function () {

        },
        methods: {
            goRegister () {
                this.$router.push("/register")
            },
            passwordCheck () {
                var reg = /^[0-9a-zA-Z!@#$%^&*()_=+^]{6,16}$/;
                if(reg.test(this.password)){
                    this.passCheck = true;
                }else{
                    this.passCheck = false;
                }
            },
            usernameCheck () {
                var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{3,10}$/;
                if(reg.test(this.username)){
                    this.userCheck = true;
                }else{
                    this.userCheck = false;
                }
            },
            goLogin () {
                if(this.userCheck && this.passCheck){
                    axios.defaults.withCredentials = true;
                    axios.post('/api/Login?username=' + this.username + "&pwd=" + this.password).then(response => {
                        console.log(response);
                        if(response.data == 1){
                            this.$router.push("/")
                            this.showHint = false;
                        }else{
                            this.hint = "用户名或密码错误！"
                            this.showHint = true;
                        }
                    }).catch(error => {
                        console.log("error");
                    })
                }else{
                    this.hint = "请输入合法的用户名和密码！"
                    this.showHint = true;
                }
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

.checkIcon {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 3rem;
    right: 6rem;
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

.info {
    color: #d81e06;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 2rem;
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