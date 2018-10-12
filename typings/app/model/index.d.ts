// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Group from '../../../app/model/group';
import Hot from '../../../app/model/hot';
import Movie from '../../../app/model/movie';
import Page from '../../../app/model/page';

declare module 'egg' {
  interface IModel {
    Group: ReturnType<typeof Group>;
    Hot: ReturnType<typeof Hot>;
    Movie: ReturnType<typeof Movie>;
    Page: ReturnType<typeof Page>;
  }
}
