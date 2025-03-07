import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Producto } from './producto.entity.js';
import { Oferta } from './oferta.entity.js';
import { Valoracion } from './valoracion.entity.js';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50, nullable: true })
  ciudad: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;

  // ✅ Lazy-loading para evitar error de referencia circular con Oferta
  @OneToMany(() => Producto, producto => producto.usuario, { lazy: true })
  productos?: Promise<Producto[]>;

  @OneToMany(() => Oferta, oferta => oferta.usuarioOfertante, { lazy: true })
  ofertas?: Promise<Oferta[]>;

  // ✅ Lazy-loading para evitar referencia circular con Valoracion
  @OneToMany(() => Valoracion, valoracion => valoracion.usuarioEvaluador, { lazy: true })
  valoracionesHechas?: Promise<Valoracion[]>;

  @OneToMany(() => Valoracion, valoracion => valoracion.usuarioEvaluado, { lazy: true })
  valoracionesRecibidas?: Promise<Valoracion[]>;
}
