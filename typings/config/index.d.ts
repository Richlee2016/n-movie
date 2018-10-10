// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import { EggAppConfig } from 'egg';
import ExportConfigDefault from '../../config/config.default';
import ExportConfigLocal from '../../config/config.local';
import ExportConfigMovie from '../../config/config.movie';
import ExportConfigProd from '../../config/config.prod';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type ConfigLocal = ReturnType<typeof ExportConfigLocal>;
type ConfigMovie = typeof ExportConfigMovie;
type ConfigProd = ReturnType<typeof ExportConfigProd>;
declare module 'egg' {
  type NewEggAppConfig = ConfigDefault & ConfigLocal & ConfigMovie & ConfigProd;
  interface EggAppConfig extends NewEggAppConfig { }
}