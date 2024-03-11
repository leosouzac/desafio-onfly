import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  description: string

  @Column({ type: 'int' })
  amount: number

  @Column({ type: 'varchar' })
  user_id: string

  @Column({ type: 'date' })
  date: Date

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date
}
