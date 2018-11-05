<template>
   <div class="countControl">
       <span class="remove iconfont icon-remove_circle_outlin" v-show="food.count>0" @click="remove"></span>
       <span class="count" v-show="food.count>0">{{food.count}}</span>
       <span class="add iconfont icon-add_circle" @click="add"></span>
   </div>
</template>


<script>
import Vue from'vue'
export default {
    // goods组件中的每个item项目goods.foots[index].item[index]传递给该组件
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    remove(event) {
      if(!event._contructed){
          if(!this.food.count){
              return;
          }else{
              this.food.count--;
          }
      }
    },
    add(event) {
        // console.log(this.food.count);
        //event判断是原生的dom的点击 还是绑定的bssroll组件的点击
      if (!event._constucted) {
         if (!this.food.count) {
          Vue.set(this.food, "count");//给每个food添加count属性
          this.food.count = 1;
        } else {
          this.food.count++;
        }
      }
    }
  }
};
</script>

<style lang="less">
.countControl {
  font-size: 24px;
  color: rgb(0, 160, 220);
  line-height: 24px;
  width: 100px;
  padding: 5px;
  position:relative;
  span {
    display: inline-block;
  }
  .add{
     position:absolute;
     left:53px;
     top:7px;
   
  }
  .count {
    font-size: 10px;
    color: rgb(147, 153, 159);
    vertical-align: top;
    padding-top: 2px;
    width: 20px;
    text-align: center;
    line-height: 24px;
  }
}
</style>

