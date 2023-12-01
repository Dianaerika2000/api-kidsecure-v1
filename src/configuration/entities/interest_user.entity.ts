import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { IndividualUser } from 'src/users/entities/individual-user.entity';

@Entity()
export class InterestUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'status', default: false })
    status: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    // @ManyToOne(() => User, (user) => user.interestUsers)
    // @JoinColumn({ name: 'user_id' })
    // user: User;
    @ManyToOne(() => IndividualUser, (individualuser) => individualuser.interestUsers)
    @JoinColumn({ name: 'user_id' })
    individualuser: IndividualUser;

    @ManyToOne(() => Interest, (interest) => interest.interestUsers)
    @JoinColumn({ name: 'interest_id' })
    interest: Interest;
}
