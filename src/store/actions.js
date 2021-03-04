export default {
  // actions中的方法的第一个参数是context，即store对象
  addCartList(context, payload) {
    // let product = context.state.cartList.find(item => item.iid === payload.iid)
    // if(product) {
    //   context.commit('addProductCount', product)
    // }
    // else {
    //   context.commit('addProduct', payload)
    // }

    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if(product) {
        context.commit('addProductCount', product)
        resolve('商品的数量增加1')
      }
      else {
        context.commit('addProduct', payload)
        resolve('成功添加商品到购物车中')
      }
    })
  },
  checkAllClick(context) {
    context.commit('checkAllClick')

    if(context.state.isAllChecked) {
      context.commit('checkAllProduct')
    }
    else {
      context.commit('cancelCheckAllProduct')
    }
  },
  productCheckChange(context, payload) {
    context.commit('productCheckChange', payload)

    // 判断全选按钮是否全选

    // 1.通过遍历
    // let isAllCheck = true
    // for(let item of context.state.cartList) {
    //   if(!item.isChecked) {
    //     console.log('没有全选')
    //     isAllCheck = false
    //     context.commit('noCheckAll')
    //     break
    //   }
    // }
    // if(isAllCheck) {
    //   context.commit('checkAll')
    //   console.log('全选了')
    // }

    // 2.数组的方法filter()
    // if(!context.state.cartList.filter(item => !item.isChecked).length) {
    //   context.commit('checkAll')
    // }
    // else {
    //   context.commit('noCheckAll')
    // }

    // 3.数组的方法find()
    if(!context.state.cartList.find(item => !item.isChecked)) {
      context.commit('checkAll')
    }
    else {
      context.commit('noCheckAll')
    }


  }
}
