import { InappropriateContentUser } from "src/configuration/entities/inappropriate_content_user.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class InappropriateContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'original_name', nullable: false })
    original_name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @OneToMany(() => InappropriateContentUser, (inappropriateContentUsers) => inappropriateContentUsers.inappropiateContent)
    inappropriateContentUsers: InappropriateContentUser[]
}