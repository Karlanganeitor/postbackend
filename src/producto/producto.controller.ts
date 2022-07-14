import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductoDto } from './dto/producto.dto';
import { ProductoService } from './producto.service';
import{ApiTags} from '@nestjs/swagger'

@ApiTags('despachos')
@Controller('producto')
export class ProductoController {

    constructor(private readonly ProductoService: ProductoService){}

    @Get()
    async getAll(){
        return this.ProductoService.getAll();
    }


    @Get(':id')
    async getOne(@Param('id',ParseIntPipe)id: number){
        return this.ProductoService.findById(id);
    }

    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ProductoDto) {
        return await this.ProductoService.create(dto);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id',ParseIntPipe)id: number, @Body() dto: ProductoDto) {
        return await this.ProductoService.update(id, dto);
    }



    @Delete(':id')
    async delete(@Param('id',ParseIntPipe)id: number){
        return await this.ProductoService.delet(id)

    }
}
