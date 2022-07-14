import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
//es para evitar que los datos ingresados no sean en blanco
export function IsNotBlank(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsNotBlank',
            target: object.constructor,
            propertyName: propertyName,

            options: validationOptions,
            validator: {
                validate(value: any) {
                    
                    if(typeof value !== 'string') return false;
                    const valueRim= value.replace(/ /g, '');
                    if(valueRim ==='')return false;
                    return true;

                   
                },
            },
        });
    };
}