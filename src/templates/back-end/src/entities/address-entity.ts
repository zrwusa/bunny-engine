import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {CommonEntity} from './common-entity';
import {UserEntity} from './user-entity';

enum AddressCate {
    HOME = 'HOME',
    WORK = 'WORK',
    SCHOOL = 'SCHOOL'
}

@Entity('address')
export class AddressEntity extends CommonEntity {
    @Column({
        type: 'text',
    })
    lineA!: string;

    @Column({
        type: 'text',
    })
    lineB!: string;

    @Column({
        type: 'text',
    })
    lineC!: string;

    @Column({
        type: 'int4',
    })
    postCode!: number;

    @Column({
        type: 'enum',
        enum: AddressCate,
    })
    category: string = AddressCate.HOME;

    @ManyToOne(() => UserEntity,
        user => user.addresses,
        // CASCADE means delete foreign data while main data is being deleted,
        // otherwise you can use other options
        {
            onDelete: 'CASCADE'
        })

    @JoinColumn({
        name: 'user_id'
    })
    user!: UserEntity;
}
