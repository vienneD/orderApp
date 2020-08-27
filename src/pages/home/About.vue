<template>
  <div class="about">
    <van-row gutter="30" class="about-top">
      <van-col span="18">
        <h5 style="font-size:1.1rem">{{storelist.name}}</h5>
        <p>
          <van-rate
            v-model="storelist.score"
            :size="18"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            readonly
          />
          <span>月售{{storelist.sellCount}}单</span>
        </p>
      </van-col>
      <van-col span="6" style="text-align:center;margin-top:1rem">
        <van-icon name="like" color="red" />
        <p>已收藏</p>
      </van-col>
    </van-row>
    <van-row class="about-desc">
      <van-col span="8">
        <p>起送价</p>
        <p>{{storelist.deliveryPrice}}元</p>
      </van-col>
      <van-col span="8">
        <p>商家起送</p>
        <p>{{storelist.minPrice}}元</p>
      </van-col>
      <van-col span="8">
        <p>平均配送时间</p>
        <p>{{storelist.deliveryTime}}元</p>
      </van-col>
    </van-row>
    <div class="about-activy">
      <h1 style="font-weight:normal;font-size:1.5rem">活动与公告</h1>
      <p style="text-indent:0.6rem">{{storelist.bulletin}}</p>
      <div class="label" v-for="item in storelist.supports" :key="item">
        <span>折</span>
        {{item}}
      </div>
    </div>

    <div style="height:60px"></div>
  </div>
</template>

<script>
import { store } from "@/apis/api";
export default {
  data() {
    return {
      storelist: {},
    };
  },
  created() {
    store().then((res) => {
      console.log(res.data);
      this.storelist = res.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.about {
  flex: 1;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  .about-top {
    padding: 20px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    h5 {
      line-height: 40px;
    }
    p {
      line-height: 30px;
    }
  }
  .label {
    margin-top:10px;
    line-height:30px;
    span {
      padding: 3px;
      color: #fff;
      background-color: red;
    }
  }
  .about-desc {
    text-align: center;
    background-color: #fff;
    line-height: 30px;
  }
  .about-activy {
    padding: 20px;
    flex: 1;
    margin-top: 1rem;
    background-color: #fff;
  }
}
</style>