import { Service } from 'egg';


/**
 * Test Service
 */
export default class Crawler extends Service {

  public async proxyOnlineSearch (wd) {
    const ctx = this.ctx
    const OnlineConfig = this.config.richCof.OnlineMovie
    try {
      const res = await ctx.curl(
        OnlineConfig.search(encodeURIComponent(wd)),
        {
          dataType: 'text'
        }
      )
      if (res.data.includes(400)) return
      return 1
    } catch (error) {
      console.log(error)
    }
  }

}
