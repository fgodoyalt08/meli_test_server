import { Meli } from './Meli';
import { HttpService } from '@nestjs/axios';
import { IItemsType } from './types/IItemsType';
import { ConfigService } from '@nestjs/config';

export class IItemsFactory {

  constructor(private httpService: HttpService, private configService: ConfigService) { }

  getInstance(factoryType: IItemsType) {
    switch (factoryType) {
      case IItemsType.MELI:
        return new Meli(this.httpService, this.configService);

      default:
        return null;
    }
  }
}
