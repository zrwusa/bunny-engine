import {LanguageCode} from '../language-codes';


export type BLCodeAndTrans = {
    key: string,
    code: string,
    en: string,
} & Partial<LanguageCode>;

export enum E_BL_CATE {
    SYSTEM = 'SYSTEM',

    AUTH = 'AUTH',

    APP = 'APP',
    APP_USER = 'APP_USER',       // The business lines responsible for users
    APP_PRODUCT = 'APP_PRODUCT', // The business lines responsible for products
    APP_ORDER = 'APP_ORDER',     // The business lines responsible for orders

    /*@1*/
}