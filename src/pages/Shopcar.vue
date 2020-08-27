<template>
  <div class="shopcar">
    <div class="sale">新用户下单立减5元</div>
    <div class="shopcar-top">
      <p>购物车</p>
      <p @click='delshopcar'>
        <van-icon name="delete"  />清空购物车
      </p>
    </div>
    <div class="choose" v-for="item in checkgoodslist_X" :key="item.id">
      <h4>{{item.name}}</h4>
      <p >￥{{item.price.toFixed(2)}}</p>
      <div style="display:flex">
        <svg
          @click="changenum(-1,item.id)"
          v-show="item.num>0"
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
        <span style="font-size:20px;padding:5px;" v-show="item.num>0">{{item.num}}</span>
        <van-icon name="add" color="#F9C52C" size="30px" @click="changenum(1,item.id)" />
      </div>
    </div>
    <div style="height:60px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopcarshow: true,
      value: 1,
    };
  },
  methods:{
      changenum(num,id){
        this.$store.commit('changeordernum',{
          num,
          id
        })
      },
      delshopcar(){
         for(let obj of this.checkgoodslist_X){
           obj.num=0
         }
      }
  },
  computed: {
    checkgoodslist_X() {
      // console.log(this.$store.getters.checkgoodslist);
      return this.$store.getters.checkgoodslist;
    },
  },
};
</script>

<style lang="less" scoped>
.shopcar {
  background: #ffffff;
  width: 100%;
  height: 100%;
  .sale {
    line-height: 30px;
    text-align: center;
    background-color: rgb(240, 215, 240);
    color: red;
  }
  .shopcar-top {
    display: flex;
    width: 90%;
    overflow: hidden;
    padding: 20px;
    justify-content: space-between;
  }
  .choose {
    display: flex;
    margin-top:3px;
    h4 {
      flex: 2;
      text-indent:20px;
    }
    p {
      flex: 1;
      
    }
    div {
      flex: 1;
    }
  }
}
</style>