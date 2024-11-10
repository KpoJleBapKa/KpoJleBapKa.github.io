import { BaseProduct } from './BaseProduct';

export type Electronics = BaseProduct & {
  category: 'electronics';
  warranty: number;
  brand: string;
};
