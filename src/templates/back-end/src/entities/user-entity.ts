import {BeforeInsert, Column, Entity, OneToMany} from 'typeorm';
import {CommonEntity} from './common-entity';
import {AddressEntity} from './address-entity';
import bcrypt from 'bcrypt';
import config from 'config';

@Entity('user')
export class UserEntity extends CommonEntity {
    @Column({
        type: 'text',
        unique: true,
    })
    email!: string;

    @Column({
        type: 'text',
    })
    name!: string;

    @Column({
        type: 'text',
    })
    password!: string;
    @OneToMany(() => AddressEntity, address => address.user)
    addresses!: AddressEntity[];

    @BeforeInsert()
    async beforeInsert() {
        const salt = await bcrypt.genSalt(config.get<number>('SALT_WORK_FACTOR'));
        this.password = await bcrypt.hashSync(this.password, salt);
    }
}
