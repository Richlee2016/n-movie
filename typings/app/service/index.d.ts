// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Crawler from '../../../app/service/crawler';
import Movie from '../../../app/service/movie';
import Test from '../../../app/service/Test';

declare module 'egg' {
  interface IService {
    crawler: Crawler;
    movie: Movie;
    test: Test;
  }
}
