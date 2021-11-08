import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ItemModule, ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })]
})
export class AppModule { }
