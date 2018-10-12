import { Service } from 'egg'
import * as MovieType from '../interface/movie'

/**
 * Movie Service
 */
export default class Movie extends Service {
  /*
   * 根据id 获取单个电影
   * @param id 电影id
   */
  public async fetchVod(id: number): Promise<object> {
    try {
      return await this.ctx.model.Movie.findOne({ id }).exec()
    } catch (e) {
      this.ctx.logger.error(e)
      return {}
    }
  }

  /*
   * 获取分组数据
   */

  public async getGroup(Item: MovieType.GroupItem): Promise<object[]> {
    let { page = 1, size = 10, types } = Item
    let query: object = {}
    let skip: number = (page - 1) * size
    query = types ? { Type: { $in: types } } : query
    try {
      return await this.ctx.model.Group.find(query)
        .populate('Group', {
          name: 1,
          area: 1,
          year: 1,
          img: 1,
          cover: 1
        })
        .limit(size)
        .skip(skip)
        .exec()
    } catch (e) {
      this.ctx.logger.error(e)
      return [{}]
    }
  }

  /*
   * 筛选电影
   */
  public async fetchList(
    q: MovieType.ListItem
  ): Promise<{ list: object[]; count: number }> {
    let { page, size } = q
    page = isNaN(Number(page)) ? 1 : Number(page)
    size = isNaN(Number(size)) ? 10 : Number(size)

    let query: object[] = [{ id: { $exists: true } }]

    for (let [key, val] of Object.entries(q)) {
      let data = {}
      if (['page', 'size'].indexOf(key) === -1) {
        data[key] = val
        query.push(data)
      }
    }

    let skip = (page - 1) * size

    let search = {
      name: { $ne: 'none' },
      $and: query
    }
    try {
      const counts: number = await this.ctx.model.Movie.countDocuments(
        search
      ).exec()
      const movielist: object[] = await this.ctx.model.Movie.find(search, {
        name: 1,
        year: 1,
        img: 1,
        cover: 1
      })
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec()

      return {
        list: movielist,
        count: counts
      }
    } catch (e) {
      this.ctx.logger.error(e)
      return {
        list: [{}],
        count: 0
      }
    }
  }

  /**
   * 搜索关键词
   */
  public async search(
    Item: MovieType.SearchItem
  ): Promise<{ list: object[]; count: number }> {
    let { keyword, page, size } = Item
    page = isNaN(Number(page)) ? 1 : Number(page)
    size = isNaN(Number(size)) ? 24 : Number(size)

    if (!keyword) {
      const res = await this.fetchList({ page, size })
      return res
    }

    let reg = new RegExp(keyword)

    let query = {
      $or: [
        { name: { $regex: reg } },
        { actor: { $regex: reg } },
        { director: { $regex: reg } }
      ]
    }

    // if (kw.length >= 2) {
    //   query = query['$or'].concat([
    //     { actor: { $regex: reg } },
    //     { director: { $regex: reg } }
    //   ])
    // }

    let skip = (page - 1) * size
    try {
      const counts: number = await this.ctx.model.Movie.countDocuments(
        query
      ).exec()
      const lists: object[] = await this.ctx.model.Movie.find(query)
        .sort({ _id: -1 })
        .limit(size)
        .skip(skip)
        .exec()
      return {
        list: lists,
        count: counts
      }
    } catch (e) {
      this.ctx.logger.error(e)
      return {
        count: 0,
        list: [{}]
      }
    }
  }

  /**
   *查询专题
   */
  public async fetchTopics(
    Topics: MovieType.PageSize
  ): Promise<{
    count: number
    list: object[]
  }> {
    let { page = 1, size = 10 } = Topics
    let skip = (page - 1) * size
    let query = { name: { $regex: /topic/ } }
    try {
      const count: number = await this.ctx.model.Page.find(query)
        .count()
        .exec()
      const list: object[] = await this.ctx.model.Page.find(query)
        .limit(size)
        .skip(skip)
        .sort({ _id: -1 })
        .exec()

      return {
        count,
        list
      }
    } catch (e) {
      this.ctx.logger.error(e)
      return {
        count: 0,
        list: [{}]
      }
    }
  }

  /**
   *
   * 专题详情页
   */
  public async fetchTopic(id: string): Promise<{ list: object[] }> {
    try {
      const vod = await this.ctx.model.Page.findOne({
        type: id
      }).exec()
      return vod
    } catch (e) {
      this.ctx.logger.error(e)
      return { list: [{}] }
    }
  }
}
