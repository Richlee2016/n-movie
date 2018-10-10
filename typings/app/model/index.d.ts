// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Group from '../../../app/model/group';
import Movie from '../../../app/model/movie';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof Group>;
    Movie: ReturnType<typeof Movie>;
  }
}
