import { LanguageCode } from '../language-codes';
import {BLAndTransSystem} from './system';
import {BLAndTransUser} from './user';
import {BLAndTransAuth} from './auth';
import {BLAndTransProduct} from './product';
import {BLAndTransOrder} from './order';
/*@1*/

export * from './common';
export * from './auth';
export * from './order';
export * from './product';
export * from './user';
export * from './system';
/*@3*/

export type BLAndTrans =
    BLAndTransSystem
    & BLAndTransUser
    & BLAndTransAuth
    & BLAndTransProduct
    & BLAndTransOrder/*@2*/;


export type BLAndTransKeys = keyof BLAndTrans;