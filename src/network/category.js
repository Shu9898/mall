import {request} from "./request";

export function getCategoryNavData() {
  return request({
    url: '/category'
  })
}

export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey: maitKey
    }
  })
}

export function getSubCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey: miniWallkey,
      type: type
    }
  })
}


