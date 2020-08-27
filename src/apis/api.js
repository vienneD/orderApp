import axios from "axios"

const IP="http://127.0.0.1:5000"

// const IP="http://172.20.10.3:5000"



axios.defaults.baseURL=IP

export const GETIMG=IP+'/upload/imgs/goods_img/'
export const GETHEADIMG=IP+'/upload/shop/'

//商品数据
export var getgoods=()=>axios.get('/goods/goods_list')



//商品评价数据
export var goodscomment=()=>axios.get('/shop/ratings')

//商家接口
export var store =()=>axios.get('/shop/seller')