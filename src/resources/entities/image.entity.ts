import { Resource } from "src/resources/entities/resource.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class Image extends Resource {
    @Column({ primary: true, generated: true})
    id: number;

    @Column({ nullable: false})
    url: string;

    @Column({ nullable: false, name: 'path_device'})
    pathDevice: string;

    @Column({ nullable: false})
    content: string;
}
