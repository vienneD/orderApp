<template>
  <div class="order-box">
    <div class="order-left">
      <div>
        <van-sidebar v-model="active"  >
          <van-sidebar-item
            :title="item.name"
            v-for="(item,index) in classlist_X"
            :key="index"
            :id="'0'+index"
            @click="clickaside"
          />
        </van-sidebar>
        <div style="height:3.6rem"></div>
      </div>
    </div>

    <div class="order-right">
      <div>
        <div v-for="(item,index) in classlist_X" :key="index" :id="index">
          <h4 style="text-indent:10px;background-color:#eee">{{item.name}}</h4>
          <van-card
            v-for="(child,index) in item.foods"
            :key="index"
            :price="child.price.toFixed(2)"
            :desc="child.goodsDesc"
            :title="child.name"
            centered
            :thumb="GETIMG+child.imgUrl"
            @click-thumb="checkcontent(child)"
          >
            <template #footer>
              <div style="display:flex;justify-content: flex-end;">
                <svg
                  @click="changenum(-1,child.id)"
                  v-show="child.num>0"
                  t="1598258732266"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2245"
                  width="30"
                  height="30"
                >
                  <path
                    d="M512 0c-285.257143 0-512 226.742857-512 512s226.742857 512 512 512 512-226.742857 512-512-226.742857-512-512-512z m0 950.857143c-241.371429 0-438.857143-197.485714-438.857143-438.857143s197.485714-438.857143 438.857143-438.857143 438.857143 197.485714 438.857143 438.857143-197.485714 438.857143-438.857143 438.857143z"
                    p-id="2246"
                    fill="#F9C52C"
                  />
                  <path
                    d="M731.428571 475.428571h-438.857142c-21.942857 0-36.571429 14.628571-36.571429 36.571429s14.628571 36.571429 36.571429 36.571429h438.857142c21.942857 0 36.571429-14.628571 36.571429-36.571429s-14.628571-36.571429-36.571429-36.571429z"
                    p-id="2247"
                    fill="#F9C52C"
                  />
                </svg>
                <span style="font-size:20px;padding:5px;" v-show="child.num>0">{{child.num}}</span>
                <van-icon name="add" color="#F9C52C" size="30px" @click="changenum(1,child.id)" />
              </div>
            </template>
          </van-card>
        </div>
        <div style="height:3.6rem"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getgoods, GETIMG } from "@/apis/api";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      active: 0,
      // showbtn:false,
      choosenum: 1,
      GETIMG: "",
      showbtn: false,
    };
  },
  created() {
    this.GETIMG = GETIMG;
    getgoods().then((res) => {
      this.$store.commit("changelist", res.data.goodsList);
    });
  },
  mounted() {
    this.leftscroll = new Bscroll(".order-left", {
      click: true,
    });
    this.rightscroll = new Bscroll(".order-right", {
      click: true,
      probeType: 3,
    });
    // leftscroll;
    this.rightscroll.on("scroll", (obj) => {
      //  console.log(Math.abs(obj.y))

      for (let key of this.getgoodsarr) {
        if (Math.abs(obj.y) >= key.startY && Math.abs(obj.y) < key.endY) {
          this.active = key.index;
          this.leftscroll.scrollToElement(
            document.getElementById("0" + key.index),
            500
          );
        }
      }

      //  console.log(this.getgoodsarr)
    });
  },
  methods: {
    changenum(num, id) {
      this.$store.commit("changeordernum", {
        num,
        id,
      });
    },
    checkcontent(child) {
      // console.log(child);
      this.$router.push({ path: "/goods", query: child });
    },
    clickaside(index) {
      // console.log(index)
      this.rightscroll.scrollToElement(document.getElementById(index), 500);
    },
  },
  computed: {
    classlist_X() {
      // console.log(this.$store.state.classlist)
      return this.$store.state.classlist;
    },
    getgoodsarr() {
      var goodsarr = [];
      var total = 0;
      for (let i = 0; i < this.classlist_X.length; i++) {
        //  console.log(document.getElementById(i).offsetHeight)
        goodsarr.push({
          startY: total,
          endY: total + document.getElementById(i).offsetHeight,
          index: i,
        });
        total += document.getElementById(i).offsetHeight;
      }
      return goodsarr;
    },
  },
};
</script>

<style lang="less" scoped>
.order-box {
  flex: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  .order-left {
    width: 80px;
    height: 100%;
    overflow: scroll;
  }
  .order-right {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
}
/deep/.van-stepper--round .van-stepper__plus {
  color: #fff;
  background-color: #f9c52c;
}
/deep/.van-stepper--round .van-stepper__minus {
  color: #f9c52c;
  background-color: #fff;
  border: 1px solid #f9c52c;
}
</style>