import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  // 方式一：
  // console.log(Toast.$el) // undefined
  // 将Toast组件中的元素添加到body中
  // document.body.appendChild(Toast.$el)
  // 在Vue的原型上添加$toast属性
  // Vue.prototype.$toast = 对象
  // Vue.prototype.$toast = Toast

  // 方式二：
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.使用new的方式，可以根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor()

  // 3.通过$mount将组件对象手动地挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el拿到的元素就是上面创建出来的div
  document.body.appendChild(toast.$el)

  // 在Vue的原型添加$toast属性
  Vue.prototype.$toast = toast

}

export default obj
