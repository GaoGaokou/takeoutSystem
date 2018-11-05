<template>
        <div class="shop-cart">
            <div class="cart" >
                <div class="bg-circle"   @click="goList">
                    <!-- :class均为当有商品加入购物车时候的高亮模式 -->
                    <!-- 当加入购物车的时候添加高亮模式 -->
                    <div class="sm-circle " :class="{'currPrice':totalCount!=0}">
                    <!-- 引入字体图标方式 -->
                    <i class="iconfont icon-shopping_cart" :class="{currCount:totalCount!=0}"></i>
                    <div class="count" v-show="totalCount!=0" >{{totalCount}}</div>
                   </div>
                </div>
                
            </div>
            <div class="info">
                <span class="price" :class="{currCount:totalCount!=0}">￥{{totalPrice}}</span>
                <span class="delivery">另需配送费￥{{deliveryPrice}}元</span>
            </div>
            <div class="total-price" :class="{ok:totalPrice>=20}">{{inform}}</div>
            <!-- //计算 总价和差价  动态更改价格信息-->
            <!-- 遮罩层 -->
            <div class="cart-list-wrapper" v-show="showList">
                <div class="cart-gray" @click="goList"></div>
                <div class="cart-list">
                    <div class="cart-list-header">
                        <span class="cart-title">购物车</span>
                       <span class="clear" @click="clearAll">清空</span>
                    </div>
                    <div class="food-item" v-for="food in selectFoods" :key="food.id">
                        <span class="food-list">{{food.name}}</span>
                        <span class="food-price">￥{{food.price}}元</span>
                        <cart-control class="cart-control" :food="food"></cart-control>
                    </div>

                </div>
            </div>
        </div>
</template>
<script>
import cartControl from './cartControl'
export default {
    components:{
        cartControl,
    },
    props:{
        //从goods组件传递过来的值
        //good组件app组件传递过来放在props中
        minPrice:{
            type:Number,
        },
        deliveryPrice:{
            type:Number
        },
        // 从goods组件中传过来加入购物车中的商品，是一个数组对象  根据此数组计算购物车中的价格数量
        selectFoods:{
            type:Array,
            default(){
                return [
                //    {
                //        name:'soup',
                //        count:0,
                //        price:10,
                //    },
                //    {
                //        name:'rice',
                //        count:0,
                //        price:10,
                //    }
                ]
            }
        }

    },
    data(){
        return{
            fold:false,
        }
    },
    computed:{
        //计算商品数量
        // console.log(this.selectFoods);
        totalCount(){
            let myCount=0;
            this.selectFoods.forEach((food)=>{
                myCount+=food.count;
            })
            return myCount;
        },
        //计算总价格
        totalPrice(){
            let totalPrice=0;
            this.selectFoods.forEach((food)=>{
                totalPrice+=food.price*food.count
            })
            return totalPrice;
        },
        //计算是否可以配送 差多少钱配送
        inform(){
            //20元起送 minPrice=20才起送
            if(this.totalPrice===0){
                return `￥${this.minPrice}起送`;
            }else if(this.totalPrice>0 && this.totalPrice<20){
                return `还差￥${this.minPrice-this.totalPrice}元起送`
            }else{
                return `可结算啦😁`
            }
        },
        // 购物车点击显示已经买的商品
        showList(){
            if(!this.totalCount){
                this.fold=true;//初始化this.fold为true
                return false;
            }
            return !this.fold;//false

        }
    },
    methods:{
     goList(){
      if(!this.selectFoods.length){
        return
      }
      this.fold=!this.fold;
       
    
    },
    clearAll(){
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    }
};
</script>

<style lang="less" >
.shop-cart {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #141d27;
//   opacity: 0.9;

  .cart {
    position: relative;
    width: 60px;
    height: 100%;
    display: inline-block;
    float: left;
    .bg-circle {
      position: absolute;
      top: -15px;
      left: 15px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #141d27;
      margin-right: 18px;
    //   数量显示
      .count{
          position:absolute;
          top:-10px;
          left:30px;
          width:25px;
          height:15px;
          border-radius: 9px;
          background-color:red;
          color:#fff;
          text-align: center;
          font-size: 12px;
          line-height:17px;
      }
    }
    .sm-circle {
      position: absolute;
      left: 10px;
      top: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      width: 40px;
      height: 40px;
    //   高亮
      &.currPrice{
          background-color:#00a0dc;
          color:#fff;
      }
    }
    .icon-shopping_cart {
      position: absolute;
      top: 7px;
      left: 7px;
      font-size: 24px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.4);
      &.currCount{
          color:#fff;
      }
    }
  }
  .info {
    //   flex:1;
    margin-left: 20px;
    padding: 12px 0;
    display: inline-block;
    span {
      text-align: left;
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.4);
    }
    .price {
      margin-left: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.3);
      padding-right: 12px;
      &.currCount{
          color:#fff;
      }
    }
    .delivery {
      margin-left: 12px;
      font-size: 12px;
    }
  }
  .total-price {
    // flex:1;
    width:110px;
    text-align: center;
    display: inline-block;
    height: 100%;
    background: #2b333b;
    padding: 12px;
    font-size: 12px;
    font-weight: 700px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    position: absolute;
    right: 0;
    &.ok{
        background:green;
        color:#fff;
    }
  }
  .cart-list-wrapper{
      position:fixed;
      top:0px;
      bottom:48px;
      width:100%;
      display:flex;
      flex-direction: column;//盒子竖直排列
      z-index: -1;//不压到圆
      .cart-gray{
          flex:1;
          background-color:rgba(7,17,27,0.6);

      }
      .cart-list{
          width:100%;
          position:bottom;
          left:0;
          bottom:48px;
          background-color:#fff;
          overflow: auto;//自动出现滚动
          max-height:217px;
         .cart-list-header{
             height:40px;
             line-height: 40px;
             padding:0 18px;
             border-bottom:1px solid rgba(7,17,27,0.1);
             background-color: #f3f5f7;
             .cart-title{
                 font-size:14px;
                 font-weight:200;
                 color:rgb(7,17,27);

             }
             .clear{
                 position:absolute;
                 right:18px;
                 font-size:12px;
                 color:rgb(0,160,220);
             }
         }
         .food-item{
             width:100%;
             height:48px;
             line-height:48px;
             margin:0 18px;
             border-bottom:1px solid rgba(7,17,27,0.6);

                .food-title{
                    food-size:14px;
                    color:rgb(7,17,27);
                }
                .food-price{
                    position:absolute;
                    right:150px;
                    font-size:10px;
                    color:red;
                }
                .cart-control{
                    position:absolute;
                    right:18px;
                    // bottom:
                    margin-top:6px;
                    display: inline-block;
                }
          }
      }


  }
}
</style>


