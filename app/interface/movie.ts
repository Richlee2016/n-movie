// 分页参数
export interface PageSize {
  page?: number
  size?: number
}
// 关键字
export interface keyWords {
  keyword?: string
}

// 分组参数
export interface GroupItem extends PageSize {
  types?: number[] //组号
}

// 列表参数
export interface ListItem extends PageSize {
  year?: number //年份
  director?: string[] //导演
  actor?: string[] //演员
  classify?: string[] //类型
  catalog?: string[] //分类
}

// 搜索参数
export interface SearchItem extends PageSize,keyWords {}
