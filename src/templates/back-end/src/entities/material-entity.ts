import {Column, Entity} from 'typeorm';
import {CommonEntity} from './common-entity';

@Entity('material')
export class MaterialEntity extends CommonEntity {


    @Column({
        type: 'varchar',

        length: 127,


    })
    title!: string ;

    @Column({
        type: 'text',
        nullable: true,


    })
    description: string  | undefined;

    @Column({
        type: 'decimal',


        precision: 10,
        scale: 2,
    })
    price!: number ;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 511,


    })
    image: string  | undefined;

}
