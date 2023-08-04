import express from 'express';
import {jwtAuth, validateRequest} from '../../middlewares';
import {
    createMaterialSchema,
    deleteMaterialSchema,
    getMaterialListSchema,
    getMaterialSchema,
    updateMaterialSchema,
} from '../../schemas';
import {
    createMaterialCtrl,
    deleteMaterialCtrl,
    getMaterialCtrl,
    getMaterialListCtrl,
    updateMaterialCtrl,
} from '../../controllers';

const materialRouter = express.Router();

materialRouter.post('/', [jwtAuth, validateRequest(createMaterialSchema)], createMaterialCtrl);

materialRouter.get('/:id', [jwtAuth, validateRequest(getMaterialSchema)], getMaterialCtrl);

materialRouter.get('/', [jwtAuth, validateRequest(getMaterialListSchema)], getMaterialListCtrl);

materialRouter.put('/:id', [jwtAuth, validateRequest(updateMaterialSchema)], updateMaterialCtrl);

materialRouter.delete('/:id', [jwtAuth, validateRequest(deleteMaterialSchema)], deleteMaterialCtrl);

export {materialRouter};
