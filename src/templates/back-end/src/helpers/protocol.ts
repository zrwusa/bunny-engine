import type {Response} from 'express';
import type {BLCodeAndTrans, HTTPStatus, APIProtocol} from '../types';
import logger from "./logger";
export class BizLogicFailed {
    public restful: HTTPStatus;
    public bizLogic: BLCodeAndTrans;
    constructor(restful:  HTTPStatus, bizLogic: BLCodeAndTrans) {
        this.restful = restful;
        this.bizLogic = bizLogic;
    }
}
export const wrapSend = (res: Response, restful: HTTPStatus, bizLogic: BLCodeAndTrans, resData: any = null, bizLogicPayload?: any) => {
    const {key, code} = bizLogic;
    const needBeSentBody: APIProtocol = {
        http: restful, bizLogic: {
            code,
            message: res.__(key),
            payload: bizLogicPayload,
        }, resData: resData
    };

    if (restful.code === 200) {
        logger.info(needBeSentBody);
    } else {
        logger.error(needBeSentBody);
    }

    return res.status(restful.code).send(needBeSentBody).end();
};
