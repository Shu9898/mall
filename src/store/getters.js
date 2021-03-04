export default {
  counters(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  isAllChecked(state) {
    return state.isAllChecked
  },
  totalMoney(state) {
    // 1.采用遍历
    // let total = 0
    // for(let item of state.cartList) {
    //   if(item.isChecked) {
    //     // item.realPrice获取到的是String类型
    //     total += item.realPrice * item.count
    //   }
    // }
    // return total.toFixed(2)

    // 2.数组的filter和reduce方法
    return state.cartList.filter((item) => {
      return item.isChecked
    }).reduce((preValue, item) => {
      return preValue + item.realPrice * item.count
    }, 0).toFixed(2)
  },
  totalProducts(state) {
    // 1.采用遍历
    // let total = 0
    // for(let item of state.cartList) {
    //   if(item.isChecked) {
    //     total += item.count
    //   }
    // }
    // return total

    // 2.数组的filter和reduce方法
    return state.cartList.filter(item => {
      return item.isChecked
    }).reduce((preValue, item) => {
      return preValue + item.count
    }, 0)
  },
}
