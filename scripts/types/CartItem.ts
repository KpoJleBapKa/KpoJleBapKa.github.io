import { BaseProduct } from './BaseProduct';

export type CartItem<T> = {
  product: T;
  quantity: number;
};
