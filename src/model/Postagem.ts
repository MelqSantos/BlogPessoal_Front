import { Tema } from "./Tema";
import { User } from "./User";

export class Postagem{
    public id: number;
    public titulo: string;
    public texto: string;
    public fotoPost: string; // Confirmar se é string mesmo
    public data: Date;
    public usuario : User;
    public tema : Tema;
}