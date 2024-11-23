import { BaseContent } from '../interfaces/BaseContent';

export interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  stock: number;
}
