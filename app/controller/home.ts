import { Controller } from 'egg'

export default class HomeController extends Controller {
  // 首页
  public async index() {
    const { ctx } = this
    ctx.redirect('/home')
  }

  // 电影首页
  public async home() {
    const { ctx } = this
    const { HomeNav } = ctx.app.config.richCof
    const user = ctx.session.user || {}
    if (Object.keys(user).length) {
      const info = {
        name: user.qqInfo.nickname,
        cover: user.qqInfo.figureurl_qq_2
      }
      ctx.cookies.set('userInfo', encodeURIComponent(JSON.stringify(info)), {
        httpOnly: false
      })
    }
    const res = await ctx.service.movie.getGroup({
      types: [1, 2, 3, 4, 21, 31, 41]
    })
    await ctx.render('home.html', {
      hot: res[0],
      newest: res[1],
      tv: res[2],
      cartoon: res[3],
      HomeNav,
      rnewest: res[4],
      rtv: res[5],
      rcartoon: res[6]
    })
  }

  // 详情页
  public async vod() {
    const { ctx } = this
    let { id } = ctx.params
    id = isNaN(Number(id)) ? 1 : Number(id)
    const res = await ctx.service.movie.fetchVod(id)
    await this.ctx.render('vod.html', { data: res })
  }

  // 列表
  public async list() {
    const { ctx } = this
    let querys = ctx.query
    querys.size = 24
    querys.page = querys.page ? Number(querys.page) : 1
    const res = await ctx.service.movie.fetchList(querys)
    await this.ctx.render('list.html', { list: res.list, count: res.count })
  }

  // 分组
  public async group() {
    const { ctx } = this
    let { type } = ctx.params
    let start = 100
    let end = 109
    if (type === 'movie') {
      start = 101
      end = 109
    }
    if (type === 'tv') {
      start = 201
      end = 206
    }
    let types: number[] = []
    for (let i = start; i < end; i++) {
      types.push(i)
    }
    const res = await ctx.service.movie.getGroup({ types })
    const list = res.reduce((arr: object[], box: any) => {
      arr.push(box.Group)
      return arr
    }, [])
    await this.ctx.render('group.html', { list })
  }

  // 搜索
  public async search() {
    const { ctx } = this
    const keyword: string = ctx.query.w
    const res = await this.service.movie.search({ keyword })
    await this.ctx.render('list.html', { list: res.list, counts: res.count })
  }

  // 专题
  public async topic () {
    const { ctx } = this
    let { page, size } = ctx.query
    page = isNaN(Number(page)) ? 1 : Number(page)
    size = isNaN(Number(size)) ? 9 : Number(size)
    const res = await ctx.service.movie.fetchTopics({ page, size })
    await ctx.render('topic.html', { data: res.list, count: res.count })
  }

  // 详情
  public async topicvod () {
    const { ctx } = this
    let { id } = ctx.params
    id = isNaN(Number(id)) ? 1 : Number(id)
    const res = await ctx.service.movie.fetchTopic(id)
    await ctx.render('topicvod.html', { data: res.list })
  }

  // 个人中心
  public async center () {
    const { ctx } = this
    await ctx.render('center.html')
  }
  // /** error */
  // // 暂无资源页
  public async noSorce () {
    const { ctx } = this
    await ctx.render('error/nosorce.html', {})
  }
  // 错误页面
  public async onError () {
    const { ctx } = this
    await ctx.render('error/onerror.html',{})
  }
}
