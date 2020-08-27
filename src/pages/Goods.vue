<template>
  <div style="background-color:#eee;overflow-y:scroll">
    <van-image width="100%" height="300" :src="GETIMG+getgooddesc.imgUrl" />
    <div style="background-color:#fff;padding:1rem">
      <h3>{{getgooddesc.name}}</h3>
      <p>
        <span>{{getgooddesc.rating}}</span>
        <span>好评率</span>
      </p>
      <van-row style="line-height:3rem;">
        <van-col span="14">
          <span style="color:red;font-size:1.1rem">￥{{getgooddesc.price}}</span>
          <span style="color:#ccc;text-decoration: line-through;font-size:0.8rem">￥{{getgooddesc.price}}</span>
        </van-col>
        <van-col span="10">
          <div class="shopcar">
            <van-icon name="shopping-cart" size="22"/> <span>加入购物车</span> 
          </div>
        </van-col>
      </van-row>
    </div>

    <div style="background-color:#fff;margin-top:1rem">
      <h3>商品介绍</h3>
      <p>{{getgooddesc.goodsDesc}}</p>

      <van-tabs v-model="active" background="#fff" type="card" color="#FFC300">
        <van-tab :title="item.title" v-for="(item,index) in commentlist" :key="index">
          <van-row style="padding:1rem" v-for="(child,index) in
          getgooddesc.ratings " :key="index">
            <van-col span="4">
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="GETIMG+child.avatar.slice(child.avatar.indexOf('de'))"
              />
            </van-col>
            <van-col span="20">
              <van-row
                type="flex"
                justify="space-between"
                style="font-size:0.8rem;line-height:1.5rem"
              >
                <van-col span="3">{{child.username}}</van-col>
                <van-col span="10">{{child.rateTime}}</van-col>
              </van-row>
              <van-row type="flex">
                <van-col span="8">
                  <van-rate
                    v-model="value"
                    :size="12"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                </van-col>
                <van-col span="6" style="font-size:0.8rem;color:#ccc">20分钟送达</van-col>
              </van-row>
              <van-row>
                <van-col span="24">
                    <p >{{child.text}}</p>
                </van-col>
              
              </van-row>
              <div>
                <van-icon name="good-job" color="#F9C52C" />
                <!-- <van-tag plain type="primary" color="#ccc">标签</van-tag> -->
              </div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {GETIMG} from "@/apis/api";
import {changetime} from "@/util/util"
export default {
  data() {
    return {
      GETIMG:'',
      commentlist: [
        {
          title: "全部",
        },
        {
          title: "推荐",
        },
        {
          title: "吐槽",
        },
      ],
      active:0,
      value:5,
    };

  },
  created(){
     this.GETIMG=GETIMG
  },
  computed:{
    getgooddesc(){
        for(let obj of this.$route.query.ratings ){
          obj.rateTime=changetime(obj.rateTime)
        }
         return this.$route.query
    },

   
  }
};
</script>

<style lang="less" scoped>
.shopcar {
  width: 100%;
  line-height: 3rem;
  background-color: #f9c52c;
  border-radius: 2rem;
  text-align: center;
}
</style>