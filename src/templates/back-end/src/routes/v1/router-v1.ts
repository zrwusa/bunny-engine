import express from 'express';
import {jwtAuth} from '../../middlewares';
import {getConfigCtrl, getPingCtrl} from '../../controllers';
import {orderRouter} from './order';
import {userRouter} from './user';
import {sessionRouter} from './session';
import {productRouter} from './product';
/*@1*/
const routerV1 = express.Router();

routerV1.get('/ping', getPingCtrl);

routerV1.get('/config', jwtAuth, getConfigCtrl);

routerV1.use('/sessions', sessionRouter);

routerV1.use('/users', userRouter);

routerV1.use('/products', productRouter);

routerV1.use('/orders', orderRouter);
/*@2*/
export {routerV1};
