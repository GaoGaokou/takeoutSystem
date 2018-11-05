<template>
    <div class="wrapper-good">
        <div class="wrapper-left" ref="menuWrapper" >
          <!-- 后来加的父级，让其包裹所有的div块实现滚动 -->
          <div>
            <div class="title" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="selectContent(index,$event)">
                <li class="item " :class="{'current2':currentIndex===index}" >
                  <!-- //添加高亮 -->
                    <span v-show="item.type>0" class="map" :class="classMap[item.type]"></span>
                    <span>{{item.name}}</span>
                </li>
            </div>
          </div>
        </div>
        <div class="wrapper-right" ref="foodWrapper">
          <div>
            <!-- 设置钩子 food-list  当点击左侧的时候获取到相应的右侧部分-->
            <ul v-for="(item1,index) in goods" :key="index" ref="foodList" class="food-list">
              <!-- 设置food-list属性  操作dom获取每个li在页面中排列的高度 放到数组中 
              便于当鼠标滑动内容区时候，可以计算鼠标滑动的竖直方向上的距离和每个li所排列的高度进行比较
              height1<scollY<height2==>当前浏览第几个li
              -->
                <li class="item ">
                    <div class="item-title">{{item1.name}}</div>
                    <ul>
                        <li class="food" v-for="(food,index) in item1.foods" :key="index">
                            <div class="food-content">
                                <div class="img">
                                    <img :src="food.image" alt="">
                                </div>
                                <!-- 商品信息 -->
                                <div class="info">
                                    <div class="food-name">{{food.name}}</div>
                                    <div class="description" v-if="food.description">{{food.description}}</div>
                                    <div class="rating">
                                        <span class="count">月售{{food.sellCount}}份</span> 
                                        <span class="well-rating">好评率{{food.rating}}%</span>
                                     </div>
                                    <div class="price">
                                         <span class="new-price">￥{{food.price}}</span>
                                         <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <!-- 商品添加 减少控件  把当前foods->food的数据传给组件 该组件进行该商品的数量计算-->
                                    <div class="cartControl">
                                       <cart-control :food="food"></cart-control>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
        <div class="shop-cart">
           <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shop-cart>
        </div>
    </div>
</template>

