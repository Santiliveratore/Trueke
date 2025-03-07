import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn,OneToMany} from 'typeorm';
import { Oferta } from './oferta.entity.js';
import { Valoracion } from './valoracion.entity.js';

@Entity()
export class Trueque {
  @PrimaryGeneratedColumn()
  id: number;

  // Se usa Promise<Oferta> para evitar la referencia circular antes de la inicialización
  @OneToOne(() => Oferta, (oferta) => oferta.trueque, { onDelete: 'CASCADE', lazy: true })
  @JoinColumn({ name: 'oferta_id' })
  oferta: Promise<Oferta>;

  // ✅ Agregar relación inversa con Valoracion
  @OneToMany(() => Valoracion, valoracion => valoracion.trueque, { lazy: true })
  valoraciones?: Promise<Valoracion[]>;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_concretado: Date;
}
