import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Language } from 'src/language/entities/language.entity';
import { IndividualUser } from 'src/users/entities/individual-user.entity';

@Entity()
export class LanguageUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'status', default: false })
    status: boolean;

    @Column({ name: 'matern_language', default: false })
    matern_language: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    // @ManyToOne(() => User, (user) => user.languageUsers)
    // @JoinColumn({ name: 'user_id' })
    // user: User;

    @ManyToOne(() => Language, (language) => language.languageUsers)
    @JoinColumn({ name: 'language_id' })
    language: Language;

    @ManyToOne(() => IndividualUser, (individualuser) => individualuser.languageUsers)
    @JoinColumn({ name: 'user_id' })
    individualuser: IndividualUser;

}