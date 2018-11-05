<template>
<!-- // 图片src动态添加   -->
    <div class="nav">
        <div class="nav-top">
            <img :src="seller.avatar" alt="" class="sellerImg">
            <div class="info">
                <div class="infoName">
                    <span class="band"></span>
                    <span class="band-name">{{seller.name}}</span>
                </div>
                <div class="deli">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
                    <!-- //通过改变类属性动态添加图片和打折的详细信息 -->
                    <div v-if="seller.supports">
                        <span  :class="classMap[seller.supports[0].type]" ></span>
                        <span class="description">{{seller.supports[0].description}}</span>

                    </div>
                   <div class="goodNum" v-if="seller.supports">
                      <div>{{seller.supports.length}}个</div>
                 </div>
            </div>
           
        </div>
        <div class="nav-bottom">
            <span class="bulletin-icon"></span>
            <span class="bulletin">{{seller.bulletin}}</span>
        </div>
        <div class="background">
          <img :src="seller.avatar" alt="">
        </div>
    </div>
</template>

<script>
import blurImg from '../assets/gaussBlur.js'
export default {
  props: ["seller"],
  data() {
    return {};
  },
  created() {
    //动态给打折项目添加图片
    this.classMap = [
      "decrease",
      "discount",
      "special",
      "invoice_1",
      "guarantee"
    ];
  },
  methods:{
    //   blurImg(seller.avatar,"nav");

  }
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.nav {
  position:relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgba(7, 17, 27, 0.5);
  // &::after {
  //   content: " ";
  //   display: block;
  //   clear: both;
  // }

  .sellerImg {
    width: 70px;
    height: 70px;
    border-radius: 4px;
    margin-top: 24px;
    margin-left: 24px;
    margin-bottom: 18px;
    float: left;
  }
  
  .info {
    margin-left: 104px;
    padding-left: 16px;
    padding-top: 12px;
    color: #fff;
    position: relative;
    .band {
      margin-top: 12px;
      width: 42px;
      height: 25px;
      display: inline-block;
      background: url("../assets/images/brand@2x.png") no-repeat;
      background-size: contain;
      float: left;
    }
    .band-name {
      margin-top: 5px;
      margin-left: 12px;
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      line-height: 36px;
    }
    .deli {
      display: inline-block;
      font-weight: 200;
      line-height: 10px;
      font-size: 12px;
      text-align: left;
      padding-left: 0;
    }
    .decrease,
    .invoice_1,
    .discount,
    .guarantee,
    .special {
      // border:1px solid red;
      margin-top: 4px;
      width: 20px;
      height: 20px;
      display: inline-block;
      background-size: cover;
      float: left;
    }
    .decrease {
      background-image: url("../assets/images/decrease_1@3x.png");
    }
    .invoice_1 {
      background-image: url("../assets/images/invoice_1@3x.png");
    }
    .discount {
      background-image: url("../assets/images/discount_1@3x.png");
    }
    .guarantee {
      background-image: url("../assets/images/guarantee_1@3x.png");
    }
    .special {
      background-image: url("../assets/images/special_1@3x.png");
    }

    .description {
      margin-left: 5px;
      margin-top: 8px;
      font-size: 12px;
      display: inline-block;
      line-height: 12px;
      display: inline-block;
    }
    .goodNum {
      color: rgb(255, 255, 255);
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 7px 8px;
      font-size: 10px;
      border-radius: 12px;
      background-color: rgba(0, 0, 0, 0.2);
      height: 12px;
      line-height: 12px;
    }
  }
  .nav-bottom {
    margin-top: 23px;
    position: relative;
    height: 28px;
    background-color: rgba(7, 17, 27, 0.2);
    padding: 0 24px 0 12px;
    line-height: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: white;
    font-size: 12px;
    span {
      display: inline-block;
      text-align: left;
    }
    .bulletin-icon {
      margin-left: 0px;
      vertical-align: middle;
      width: 22px;
      height: 12px;
      background-image: url("../assets/images/bulletin@2x.png");
      background-size: cover;
    }
  }
  .background{
     position:absolute;
     left:0;
     top:0;
     width:100%;
     filter:blur(10px);
     z-index: -1;
     overflow: hidden;
     img{
       width:100%;
       background-size:contain;
     }
  }
}

</style>

