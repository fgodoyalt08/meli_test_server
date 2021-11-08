import { IItems } from './types/IItems';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISendItemsDto } from './../dto/send-items.dto';
import { ISendItemDto } from './../dto/send-item.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export class Meli implements IItems {

  constructor(private httpService: HttpService, private configService: ConfigService) { }

  findByTerm(term: string): Observable<ISendItemsDto> {

    return this.httpService.get(`${this.configService.get('MELI_SEARCH_BY_TERM_HOST')}?q=${term}&limit=${this.configService.get('MELI_SEARCH_BY_TERM_LIMIT')}`).pipe(
      map((response) => {

        const responseData: any = response.data;

        const items = responseData.results?.map((item) => {

          const standarPrice = item.prices.prices.find((price) => price.type === 'standard');

          return {
            id: item.id,
            title: item.title,
            price: {
              currency: standarPrice.currency_id,
              amount: standarPrice.amount,
              decimals: Number(standarPrice.amount).toString().split('.')[1]?.length || 0
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
          }
        });

        const filters = responseData.filters?.length ? responseData.filters : responseData.available_filters;

        const mapCategoryValues = (category) => ({ id: category.id, name: category.name });
        
        return {
          author: {
            name: this.configService.get('NAME'),
            lastname: this.configService.get('LASTNAME')
          },
          categories: filters?.find((filter) => filter.id === 'category')?.values.sort((a, b) => a.results - b.results).map(mapCategoryValues),
          items
        };
      })
    );
  }

  findOne(id: string): Promise<ISendItemDto> {
    return new Promise(async(resolve, reject) =>{
      try {
        lastValueFrom(this.httpService.get(`${this.configService.get('MELI_SEARCH_BY_ID')}/${id}`).pipe(
        map((response) => {

          const item: any = response.data;

          const standarPrice = {
            amount: item.price,
            currency_id: 'ARS'
          };

          return {
            author: {
              name: this.configService.get('NAME'),
              lastname: this.configService.get('LASTNAME')
            },
            item: {
              id: item.id,
              title: item.title,
              price: {
                currency: standarPrice.currency_id,
                amount: standarPrice.amount,
                decimals: Number(standarPrice.amount).toString().split('.')[1]?.length || 0
              },
              picture: item.thumbnail,
              condition: item.condition,
              free_shipping: item.shipping.free_shipping,
              description: ''
            }
          } as ISendItemDto;
          
        }))).then((result)=>{
          
          lastValueFrom(this.httpService.get(`https://api.mercadolibre.com/items/${result.item.id}/description`).pipe(
            map((response) => {

              const itemData: any = response.data;
              const description = itemData.plain_text;

              result.item.description = description;

              return result;
            })
          )).then(resolve);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
}
