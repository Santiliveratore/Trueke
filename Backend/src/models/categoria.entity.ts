import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Producto } from './producto.entity.js';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nombre: string;

  @ManyToMany(() => Producto, producto => producto.categorias)
  productos: Producto[];
}
