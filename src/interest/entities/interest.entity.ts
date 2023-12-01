import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { InterestUser } from '../../configuration/entities/interest_user.entity';

@Entity()
export class Interest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
    
    @OneToMany(() => InterestUser, (interestUsers) => interestUsers.interest)
    interestUsers: InterestUser[];
}