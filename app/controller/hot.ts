import { Controller } from 'egg'
import * as HotType from '../interface/hot'
export default class HomeController extends Controller {
  public HotRules: any = {
    id: 'int',
    name: 'string',
    movieHome: 'int',
    hotType: 'int',
    video: 'string',
    cover: 'string'
  }
  // 获取最热电影
  public async getHotMovies() {
    const ctx = this.ctx
    const { page, size } = ctx.query
    const res = await ctx.service.hot.fetchHotList({ page, size })
    ctx.body = { data: res }
    ctx.status = 200
  }

  /*
   * 返回单个热点
   */
  public async getHotVod() {
    const ctx = this.ctx
    const { id }: { id: string } = ctx.params
    const res = await ctx.service.hot.fetchHotMovie(id)
    ctx.body = {
      movie: res
    }
    ctx.status = 200
  }

  /*
   * 更新单个热点
   * @body {String} name 电影名称
   * @body {Number} movieHome 电影家园关联id
   * @body {Number} hotType 热点类型
   * @body {String} video 电影视频
   * @body {String} cover 电影封面
   */
  async postUpdateHotMovie() {
    const ctx = this.ctx
    ctx.validate(this.HotRules)
    const sendBody:HotType.HotItem = ctx.request.body
    const res = await ctx.service.hot.csHotMovie(sendBody)
    ctx.body = res
    ctx.status = 201
  }

  /*
   * 删除单个热点
   * @body {Number} id 电影id
   */
  async postDeleteHotMovie() {
    const ctx = this.ctx
    const { id }: { id: number } = ctx.request.body
    const res = await ctx.service.hot.destroyHotMovie(id)
    ctx.body = res
    ctx.status = 204
  }
}
