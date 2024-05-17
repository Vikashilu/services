import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Trade } from './Trade';

@Entity()
export class Portfolio{
    @PrimaryGeneratedColumn()
    id: number;

   @OneToMany(()=> Trade, (trade) => trade.id)
   trades: Trade[];

   @CreateDateColumn()
   created_date: Date;

   @UpdateDateColumn()
   updated_date: Date;
}