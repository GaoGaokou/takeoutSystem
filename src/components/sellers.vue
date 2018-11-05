<template>
    <div class="wrapper">
        <div class="wrapper-header">
            <div class="header-seller">
                <div class="header-name">{{seller.name}}</div>
                <div class="comment">
                    <div class="comment-star">
                        <img src="../assets/images/star36_on@2x.png" alt="">
                        <img src="../assets/images/star36_on@2x.png" alt="">
                        <img src="../assets/images/star36_on@2x.png" alt="">
                        <img src="../assets/images/star36_on@2x.png" alt="">
                        <img src="../assets/images/star36_on@2x.png" alt="">
                    </div>
                    <span class="saleCount">月售{{seller.sellCount}}份</span> 
                </div>
                <div class="like">
                    <span class="iconfont icon-favorite"></span>
                    <span class="receive">收藏</span>
                </div>
            </div>
            <div class="header-info">
                <div class="min-price">
                    <span> 起送价<span class="bold">{{seller.minPrice}}</span >元</span>  
                </div> 
                <div class="delivery-fee">
                    <span>商家配送<span class="bold">{{seller.deliveryPrice}}</span>元</span>
                </div>
                <div class="time">
                    <span>平均配送时间<span class="bold">{{seller.deliveryTime}}</span>分</span>
                </div>
            </div>
        </div>
        <div class="border"></div>
        <!-- 优惠信息 -->
        <div class="wrapper-sale">
            
            <div class="sale-info">
                <h4>公告与活动</h4>
                <p class="info">{{seller.bulletin}}</p>
            </div>
            <div class="sale-surpport">
                <ul>
                    <li class="item" v-for="(item,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span >{{item.description}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="border"></div>

        <!-- 商家实景 -->
        <div class="seller">
            <div class="h4"> <h4>商家实景</h4></div>
            <ul>
                <li class="item" v-for="(img,index) in seller.pics" :key="index">
                    <img :src="img" alt="">
                </li>
            </ul>
        </div>
        <div class="border"></div>
        <!-- 商家信息 -->
        <div class="inform">
            <div class="mess">商家信息</div>
            <ul>
                <li class="item" v-for="(item,index) in seller.infos" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      classMap: []
    };
  },
  created() {
    this.classMap = [
      "decrease",
      "discount",
      "special",
      "invoice_3",
      "guarantee"
    ];
  }
};
</script>

<style lang="less" >
.wrapper {
  width: 100%;
  font-size: 12px;
  color: rgb(7, 17, 27);
  font-weight: 200;
  line-height: 16px;
  .wrapper-header {
    background-color: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .header-seller {
      position: relative;
      padding: 18px;
      padding-bottom: 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .header-name {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .comment {
        height: 36px;
        .comment-star {
          display: inline-block;
          img {
            height: 100%;
            width: 10px;
          }
        }
        .saleCount {
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 18px;
          margin-left: 12px;
        }
      }
      .like {
        position: absolute;
        right: 18px;
        top: 15px;
        .icon-favorite {
          color: rgb(240, 20, 20);
          font-size: 24px;
          line-height: 24px;
        }
        .receive {
          display: block;
          font-size: 10px;
          color: rgb(77, 85, 93);
          line-height: 10px;
          margin-top: 4px;
        }
      }
    }
    .header-info {
      padding: 18px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      display: flex;
      width: 100%;

      div {
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        span {
          display: inline-block;
          text-align: center;
        }
      }

      .bold {
        white-space: nowrap;
        font-size: 24px;
        font-weight: 200;
        color: rgb(7, 17, 27);
        line-height: 24px;
        margin-top: 8px;
        display: block;
      }
      .min-price {
        flex: 1;
      }
      .delivery-fee {
        flex: 1;
      }
      .time {
        flex: 1;
      }
    }
  }
  .border {
    height: 20px;
    width: 100%;
    background: rgba(147, 153, 159, 0.5);
  }
  .wrapper-sale {
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 18px;
    background: #fff;
    font-size: 12px;
    color: rgb(7, 17, 27);

    .sale-info {
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      h4 {
        font-size: 14px;
        color: rgb(7, 17, 27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .info {
        color: rgb(240, 20, 20);
        font-weight: 200;
        padding: 0 12px;
      }
    }
    .sale-surpport {
      list-style: none;
      .item {
        list-style: none;
        padding: 16px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 14px;
          height: 16px;
          background-size: cover;
          float: left;
          margin-right: 12px;
          &.decrease {
            background-image: url("../assets/images/decrease_1@3x.png");
          }
          &.invoice_3 {
            background-image: url("../assets/images/invoice_3@3x.png");
          }
          &.special {
            background-image: url("../assets/images/special_1@3x.png");
          }
          &.guarantee {
            background-image: url("../assets/images/guarantee_3@3x.png");
          }
          &.discount {
            background-image: url("../assets/images/discount_3@3x.png");
          }
        }
      }
    }
  }
  .seller {
    background: rgba(147, 153, 159, 0.5);
    padding: 18px;
    background: #fff;
    text-align: center;
    .h4 {
      font-size: 12px;
      text-align: left;
      margin-left: 5px;
      margin-bottom: 8px;
    }
    .item {
      height: 94px;
      width: 120px;
      list-style: none;
      display: inline-block;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
  }
  .inform{
      
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    padding: 18px;
    background: #fff;
    font-size: 12px;
    color: rgb(7, 17, 27);
      .item {
        list-style: none;
        padding: 16px;
        border-bottom: 1px solid rgba(7, 17, 27,0.2);
      }
  }

}
</style>

