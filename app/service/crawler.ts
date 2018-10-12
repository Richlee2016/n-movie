import { Service } from 'egg'
// import * as puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import * as _ from 'lodash'

// 电影家园配置
class HomeConfig {
  public prefix = 'http://www.idyjy.com'
  public newest = `${this.prefix}/w.asp?p=1&f=3&l=t`
  sub(id: number) {
    return `${this.prefix}/sub/${id}.html`
  }
}

// 在线电影配置
class OnlineConfig {
  public prefix = 'http://www.dy280.com/'
  search(wd: string) {
    return `${this.prefix}index.php?m=vod-search&wd=${wd}`
  }
}

export default class Crawler extends Service {
  public HomeConfig: HomeConfig = new HomeConfig()
  public OnlineConfig: OnlineConfig = new OnlineConfig()

  // 在线电影代理搜索
  public async proxyOnlineSearch(wd) {
    const ctx = this.ctx
    try {
      const res = await ctx.curl(
        this.OnlineConfig.search(encodeURIComponent(wd)),
        {
          dataType: 'text'
        }
      )
      if (res.data.includes(400)) return []
      return this._onlineSearch(res.data)
    } catch (e) {
      this.ctx.logger.error(e)
      return []
    }
  }

  // // 延时函数
  // private _sleep (start?:number,end?:number,fn?:any){
  //   start = start || 0
  //   end = end || 1
  //   if (start >= end) {
  //     end = 0
  //   }
  //   let ran = Math.ceil((Math.random() * (end - start) + start) * 1000)
  //   let time = end ? ran : start * 1000
  //   fn && fn(time)
  //   return new Promise(resolve => {
  //     setTimeout(function () {
  //       resolve(time)
  //     }, time)
  //   })
  // }

  // 无头浏览器封装
  // private async _brower(handle, errhandle) {
  //   try {
  //     const browser = await puppeteer.launch()

  //     const page = await browser.newPage()

  //     const goPage = async (url, timeout = 3000000) => {
  //       const res = await page.goto(url, {
  //         waitUntil: 'networkidle2',
  //         timeout
  //       })
  //       return res
  //     }

  //     handle && (await handle(browser, page, goPage))

  //     await browser.close()
  //   } catch (e) {
  //     this.ctx.logger.error(e)
  //     errhandle && (await errhandle())
  //   }
  // }

  // 在线搜索解析
  private _onlineSearch(html: string) {
    const $ = cheerio.load(html)
    const boxs = $('.hy-layout .hy-video-details').get()
    const res = _.chain(boxs).map(o => {
      var urlReg = /.+url\((.+)\)/
      var reReg = /(.+)：/
      const getText = (text, type) => {
        let t = text ? text.replace(reReg, '') : ''
        if (type) return t
        return t ? t.split(',') : []
      }
      const getLi = n =>
        $(o)
          .find('dd ul li')
          .eq(n)
          .text()
      return {
        img: urlReg.test(
          $(o)
            .find('.videopic')
            .attr('style')
        )
          ? RegExp.$1
          : '',
        title: $(o)
          .find('.head h3')
          .html(),
        actors: getText(
          $(o)
            .find('.one')
            .text(),
          0
        ),
        directors: getText(getLi(1), 0),
        area: getText(getLi(2), 1),
        year: getText(getLi(3), 1),
        intro: getText(getLi(4), 1),
        href:
          this.OnlineConfig.prefix +
          $(o)
            .find('.block a')
            .attr('href')
            .replace(/\//, '')
      }
    })
    return res
  }
}
