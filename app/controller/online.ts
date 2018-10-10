import { Controller } from 'egg';

/**
 * Test Service
 */
export default class OnlineController extends Controller {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async search () {
    const ctx = this.ctx
    // const res = await ctx.service.crawler.proxyOnlineSearch(wd)
    // return res
    ctx.body = 1;
  }
}
