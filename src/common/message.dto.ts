export class MessageDto {
    message: string[] = [];
//mensaje que se muestre segun el tipo de metodo que use
    constructor(message: string){
        this.message[0] = message;
    }
}