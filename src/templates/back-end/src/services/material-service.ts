import type {DeepPartial, FindManyOptions, FindOptionsWhere} from 'typeorm';
import {MaterialEntity} from '../entities';
import {serviceProfile} from '../helpers';

export async function createMaterial(input: DeepPartial<MaterialEntity>) {
    const material = MaterialEntity.create(input);
    return await serviceProfile('createMaterial', async () => await MaterialEntity.save(material));
}

export async function getMaterial(options: FindOptionsWhere<MaterialEntity>) {
    return await serviceProfile('getMaterial', async () => await MaterialEntity.findOneBy(options));
}

export async function getMaterialList(options: FindManyOptions<MaterialEntity>) {
    return await serviceProfile('getMaterialList', async () => await MaterialEntity.find(options));
}

export async function updateMaterial(id: MaterialEntity['id'], update: DeepPartial<MaterialEntity>) {
    return await serviceProfile('updateMaterial', async () => await MaterialEntity.update(id, {...update}));
}

export async function deleteMaterial(options: Pick<FindOptionsWhere<MaterialEntity>, 'id'>) {
    return await serviceProfile('deleteMaterial', async () => await MaterialEntity.delete(options));
}
