import { IItem } from './IItem';
import { IAuthor } from './IAuthor';

type ICategory = {
  id: string;
  name: string;
}

export class ISendItemsDto {

  author: IAuthor;

  categories: ICategory[];

  items: IItem[];
}
