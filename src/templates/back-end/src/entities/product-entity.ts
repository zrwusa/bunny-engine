import {Column, Entity, ManyToMany} from 'typeorm';
import {CommonEntity} from './common-entity';
import {OrderEntity} from './order-entity';

@Entity('product')
export class ProductEntity extends CommonEntity {

    @Column({
        type: 'varchar',
        length: 127
    })
    title!: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string | undefined;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price!: number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 511
    })
    image: string | undefined;

    @ManyToMany(() => OrderEntity,
        {
            // cascade: true means delete connected data while main data is being deleted
            cascade: true
        })
    orders!: OrderEntity[];
}
