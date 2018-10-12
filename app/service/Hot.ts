import { Service } from 'egg'
import * as AllType from '../interface/index'
import * as HotType from '../interface/hot'
/**
 * Hot Service 首页热点
 */
export default class Hot extends Service {
  // 获取热点电影
  public async fetchHotList(
    Hot: AllType.PageSize
  ): Promise<{
    count: number
    list: object[]
  }> {
    let { page = 1, size = 10 } = Hot
    let skip = (page - 1) * size
    try {
      const count: number = await this.ctx.model.Hot.count({}).exec()
      const list: object[] = await this.ctx.model.Hot.find()
        .limit(size)
        .skip(skip)
        .populate('movieHome')
        .exec()
      return {
        count,
        list
      }
    } catch (e) {
      this.ctx.logger.error(e)
      return {
        list: [{}],
        count: 0
      }
    }
  }

  // 单个推荐电影资源
  public async fetchHotMovie(id: string): Promise<object> {
    try {
      const res = await this.ctx.model.Hot.findOne({ id })
        .populate('movieHome')
        .exec()
      return res
    } catch (e) {
      this.ctx.logger.error(e)
      return {}
    }
  }

  // 增加或修改单个推荐电影资源
  public async csHotMovie(hot: HotType.HotItem) {
    try {
      const newhot = await this.ctx.service.Qiniu.hotQiniuUpdate(hot)
      const res = await this.ctx.model.Hot.SaveHot(newhot)
      return res
    } catch (error) {
      
    }
  }

  // 删除单个推荐电影资源
  public async destroyHotMovie(id) {
    const res = await this.ctx.model.Hot.remove({ id: { $in: id } }).exec()
    return res
  }
}
