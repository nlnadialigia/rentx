import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  license_plate: string;

  @Column()
  available: boolean;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne(() => Category)
  category: Category;

  @Column()
  category_id: string;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}

export { Car };
