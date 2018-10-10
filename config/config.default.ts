import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import movieCof from './config.movie'
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security

  config.richCof = movieCof

  config.keys = appInfo.name + '_1539063759123_6697';

  // add your egg config in here
  config.middleware = [];

  // 引擎模板设置
  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".html": "nunjucks"
    }
  };

  // mongodb 数据库
  config.mongoose = {
    url: "mongodb://localhost:27017/eggapi",
    options: {}
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
