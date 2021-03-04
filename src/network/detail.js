import {request} from "./request";

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid: iid
    }
  })
}

export function getRecommendData() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice
    this.columns = columns
    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.goodsCount = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class Detail {
  constructor(detailInfo) {
    this.desc = detailInfo.desc
    this.detailImage = detailInfo.detailImage
  }
}

export class Params {
  constructor(itemParams) {
    // 有些商品的itemParams的info中没有images，所以这里需要判断其有没有
    this.images = itemParams.info.images ? itemParams.info.images : null
    this.infos = itemParams.info.set
    this.sizes = itemParams.rule.tables[0] // 有一个奇怪的点就是这里必须先获取到tables的第0个元素再传过去，而不能将tables直接传过去，再获取到其第0个元素（会报错，获取不到"0 of undefined"）
  }
}

export class Comment {
  constructor(rate) {
    this.userName = rate.list[0].user.uname
    this.avatar = rate.list[0].user.avatar
    this.content = rate.list[0].content
    this.style = rate.list[0].style
    this.images = rate.list[0].images ? rate.list[0].images : null
    this.extraInfo = rate.list[0].extraInfo ? rate.list[0].extraInfo : null
    this.date = rate.list[0].created
  }
}
