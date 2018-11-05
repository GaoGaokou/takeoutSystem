<template>
  <div id="app">
    <div class="wrapper">
      <v-header :seller="seller"></v-header>
      <div class="tap">
          <router-link to="/goods" class="item"> 商品 </router-link>
          <router-link to="/comments" class="item"> 评价 </router-link>
          <router-link to="/sellers" class="item"> 商家 </router-link>

      </div>
      <div class="content">
        <router-view :seller="seller"></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import header from '@/components/header'
export default {
  name: "App",
  data(){
    return{
     seller:{}
    }
  },
  components:{
    "v-header":header,
  },
  created(){
    this.getData()
   
  },
  methods:{
      getData(){
          this.$http.get('../../static/data.json').then(res=>{
           this.seller=res.body.seller;
            //  console.log(this.seller);
          })
      }
  }
};
</script>

<style lang="less" >
*{
  margin:0;
  padding:0;
}
.tap{
  display:flex;
  height:40px;
  border-bottom:1px solid rgba(7,17,27,0.1);
  background:#fff;
   .item{
    flex:1;
    display:inline-block;
     font-size:14px;
     color:rgb(77,85,93);
     line-height:40px;
     text-decoration: none;
     text-align: center;
     font-weight:700;
    
   }
  .router-link-exact-active{
    color:rgb(240,20,20) !important
  }
}
</style>
  
}
#app {
 
}
</style>
