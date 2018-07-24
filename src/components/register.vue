<template>
    <div class="main">
        <div class="register_panel">
            <img class="title" src="../assets/registered.png"/>
            <p class="user">
                <img class="userIcon" src="../assets/registerIcon.png"/>
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
            <p class="passCheck">
                <img class="passIcon" src="../assets/lock.png"/>
                <input class="password" type="password" v-model="recheck" @input="passwordreCheck" placeholder="再次输入您的密码"/>
                <img class="checkIcon" v-if="passreCheck && passCheck" src="../assets/yes.png"/>
                <img class="checkIcon" v-else-if="!passreCheck && this.recheck != ''" src="../assets/no.png"/>
            </p>
            <p class="invi">
                <img class="inviteIcon" src="../assets/invitation.png"/>
                <input class="invite" v-model="invite" placeholder="请输入您的邀请码"/>
            </p>
            <button class="register">注册</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "register",
        data () {
            return {
                username: "",
                password: "",
                recheck: "",
                invite: "",
                passCheck: false,
                userCheck: false,
                passreCheck: false,
            }
        },
        created: function () {

        },
        methods: {
            passwordCheck () {
                var reg = /^[0-9a-zA-Z!@#$%^&*()_=+^]{8,16}$/;
                if(reg.test(this.password)){
                    this.passCheck = true;
                }else{
                    this.passCheck = false;
                }
            },
            passwordreCheck () {
                if(this.recheck == this.password){
                    this.passreCheck = true;
                }else{
                    this.passreCheck = false;
                }
            },
            usernameCheck () {
                var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{4,10}$/;
                if(reg.test(this.username)){
                    this.userCheck = true;
                }else{
                    this.userCheck = false;
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
    .register_panel {
        position: absolute;
        margin: auto;
        top: 15rem;
        right: 0;
        height: 25rem;
        width: 30rem;
        text-align: center;
    }

    .title {
        width: 5rem;
        height: 5rem;
    }

    .user,
    .pass,
    .passCheck,
    .invi {
        position: relative;
    }

    .userIcon,
    .passIcon,
    .inviteIcon {
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
    .password,
    .invite {
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

    .register {
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