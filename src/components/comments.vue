<template>
    <div class="wrapper">
        <div class="score">
            <div class="seller-score">
                <div class="num">{{seller.score}}</div>
                <div class="mess1">综合评分</div>
                <div class="mess2">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="star-score com-style">
                <div class="service-score com-style">
                    <span class="before">服务态度</span>
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_off@2x.png" alt="">
                    <span class="after">{{seller.serviceScore}}</span>
                </div>
                <div class="food-score com-style">
                    <span class="before">服务态度</span>
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_on@2x.png" alt="">
                    <img src="../assets/images/star36_off@2x.png" alt="">
                    <span class="after">{{seller.serviceScore}}</span>
                </div>
                <div class="time" >
                    <span>送达时间</span>
                    <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <div class="border"></div>
        <div class="content">
            <div class="altitude">
                <ul>
                    <li class="all" >全部 </li>
                    <li class="good" >满意</li>
                    <li class="bad" >不满意</li>
                </ul>
            </div>
            <div class="comment-content">
                <ul>
                    <li class="item" v-for="(item,index) in ratings" :key="index" v-show="item.text ">
                       <div class="avatar">
                           <span><img :src="item.avatar" alt=""></span>
                           <div class="star">
                               <span class="name">{{item.username}}</span>
                               <span class="delivery-time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>  
                           </div>
                           <div class="comment-time">{{getDate(item.rateTime)}}</div>
                           
                       </div>
                       <div class="comment">{{item.text}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ratings:{},
            seller:{},
            flag:0,
        }
    },
    
    computed:{
          show(){
              
             return 'item.score<3';
          }
    },
    methods:{
        // 格式化时间
       array(num){
           if(num==1){
               
           }else if(num==2){
               
           }else if(num==3){
               
           }
        },
 
       
        getDate(time){
            let date=new Date(time);
            let Y=date.getFullYear()+"-"
            let M=(date.getMonth()+1)<10?'0'+date.getMonth()+'-':date.getMonth()+"-";
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let  m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D+h+m+s;
        },
        
    },
    created(){
         this.$http.get('../../static/data.json').then(res=>{
           this.seller=res.body.seller;
           this.ratings=res.body.ratings;
            //  console.log(this.seller);
          })
    }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  width: 100%;
  font-size: 12px;
  color: rgb(7, 17, 27);
  line-height: 18px;
  .score {
    width: 100%;
    padding: 18px;
    border-bottom: 1px solid rgba(147, 153, 159, 0.2);
    .seller-score {
      display: inline-block;
      border-right: 1px solid rgba(7, 17, 27, 0.2);
      width: 135px;
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      vertical-align: center;
      .num {
        font-size: 24px;
        color: rgb(255, 153, 0);
        line-height: 28px;
      }
      .mess1 {
        margin-top: 6px;
      }
      .mess2 {
        font-size: 10px;
        margin-top: 8px;
        margin-bottom: 6px;
        color: rgba(7, 17, 27, 0.4);
        line-height: 10px;
      }
    }
    .star-score {
      box-sizing: border-box;
      display: inline-block;
      width: 237px;
      padding: 0 24px;
      margin: 0;
      .com-style {
        vertical-align: top;
        line-height: 18px;
        margin-bottom: 8px;
        .before {
          margin-right: 12px;
        }
        .after {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(255, 153, 0);
          line-height: 18px;
        }
        img {
          width: 15px;
          height: 15px;
        }
      }
      .delivery-time {
        color: rgba(147, 153, 159);
        margin-left: 12px;
      }
    }
  }
  .border {
    height: 20px;
    width: 100%;
    background: rgba(147, 153, 159, 0.2);
    border-bottom: 1px solid rgba(147, 153, 159, 0.4);
  }
  .content {
    .altitude {
      border-bottom: 1px solid rgba(147, 153, 159, 0.4);
      padding: 18px;
      li {
        display: inline-block;
        padding: 12px;
        width: 50px;
        text-align: center;
        margin-right: 4px;
      }
      .all {
        background: burlywood;
      }
      .good {
        background: yellowgreen;
      }
      .bad {
        background: grey;
      }
    }
    .comment-content {
      padding: 18px;
      .item {
        padding: 18px 0;
        border-bottom: 1px solid rgba(147, 153, 159, 0.4);
        list-style: none;
        .avatar {
          position: relative;
          margin-bottom: 6px;
          div {
            display: inline-block;
          }
          span {
            display: inline-block;
          }
          .star {
            vertical-align: top;
            margin-left: 12px;
            .delivery-time {
              display: block;
              font-weight: 200;
              color: rgb(147, 153, 159);
              line-height: 12px;
              font-size: 10px;
            }
          }
          .name {
            font-size: 10px;
            line-height: 12px;
          }
          img {
            margin-top: 0px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .comment-time {
            position: absolute;
            right: 0;
          }
        }
        .comment {
          margin-left: 43px;
        }
      }
    }
  }
}
</style>

