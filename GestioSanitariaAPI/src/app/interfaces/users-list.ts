import { Guid } from 'guid-typescript';

export interface UsersList {
  id : Guid;
  userName : string;
  password: string;
  email : string;
  dataAlta : Date;
  databaixa : Date;
  esBloquejat : boolean;
  rol : Number;
}
