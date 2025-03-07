import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from './producto.entity.js';
import { Usuario } from './usuario.entity.js';
import { Trueque } from './trueque.entity.js';

export enum EstadoOferta {
    PENDIENTE = 'pendiente',
    RECHAZADA = 'rechazada',
    ACEPTADA = 'aceptada',
    FALLIDA = 'fallida',
  }
  
  @Entity()
  export class Oferta {
    @PrimaryGeneratedColumn()
    id: number;
  
      // ✅ Lazy-loading para evitar error de inicialización de Producto
  @ManyToOne(() => Producto, producto => producto.ofertasEnviadas, { onDelete: 'CASCADE', lazy: true })
  productoOfrecido: Promise<Producto>;

  @ManyToOne(() => Producto, producto => producto.ofertasRecibidas, { onDelete: 'CASCADE', lazy: true })
  productoDemandado: Promise<Producto>;
  
    @Column({ type: 'enum', enum: EstadoOferta, default: EstadoOferta.PENDIENTE })
    estado: EstadoOferta;
  
    @CreateDateColumn({ type: 'timestamp' })
    fecha_oferta: Date;
  
    // ✅ Lazy-loading para evitar error de referencia circular con Usuario
  @ManyToOne(() => Usuario, usuario => usuario.ofertas, { onDelete: 'CASCADE', lazy: true })
  usuarioOfertante: Promise<Usuario>
  
    //  Evitar referencia circular directa
    @OneToOne(() => Trueque, (trueque) => trueque.oferta, { nullable: true, lazy: true })
    trueque?: Promise<Trueque>;
  }