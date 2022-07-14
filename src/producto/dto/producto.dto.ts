import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/isnotblank.decorator";
//es el data transfert object
//agregar mas datos
export class ProductoDto{
    
    @IsNotBlank({message: 'El n° boleta esta vacio'})
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1,{message: 'El precio no debe de estar vacio'})
    precio?: number;

    @IsNotBlank({message: 'la fecha de entrega esta vacio'})
    fecha?: string;

    @IsNotBlank({message: ' el nombre de entrega esta vacio'})
    nomapp?: string;

    @IsNotBlank({message: 'la direccion de entrega esta vacio'})
    direccion?:string;
    

    @IsNotBlank({message: 'los detalles de entrega esta vacio'})
    detalles?:string
}