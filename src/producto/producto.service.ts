import { ProductoDto } from './dto/producto.dto';
import { ProductoRepository } from './producto.repository';
import { ProductoEntity } from './producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, ObjectID } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }


    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista esta vacia'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { nombre: nombre } });
        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException(new MessageDto('ese despacho ya existe'))
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto('despacho creado');
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto) throw new BadRequestException({ message: 'ese producto no existe' })
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException({ message: 'ese nombre ya existe' })
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.precio ? producto.precio = dto.precio : producto.precio = producto.precio;
        //aagregar mas productos
        await this.productoRepository.save(producto);
        return new MessageDto('producto actualizado');
    }

    async delet(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return new MessageDto('producto eliminado');
    }


}