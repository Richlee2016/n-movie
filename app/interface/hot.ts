// 添加热点字段
export interface HotItem {
  id: 'int',
  name: string
  movieHome: number
  hotType: number
  video: string
  cover: string
  onlineMovie?: number
  bgm?: string
  introduce?:string
}
