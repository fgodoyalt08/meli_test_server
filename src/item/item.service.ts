import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { ISendItemsDto } from './dto/send-items.dto';
import { ISendItemDto } from './dto/send-item.dto';
import { IItems } from './SDKs/types/IItems';
import { IItemsFactory } from './SDKs/IItemsFactory';
import { IItemsType } from './SDKs/types/IItemsType';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItemService implements IItems {

  private itemSDK: IItems;

  constructor(private httpService: HttpService, private configService: ConfigService) {
    const sdkFactory = new IItemsFactory(httpService, configService);
    this.itemSDK = sdkFactory.getInstance(IItemsType.MELI);
  }

  findByTerm(term: string): Observable<ISendItemsDto> {
    return this.itemSDK.findByTerm(term);
  }

  findOne(id: string): Promise<ISendItemDto> {
    return this.itemSDK.findOne(id);
  }
}
