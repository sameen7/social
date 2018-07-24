<template>
  <div>
    <Breadcrumb class="bread">
      <BreadcrumbItem>首页</BreadcrumbItem>
      <BreadcrumbItem>导入</BreadcrumbItem>
    </Breadcrumb>
    <Card dis-hover>

    </Card>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "upload",
        data () {
            return {
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
    }
</script>

<style scoped>
  .bread {
    margin: 20px 0;
  }
</style>
