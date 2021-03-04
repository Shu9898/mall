export default {
  // addCartList(state, payload) {
  //   // state.cartList.push(payload)
  //   // 加入购物车的时候，需要对商品进行判断比较，如果商品已经在cartList数组中，那么商品对应的count加1，如果商品不在cartList数组中，则将其加入数组中，商品对应的count设为1
  //
  //   // 方式一：（for循环遍历）
  //   // let product = null
  //   // for(let item of state.cartList) {
  //   //   if(item.iid = payload.iid) {
  //   //     // 让product指向item
  //   //     product = item
  //   //   }
  //   // }
  //   // if(product) {
  //   //   product.count += 1
  //   // }
  //   // else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  //
  //   // 方式二：（数组的indexOf方法）
  //   // -> 不行，数组中如果是对象，即使两个对象一模一样，使用indexOf也会返回-1
  //   // if(state.cartList.indexOf(payload) !== -1) {
  //   //   let index = state.cartList.indexOf(payload)
  //   //   state.cartList[index].count += 1
  //   // }
  //   // else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  //
  //   // 方式三：（数组的find方法）
  //   // 数组的方法有：push/pop/shift/unshift/concat/splice/sort/reverse/slice/join/map/filter/reduce/find
  //   // 让product指向item
  //   let product = state.cartList.find(function (item) {
  //     return item.iid === payload.iid
  //   })
  //   // let product = state.cartList.find(item => item.iid === payload.iid)
  //   if(product) {
  //     product.count += 1
  //   }
  //   else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  addProduct(state, payload) {
    payload.count = 1
    payload.isChecked = false
    state.cartList.push(payload)
  },
  addProductCount(state, payload) {
    payload.count += 1
  },
  // 单个商品的选中与不选中
  productCheckChange(state, payload) {
    payload.isChecked = !payload.isChecked
  },
  // 全选和全不选
  checkAllClick(state) {
    state.isAllChecked = !state.isAllChecked
  },
  noCheckAll(state) {
    state.isAllChecked = false
  },
  checkAll(state) {
    state.isAllChecked = true
  },
  checkAllProduct(state) {
    // 1.for循环遍历
    // for(let item of state.cartList) {
    //   item.isChecked = true
    // }
    // 2.forEach遍历
    state.cartList.forEach(item => {
      item.isChecked = true
    })
  },
  cancelCheckAllProduct(state) {
    // 1.for循环遍历
    // for(let item of state.cartList) {
    //   item.isChecked = false
    // }
    // 2.forEach遍历
    state.cartList.forEach(item => {
      item.isChecked = false
    })
  },
  // 商品数量增加与减少
  increaseProduct(state, payload) {
    payload.count++
  },
  decreaseProduct(state, payload) {
    payload.count--
  },
}
