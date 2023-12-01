import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { InappropriateContent } from 'src/inappropriate-content/entities/inappropriate-content.entity';
import { IndividualUser } from 'src/users/entities/individual-user.entity';

@Entity()
export class InappropriateContentUser {
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

    @ManyToOne(() => IndividualUser, (individualuser) => individualuser.inappropriateContentUsers)
    @JoinColumn({ name: 'user_id' })
    individualuser: IndividualUser;

    @ManyToOne(() => InappropriateContent, (inappropriate_content) => inappropriate_content.inappropriateContentUsers)
    @JoinColumn({ name: 'inappropriate_content_id' })
    inappropiateContent: InappropriateContent;
}
