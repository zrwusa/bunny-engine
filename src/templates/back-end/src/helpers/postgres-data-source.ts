import config from 'config';
import {DataSource} from 'typeorm';
import {
    AddressEntity,
    DemoGraphql,
    DemoThunkEntity,
    MaterialEntity,
    OrderEntity,
    PostEntity,
    ProductEntity,
    UserEntity
} from '../entities';
import {SnakeNamingStrategy} from 'typeorm-naming-strategies';

const url = config.get<string>('POSTGRES_URI');

export const PgDS = new DataSource({
    type: 'postgres',
    url,
    namingStrategy: new SnakeNamingStrategy(), // TODO The idea of implementing a custom naming strategy
    entities: [UserEntity, OrderEntity, AddressEntity, ProductEntity, DemoGraphql, PostEntity, DemoThunkEntity, MaterialEntity],
    synchronize: true,
    logging: ['error', 'warn'],
    subscribers: [],
    migrations: [],
});