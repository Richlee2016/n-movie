import { Controller } from 'egg'

export default class MovieController extends Controller {
  public async getMovieList() {
    const { ctx } = this
    ctx.body = 321
    ctx.status = 200
  }
}
