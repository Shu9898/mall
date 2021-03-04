/**
 * 防抖函数debounce
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数throttle
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */

export function throttle(func, delay) {
  let canRun = true // 记录是否可以运行
  return function (...args) {
    if(!canRun) return
    canRun = false
    setTimeout(() => {
      func.apply(this, args)
      canRun = true
    }, delay)
  }

}

/**
 * 将date对象格式化，转换成对应的字符串（24小时制）
 * @param date
 * @param fmt
 * @returns {*}
 */
export function formatDate(date, fmt) {
  // (y+)表示一个分组，加了()
  // RegExp.$1是一个全局变量，当使用正则表达式进行匹配的时候，会将第一次匹配到的分组的值赋给RegExp.$1，以此类推$2, $3, $4......
  if (/(y+)/.test(fmt)) {
    // 截取字符串的方法：substr(开始截取位置index（必传）,截取长度（可不传，不传则取之后所有的字符串）)
    // + ''将getFullYear()获取到的年转换为字符串（getFullYear()返回的是Number）
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) { // k取到 M+ d+ h+ m+ s+
    // ${}是取变量的值的一种方法，
    // 注意：`(${k})`是使用 ``,而不是单引号''，`${变量}111` 相当于 变量 + '111'
    if (new RegExp(`(${k})`).test(fmt)) {
      // 将获取到的时间转换成字符串
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 处理如4:4:4这种时间格式问题的函数
// 传入一个4，变成004，再从第一位开始截取 -> 04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


/**
 * 将date对象格式化，转换成对应的字符串（可选12/24小时制，根据h大小写来决定）
 * @param date
 * @param fmt
 * @returns {*}
 */
export function formatDate12_24(date, fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'H+': (date.getHours() / 12) < 1 ? 'am' + date.getHours() : 'pm' + (date.getHours() % 12), // H+ 需要放在 m+ 之后，因为当replace完H+之后，fmt中会有字母m，此时会出现错误
  }

  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero12_24(str))
    }
  }
  return fmt
}

function padLeftZero12_24(str) {
  if(/am/.test(str)) {
    str = str.replace(/am/g, '')
    return 'am ' + ('00' + str).substr(str.length)
  }
  if(/pm/.test(str)) {
    str = str.replace(/pm/g, '')
    return 'pm ' + ('00' + str).substr(str.length)
  }
  else {
    return ('00' + str).substr(str.length)
  }
}


















