import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'
import { LanguageUser } from '../../configuration/entities/language_user.entity';

@Entity()
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ default: true })
    status: boolean;

    @Column({ nullable: true })
    icon_image: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @OneToMany(() => LanguageUser, (languageUsers) => languageUsers.language)
    languageUsers: LanguageUser[];
}