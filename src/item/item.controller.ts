import { Controller, Get, Query, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { ISendItemDto } from './dto/send-item.dto'
import { ISendItemsDto } from './dto/send-items.dto'
import { Observable } from 'rxjs';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(@Query('search') search: string): Observable<ISendItemsDto> {
    return this.itemService.findByTerm(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ISendItemDto> {
    return this.itemService.findOne(id);
  }
}
