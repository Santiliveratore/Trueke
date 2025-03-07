import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable,OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity.js';
import { Categoria } from './categoria.entity.js';
import { Oferta } from './oferta.entity.js';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ length: 255, nullable: true })
  foto_url?: string;

  @Column({ type: 'enum', enum: ['disponible', 'no_disponible'], default: 'disponible' })
  estado: string;

  @ManyToOne(() => Usuario, usuario => usuario.productos, { onDelete: 'CASCADE' })
  usuario: Usuario;

  @ManyToMany(() => Categoria, { eager: true })
  @JoinTable({ name: 'Producto_Categoria' })
  categorias: Categoria[];

  //Lazy-loading para evitar referencia circular con Oferta
  @OneToMany(() => Oferta, oferta => oferta.productoOfrecido, { lazy: true })
  ofertasEnviadas?: Promise<Oferta[]>;

  @OneToMany(() => Oferta, oferta => oferta.productoDemandado, { lazy: true })
  ofertasRecibidas?: Promise<Oferta[]>;
}