<script>
// 导入字体包
import "../font/iconfont.css";
import BScroll from "better-scroll";
import shopCart from "./shopCart";
import cartControl from "./cartControl";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [], //存放li高度
      scrollY: 0 //存放内容区滚动位置
    };
  },
  created() {
    this.getData();
    this.classMap = [
      "decrease",
      "discount",
      "special",
      "invoice_3",
      "guarantee"
    ];
  },

  methods: {
    //获取数据
    getData() {
      this.$http.get("../../static/data.json").then(res => {
        this.goods = res.body.goods;
        // 4.dom结构加载结束后this.$nextTick() 才能监听元素的滚动位置的节点
        this.$nextTick(() => {
          this._initScroll();
          this._calcuHeight();
        });
      });
    },
    // 1.计算高度
    _calcuHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list"); //获取到每个菜单对应的li区域
      let height = 0;
      this.listHeight.push(height); //第一个li在页面中的height一定为0；
      for (let i = 0; i < foodList.length; i++) {
        let li = foodList[i];
        height += li.clientHeight; //第一个li1=0，li2：页面高度是之前li的高度和
        this.listHeight.push(height);
      }
      // console.log(this.listHeight);
    },

    //2.计算滚动条的位置
    _initScroll() {
      // 先下载better-scroll插件 import 包
      //获取menu区和内容区
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3 //探针作用，实时监测滚动的位置
      });
      // 计算滚动位置,因为坐标轴向下 所以取到的位置是负值
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 点击事件，点击左边菜单，显示右边相应index部分
    selectContent(index, event) {
      let foodList = this.$refs.foodList; //获取内容区每个food部分
      let ele = foodList[index];
      this.foodScroll.scrollToElement(ele, 300); //滑动到指定的food位置
    }
  },

  //3.计算属性，根据动态变化的scrollY来计算当前内容区滚动到第几个li(index),返回index让左侧菜单区高亮到相应区域
  //4.dom 中
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // console.log(this.scrollY,height1,height2);
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // 在height1位置 或者当前已经是最后一个li没有height2的时候
          // console.log(i);
          return i;
        }
      }
      return 0;
    },
    // 当goods组件通过prop传值给cartControl组件中的food，food进行添加count属性后 ,因为是引用传值修改
    //this.goods中的商品foods也将会有count属性，
    //当count++后需要购物车做出联动反应 ，即就是拿出有count的商品(food)
    selectFoods() {
      let myFoods = [];
      if (this.goods.length != 0) {
        this.goods.forEach(type => {
          type.foods.forEach(myFood => {
            if (myFood.count) {
              myFoods.push(myFood);
            } else {
              return;
            }
          });
        });
      }
      return myFoods;
    }
  },
  components: {
    shopCart,
    cartControl
  }
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.wrapper-good {
  width: 100%;
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 48px;
  right: 0;
  left: 0;
  overflow: hidden;
  .wrapper-left {
    // overflow-y: scroll; //设置滚动条
    width: 80px;
    flex: 0 0 80px;
    background: #f3f5f7;
    //设置高亮模式  当滑动或者点击到相应的位置的时候

    .title {
      height: 54px;
      font-weight: 200;
      font-size: 12px;
      padding: 0 12px;
      text-align: center;
      display: table;
      //高亮模式
      &.current {
        background: #fff;
        font-size: 14px;
        font-weight: 700;
        position: relative;
        margin-top: -1px;
        margin-bottom: -1px;
      }

      .item {
        display: table-cell; //多行文字垂直居中
        vertical-align: middle;
        list-style: none;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        width: 61px;
        &.current2 {
          border-bottom: 0;
        }
        .decrease,
        .invoice_3,
        .guarantee,
        .special,
        .discount {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-size: cover;
          float: left;
          margin-top: 4px;
          margin-right: 4px;
        }
        //啊 是坑啊  要设置背景图片铺满cover  一定要写bakckground-image 不能写background
        .decrease {
          background-image: url("../assets/images/decrease_1@3x.png");
        }
        .invoice_3 {
          background-image: url("../assets/images/invoice_3@3x.png");
        }
        .special {
          background-image: url("../assets/images/special_1@3x.png");
        }
        .guarantee {
          background-image: url("../assets/images/guarantee_3@3x.png");
        }
        .discount {
          background-image: url("../assets/images/discount_3@3x.png");
        }
      }
    }
  }
  .wrapper-right {
    flex: 1;
    background: #fff;
    list-style: none;
    // overflow-y: scroll;
    // background:red;
    .item {
      margin-bottom: 18px;
      .item-title {
        height: 26px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
        border-left: 2px solid #d9dde1;
        line-height: 26px;
        padding-left: 14px;
      }
      .food {
        margin: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .food-content {
          padding-bottom: 18px;
          .img {
            vertical-align: top;
            display: inline-block;
          }
          .info {
            display: inline-block;
            margin-left: 10px;
            @width: 150px;
            width: @width;
            .food-name {
              width: @width;
              font-size: 14px;
              color: rgb(7, 17, 27);
              line-height: 14px;
            }
            .description {
              font-size: 10px;
              color: rgb(147, 153, 159);
              padding-top: 4px;
              width: @width;
              overflow: hidden;
            }
            .rating {
              width: @width;
              padding: 4px 0;
              font-size: 10px;
              color: rgb(147, 153, 159);
              .count {
                margin-right: 12px;
              }
            }
            .price {
              display: inline-block;
              font-size: 14px;
              font-weight: bold;
              line-height: 24px;
              .new-price {
                color: rgb(240, 20, 20);
                margin-right: 8px;
              }
              .old-price {
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .cartControl {
              position: absolute;
              right: 0;
              display: inline-block;
              width: 100px;
              // text-align:center;
              // top:50px;
            }
          }
        }
      }
    }
    li {
      list-style: none;
    }
    img {
      margin-top: 0;
      width: 60px;
      height: 60px;
      border-radius: 12px;
    }
  }
}
</style>

