const HOME = 'http://www.idyjy.com';
export default {
    //电影家园
    MovieHome: {
      sub: id => `${HOME}/sub/${id}.html`,
      page: HOME,
      newest: `${HOME}/w.asp?p=1&f=3&l=t`,
      bili: s =>
        `https://search.bilibili.com/all?keyword=${s}&from_source=banner_search`,
      search: w => `http://so.idyjy.com/s.asp?w=${w}`,
      group: n => `${HOME}/html/${n}.html`
    },
    //在线电影 
    OnlineMovie: {
      search: wd => `http://www.dy280.com/index.php?m=vod-search&wd=${wd}`
    },
    // 七牛
    qiniu: {
      cname: 'http://go.richfly.cn/',
      bucket: 'eggapi',
      AK: 'OBDA2gN9-FJfAzWExCHGNNG9QW5FqNtUrD57IwIi',
      SK: 'lkrOjtgXY4WmN7NcJNSKNXb7aLue13_CPg_0X0NH'
    },
    // home 页面设置
    HomeNav: {
      newest: ['更新', '动作片', '喜剧片', '科幻片', '恐怖片', '剧情片'],
      tv: ['最新', '国产剧', '港台剧', '欧美剧', '日韩剧'],
      catoon: ['最新', '热门']
    }
  }