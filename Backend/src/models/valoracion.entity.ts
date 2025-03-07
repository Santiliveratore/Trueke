import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Check,JoinColumn } from 'typeorm';
import { Trueque } from './trueque.entity.js';
import { Usuario } from './usuario.entity.js';

@Entity()
@Check(`puntaje BETWEEN 1 AND 5`)
export class Valoracion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Trueque, trueque => trueque.valoraciones, { onDelete: 'CASCADE', lazy: true })
  trueque: Promise<Trueque>;

  // ✅ Lazy-loading para evitar referencia circular con Usuario
  @ManyToOne(() => Usuario, usuario => usuario.valoracionesHechas, { onDelete: 'CASCADE', lazy: true })
  usuarioEvaluador: Promise<Usuario>;

  @ManyToOne(() => Usuario, usuario => usuario.valoracionesRecibidas, { onDelete: 'CASCADE', lazy: true })
  usuarioEvaluado: Promise<Usuario>;

  @Column({ type: 'int' })
  puntaje: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_valoracion: Date;
}
