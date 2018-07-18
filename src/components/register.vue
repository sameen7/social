<template>
    <div class="main">
        <div class="register_panel">
            <img class="title" src="../assets/registered.png"/>
            <p class="user">
                <img class="userIcon" src="../assets/registerIcon.png"/>
                <input class="username" v-model="username" placeholder="请输入您的用户名"/>
            </p>
            <p class="pass">
                <img class="passIcon" src="../assets/lock.png"/>
                <input class="password" type="password" v-model="password" placeholder="请输入您的密码"/>
            </p>
            <p class="passCheck">
                <img class="passIcon" src="../assets/lock.png"/>
                <input class="password" type="password" v-model="check" placeholder="再次输入您的密码"/>
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
    export default {
        name: "register",
        data () {
            return {
                username: "",
                password: "",
                check: "",
                invite: ""
            }
        },
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