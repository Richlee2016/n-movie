import { Controller } from 'egg'

/**
 * Test Service
 */
export default class OnlineController extends Controller {
  /**
   * 在线电影 代理搜索
   * @param wd - 电影关键字
   */
  public async search(){
    const ctx = this.ctx
    const { wd } = ctx.query
    ctx.body = await ctx.service.crawler.proxyOnlineSearch(wd)
  }
}
