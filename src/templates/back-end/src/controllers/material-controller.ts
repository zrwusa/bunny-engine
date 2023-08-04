import type {NextFunction, Request, Response} from 'express';

import {createMaterial, deleteMaterial, getMaterial, getMaterialList, updateMaterial,} from '../services';
import {wrapSend} from '../helpers';
import {
    CreateMaterialBody,
    DeleteMaterialParams,
    GetMaterialListQuery,
    GetMaterialParams,
    UpdateMaterialParams,
    UpdateMaterialReq
} from '../schemas';
import {BL, httpStatusMap} from '../constants';
import {ParamsDictionary} from '../types';

export async function createMaterialCtrl(req: Request<ParamsDictionary, null, CreateMaterialBody>, res: Response, next: NextFunction) {
    const {body} = req;

    try {
        const material = await createMaterial(body);
        return wrapSend(res, httpStatusMap.ok, BL.CREATE_MATERIAL_SUCCESS, material);
    } catch (err) {
        next(err);
    }
}

export async function getMaterialCtrl(req: Request<GetMaterialParams>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
        const material = await getMaterial({id});
        if (!material) return wrapSend(res, httpStatusMap.notFound, BL.NULL_MATERIAL);
        return wrapSend(res, httpStatusMap.ok, BL.GET_MATERIAL_SUCCESS, material);
    } catch (err) {
        next(err);
    }
}

export async function getMaterialListCtrl(req: Request<ParamsDictionary, null, null, GetMaterialListQuery>, res: Response, next: NextFunction) {
    const {skip, take} = req.query;
    try {
        const materials = await getMaterialList({skip: parseInt(skip), take: parseInt(take)});
        return wrapSend(res, httpStatusMap.ok, BL.GET_MATERIAL_LIST_SUCCESS, materials);
    } catch (err) {
        next(err);
    }
}

export async function updateMaterialCtrl(req: Request<UpdateMaterialParams, null, UpdateMaterialReq>, res: Response, next: NextFunction) {
    const {id} = req.params;
    const {body} = req;

    try {
        const material = await getMaterial({id});
        if (!material) return wrapSend(res, httpStatusMap.notFound, BL.NULL_MATERIAL);
        const updatedMaterial = await updateMaterial(id, body);
        return wrapSend(res, httpStatusMap.ok, BL.UPDATE_MATERIAL_SUCCESS, updatedMaterial);
    } catch (err) {
        next(err);
    }
}

export async function deleteMaterialCtrl(req: Request<DeleteMaterialParams>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
        const material = await getMaterial({id});
        if (!material) return wrapSend(res, httpStatusMap.notFound, BL.NULL_MATERIAL);
        const deletedMaterial = await deleteMaterial({id});
        return wrapSend(res, httpStatusMap.ok, BL.DELETE_MATERIAL_SUCCESS, deletedMaterial);
    } catch (err) {
        next(err);
    }
}

