import { Service } from 'egg';
import * as MovieType from '../interface/movie'

/**
 * Movie Service
 */
export default class Movie extends Service {
  /*
   * 根据id 获取单个电影
   * @param id 电影id
   * @return {Object} 查询的电影
   */
  public async fetchVod(id: number):Promise<object> {
    try {
      return await this.ctx.model.Movie.findOne({ id }).exec();
    } catch (e) {
      this.ctx.logger.error(e);
      return {};
    }
  }

  /*
   * 获取分组数据
   * @param {Number} Type 编号
   * @return {Object} 分组电影数据
   */
  
  public async getGroup(Item:MovieType.GroupItem):Promise<object> {
    let {page, size, types} = Item;
    page = page || 1;
    size = size || 10;
    let query:object = {};
    let skip:number = (page - 1) * size;
    query = types? { Type: { $in: types } } : query;
    try {
      return await this.ctx.model.Group.find(query)
        .populate("Group", { name: 1, area: 1, year: 1, img: 1, cover:1 })
        .limit(size)
        .skip(skip)
        .exec();
    } catch (e) {
      this.ctx.logger.error(e);
      return {};
    }
  }

  
}
