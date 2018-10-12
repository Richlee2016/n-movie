// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Crawler from '../../../app/service/Crawler';
import Hot from '../../../app/service/Hot';
import Movie from '../../../app/service/Movie';
import Qiniu from '../../../app/service/Qiniu';

declare module 'egg' {
  interface IService {
    crawler: Crawler;
    hot: Hot;
    movie: Movie;
    qiniu: Qiniu;
  }
}
