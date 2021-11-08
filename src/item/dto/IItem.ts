import { IPrice } from './IPrice';

export type IItem = {
  id: string;
  title: string;
  price: IPrice;
  picture: string;
  condition: string;
  free_shipping: boolean
  description: string;
}