import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Stock } from './Stock';

@Entity()
export class Trade{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date:Date;

    @Column()
    price:number;

    @Column()
    quantity:number;

    @Column()
    type:'buy' | 'sell';

    @ManyToOne(() => Stock, (stock) => stock.id)
    stock: Stock;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;
}