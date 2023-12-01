import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Nacionality } from "src/nacionality/entities/nacionality.entity";
import { InappropriateContentUser } from "src/configuration/entities/inappropriate_content_user.entity";
import { InterestUser } from "src/configuration/entities/interest_user.entity";
import { LanguageUser } from "src/configuration/entities/language_user.entity";

@Entity('individualUsers')
export class IndividualUser extends User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    lastname: string;

    @Column({ nullable: true })
    username: string;

    @Column({ name: 'birth_date', nullable: false })
    birthDate: Date;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    nationality: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true, name: 'activation_token' })
    activationToken: string;

    @Column({ type: 'boolean', default: false })
    active: boolean;

    //configuracion con el usuario
   
    @ManyToOne(() => Nacionality, (nacionality) => nacionality.individualusers)
    @JoinColumn({ name: 'nacionality_id' })
    nacionality: Nacionality;
    
    @OneToMany(() => InappropriateContentUser, (inappropriateContentUser) => inappropriateContentUser.individualuser)
    inappropriateContentUsers: InappropriateContentUser[];

    @OneToMany(() => InterestUser, (interestUser) => interestUser.individualuser)
    interestUsers: InterestUser[];

    @OneToMany(() => LanguageUser, (languageUser) => languageUser.individualuser)
    languageUsers: LanguageUser[];
}
