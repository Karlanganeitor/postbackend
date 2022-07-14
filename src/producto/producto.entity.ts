import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'producto'})
export class ProductoEntity {
    //agregar mas clases

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    nombre: string;

    @Column({type: 'float', nullable: false})
    precio: number;

    @Column({type: 'varchar', nullable: false})
    fecha: string;

    @Column({type: 'varchar', nullable: false})
    nomapp: string;


    @Column({type: 'varchar', nullable: false})
    direccion: string;


    @Column({type: 'varchar', nullable: false})
    detalles: string;


    
}