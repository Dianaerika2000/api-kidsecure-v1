import { Nacionality } from "src/nacionality/entities/nacionality.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, OneToMany, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { InappropriateContentUser } from "../../configuration/entities/inappropriate_content_user.entity";
import { InterestUser } from "../../configuration/entities/interest_user.entity";
import { LanguageUser } from "../../configuration/entities/language_user.entity";

@Entity('users')
export abstract class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    photo_url: string;

    @Column({ nullable: false, default: 'individual' })
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    //Relaciones de la configuración del usuario
    // @ManyToOne(() => Nacionality, (nacionality) => nacionality.users)
    // @JoinColumn({ name: 'nacionality_id' })
    // nacionality: Nacionality;

    // @OneToMany(() => InappropriateContentUser, (inappropriateContentUser) => inappropriateContentUser.user)
    // inappropriateContentUsers: InappropriateContentUser[];

    // @OneToMany(() => InterestUser, (interestUser) => interestUser.user)
    // interestUsers: InterestUser[];

    // @OneToMany(() => LanguageUser, (languageUser) => languageUser.user)
    // languageUsers: LanguageUser[];
}
