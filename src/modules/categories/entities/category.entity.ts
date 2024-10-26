import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'parent_id' })
  parent: Category; // Referencing the Category entity itself

  @Column({ nullable: true })
  parent_id: number; // (self-referencing FK for hierarchical categories)

  constructor(category: Partial<Category>) {
    Object.assign(this, category);
  }
}
