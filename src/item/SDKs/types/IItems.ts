import { ISendItemDto } from './../../dto/send-item.dto'
import { ISendItemsDto } from './../../dto/send-items.dto'
import { Observable } from 'rxjs';

export interface IItems {

  findByTerm(search: string): Observable<ISendItemsDto>;

  findOne(id: string): Promise<ISendItemDto>;
}
