import {BLAndTransMaterial, E_BL_CATE} from '../../types';

export const BLMaterial: BLAndTransMaterial = {
    CREATE_MATERIAL_SUCCESS: {
        key: 'CREATE_MATERIAL_SUCCESS',
        code: `${E_BL_CATE.APP_MATERIAL}_0001`,
        en: 'Create product success',
        zh: '创建原料成功'
    },
    NULL_MATERIAL: {
        key: 'NULL_MATERIAL',
        code: `${E_BL_CATE.APP_MATERIAL}_0002`,
        en: 'Material not exists',
        zh: '原料不纯在'
    },
    GET_MATERIAL_SUCCESS: {
        key: 'GET_MATERIAL_SUCCESS',
        code: `${E_BL_CATE.APP_MATERIAL}_0003`,
        en: 'Get Material success',
        zh: '获取原料成功'
    },
    GET_MATERIAL_LIST_SUCCESS: {
        key: 'GET_MATERIAL_LIST_SUCCESS',
        code: `${E_BL_CATE.APP_MATERIAL}_0004`,
        en: 'Get Material list success',
        zh: '获取原料列表成功'
    },
    UPDATE_MATERIAL_SUCCESS: {
        key: 'UPDATE_MATERIAL_SUCCESS',
        code: `${E_BL_CATE.APP_MATERIAL}_0005`,
        en: 'Update Material success',
        zh: '更新原料成功'
    },
    DELETE_MATERIAL_SUCCESS: {
        key: 'DELETE_MATERIAL_SUCCESS',
        code: `${E_BL_CATE.APP_MATERIAL}_0006`,
        en: 'Delete Material success',
        zh: '删除原料成功'
    },
}
