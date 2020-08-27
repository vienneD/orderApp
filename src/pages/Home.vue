<template>
  <div class="home">
    <div class="home-top">
      <van-row gutter="10">
        <van-col span="8">
          <van-image width="100" height="100" :src="GETHEADIMG+storelist.avatar" />
        </van-col>
        <van-col span="16" @click="showchange">
          <h3>
            <span>品牌</span>
            {{ storelist.name }}
          </h3>

          <p>{{storelist.description}}/配送时间{{storelist.deliveryTime}}分钟</p>
          <p style="font-size:0.7rem" v-for="item in storelist.supports" :key="item">
            <span class="tag">满</span>
            <span>{{item}}</span>
          </p>
        </van-col>
      </van-row>
      <van-row style="background-color:rgb(0,0,0,0.1);line-height:1.3rem">
        <van-col span="24">
          <van-notice-bar
            left-icon="volume-o"
            style="background-color:rgb(0,0,0,0.2);color:#fff;"
            :text="storelist.bulletin"
          />
          <!-- <span style="color: #333;background-color: #fff;margin-left:0.3rem">公告</span> -->
        </van-col>
      </van-row>
    </div>
    <van-tabs
      v-model="active"
      color="#FFCF32"
      title-active-color="title-active-color"
      style="border-bottom:1px solid #eee;height:40px"
    >
      <van-tab :title="item.title" :to="item.to" v-for="(item,index) in activelist" :key="index"></van-tab>
    </van-tabs>
    <router-view></router-view>

    <transition name="slide-fade">
      <div v-show="checkgoodslist_X.length>0&&showPopup"  class="order-shopcar">
        <shopcar />
      </div>
    </transition>

    <van-row class="selectedshop" @click="checkshopcar">
      <van-col span="5" style="border-right:4px solid #fff;height:3.5rem">
        <div style="margin:0.4rem;font-size:1.1rem;text-align:center;">
          <van-icon name="smile-o" />
          <p style="font-size:0.6rem">联系商家</p>
        </div>
      </van-col>
      <van-col span="19">
        <van-row>
          <van-col span="5">
            <div :class="this.checkgoodslist_X.length>0?'isordergoods':'noordergoods'">
              <van-icon
                name="shopping-cart-o"
                color="#333"
                size="1.8rem"
                style="margin-top:10px"
                :badge="totalgoods_X.num"
              />
            </div>
          </van-col>
          <van-col span="13">
            <p style="font-size:1.1rem;color:#fff;line-height:30px">￥{{totalgoods_X.total.toFixed(2)}}</p>
            <p style="font-size:0.6rem;line-height:20px">另需配送费￥4元|支持自取</p>
          </van-col>
          <van-col span="6">
            <p style="" :class="this.checkgoodslist_X.length>0?'isorder':'noorder'">{{this.checkgoodslist_X.length>0?'去结算':'￥20元起送'}}</p>
          </van-col>
        </van-row>
      </van-col>
    </van-row>

    <van-overlay :show="show" @click="showchange">
      <div class="wrapper" style="color:#fff;padding:20px">
        <h2 style="line-height:60px;text-align:center;">{{ storelist.name }}</h2>
        <div style="text-align:center;">
          <van-rate
            v-model="storelist.score"
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            readonly
          />
        </div>
        <van-divider
          :style="{ fontSize:'1.2rem', color: '#fff', borderColor: '#ccc', padding: '0 16px' }"
        >优惠信息</van-divider>
        <p v-for="item in storelist.supports" :key="item">
          <span class="tag">满</span>
          {{item}}
        </p>
        <div>
          <van-divider
            :style="{ fontSize:'1.2rem', color: '#fff', borderColor: '#ccc', padding: '0 16px' }"
          >商家公告</van-divider>
          <p>{{storelist.bulletin}}</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { store, GETHEADIMG } from "@/apis/api";
import shopcar from "@/pages/Shopcar";
export default {
  components: {
    shopcar,
  },
  data() {
    return {
      GETHEADIMG: "",
      show: false,
      storelist: {},
      activelist: [
        {
          title: "商品",
          to: "/",
        },
        {
          title: "评价",
          to: "/comment",
        },
        {
          title: "商家",
          to: "/about",
        },
      ],
      active: 0,
      shopcarshow: false,
      showPopup: false,
      total: 0,
    };
  },
  methods: {
    showchange() {
      this.show = !this.show;
    },
    checkshopcar() {
      this.showPopup = !this.showPopup;
      // if (this.checkgoodslist_X.length > 0) {
        
      // }
    },
  },
  created() {
    this.GETHEADIMG = GETHEADIMG;
    store().then((res) => {
      res.data.data.avatar = res.data.data.avatar.slice(
        res.data.data.avatar.indexOf("15")
      );
      this.storelist = res.data.data;
    });
  },
  computed: {
    checkgoodslist_X() {
      return this.$store.getters.checkgoodslist;
    },
    totalgoods_X(){
      return this.$store.getters.totalgoods
    }
  },
  watch: {
    $route(to) {
      console.log(to);
      if (to.path == "/") {
        this.active = 0;
      } else if (to.path == "/comment") {
        this.active = 1;
      } else if (to.path == "/about") {
        console.log(2);
        this.active = 2;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(400px);
  opacity: 0;
}
.isorder {
  text-indent:10px;
  line-height:60px;
  background-color: #f9c52c;
  color: #333;
  border-top-right-radius: 40%;
  border-bottom-right-radius: 40%;
}
.isordergoods {
  border-radius: 50%;
  height: 100%;
  text-align: center;
  margin: 0.3rem;
  background: #f9c52c;
}
.noordergoods {
  border-radius: 50%;
  height: 100%;
  text-align: center;
  margin: 0.3rem;
  background: #5c5c5c;
}
.noorder {
  text-indent:10px;
  line-height:60px;
  background-color: #5c5c5c;
  color: #333;
  border-top-right-radius: 40%;
  border-bottom-right-radius: 40%;
}
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .home-top {
    padding: 1rem;
    background-color: #663333;
    color: #fff;
    height: 140px;
  }
}
h3 {
  line-height: 30px;
  font-size: 1rem;
  span {
    color: #fff;
    background-color: red;
  }
}
p {
  text-indent: 0.1rem;
  font-size: 0.8rem;
  line-height: 20px;
  .tag {
    color: red;
    background-color: #fff;
  }
}
span {
  font-size: 0.6rem;
  padding: 0.1rem;
  margin-right: 0.1rem;
}
.order-shopcar {
  width: 100%;
  position: fixed;
  bottom: 40px;
  left: 0;
}
.selectedshop {
  background-color: rgb(39, 39, 39);
  border-radius: 5rem;
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0;
  line-height: 2rem;
  color: #ccc;
}
</style>
