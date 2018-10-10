import { Controller } from 'egg';

export default class HomeController extends Controller {
  // 首页
  public async index() {
    const { ctx } = this;
    ctx.redirect('/home')
  }

  // 电影首页
  public async home() {
    const { ctx } = this;
    const { HomeNav } = ctx.app.config.richCof
    const user = ctx.session.user || {}
    if (Object.keys(user).length) {
      const info = {
        name: user.qqInfo.nickname,
        cover: user.qqInfo.figureurl_qq_2
      }
      ctx.cookies.set('userInfo', encodeURIComponent(JSON.stringify(info)), { httpOnly: false })
    };
    const res = await ctx.service.movie.getGroup({ types: [1, 2, 3, 4, 21, 31, 41] })
    await ctx.render('home.html', { 
      hot: res[0], 
      newest: res[1], 
      tv: res[2], 
      cartoon: res[3], 
      HomeNav, 
      rnewest: res[4],
      rtv: res[5],
      rcartoon:res[6] 
    })
  }

  // 详情页
  public async vod () {
    const { ctx } = this;
    let { id } = ctx.params
    id = isNaN(Number(id)) ? 1 : Number(id)
    const res = await ctx.service.movie.fetchVod(id)
    await this.ctx.render('vod.html', { data: res })
  }


}
