<template>
  <div class="comment">
    <div>
      <van-row gutter="20" class="comment-top">
        <van-col span="8" class="comment-left">
          <p style="font-size:1.5rem;color:#F9C52C;">5.0</p>
          <p style="font-size:1rem;line-height:20px">综合评分</p>
          <p style="font-size:0.6rem;color:#333;line-height:30px;">高于周边商家96%</p>
        </van-col>
        <van-col span="16">
          <p>
            <span>服务态度</span>
            <van-rate
              v-model="value"
              :size="14"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </p>
          <p>
            <span>菜品质量</span>
            <van-rate
              v-model="value"
              :size="14"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </p>
          <p>
            <span>送达时间</span>
            <span style="color:#333">20分钟</span>
          </p>
        </van-col>
      </van-row>

      <van-tabs
        v-model="active"
        @click="tabclickbtn"
        background="#fff"
        type="card"
        color="#FFC300"
        style="flex:1;display:flex;flex-direction: column;"
      >
        <van-tab :title="item.title" :name='item.name' v-for="(item,index) in commentlist" :key="index">
          <!-- 评论 -->
          <van-row
            style="padding:1rem;overflow:scroll;flex:1;"
            v-for="(item,index) in changelist "
            :key="index"
          >
            <van-col span="4">
              <van-image round width="2.5rem" height="2.5rem" :src="item.avatar" />
            </van-col>
            <van-col span="20">
              <van-row
                type="flex"
                justify="space-between"
                style="font-size:0.8rem;line-height:1.5rem"
              >
                <van-col span="6">{{item.username}}</van-col>
                <van-col span="12">{{item.rateTime}}</van-col>
              </van-row>
              <van-row type="flex">
                <van-col span="8">
                  <van-rate
                    v-model="item.score"
                    :size="12"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                </van-col>
                <van-col span="10" style="font-size:0.8rem;color:#ccc">{{item.deliveryTime}}分钟送达</van-col>
              </van-row>
              <p style="line-height:1rem">{{item.text}}</p>
              <div>
                <van-icon name="good-job" color="#F9C52C" />
                <van-tag
                  plain
                  type="primary"
                  color="#ccc"
                  v-for="keys in item.recommend"
                  :key="keys"
                >{{keys}}</van-tag>
              </div>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { goodscomment } from "@/apis/api";
import { changetime } from "@/util/util";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      value: 5,
      active: -1,
      status:0,
      commentlist: [
        {
          title: "全部",
          name:-1,
        },
        {
          title: "满意",
           name:0,
        },
        {
          title: "不满意",
          name:1,
        },
      ],
      commentdesc: [],
    };
  },
  created() {
    this.render();
  },
  mounted() {
    // console.log(document.querySelector('.comment'))
    let Allscroll = new Bscroll(".comment", {
      click: true,
    });
    Allscroll;
  },
  methods: {
    tabclickbtn(name) {
      this.status=name;
     
      
    },
    render() {
      goodscomment().then((res) => {
        for (var obj of res.data.data) {
          obj.rateTime = changetime(obj.rateTime);
        }
        this.commentdesc = res.data.data;
      });
    },
  },
  computed:{
    changelist(){
         return this.commentdesc.filter((item)=>{
           return this.status>=0? item.rateType==this.status:true;
        })
         
        
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  height: 100%;
  padding: 1rem;
  flex: 1;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  .comment-top {
    height: 90px;

    .comment-left {
      text-align: center;
    }
  }
}

p {
  line-height: 26px;
  font-size: 0.8rem;
  span {
    margin-right: 0.5rem;
  }
}
</style>