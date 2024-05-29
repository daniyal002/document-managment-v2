import { IBasicUnit } from "./basicUnit";
import { IProduct } from "./product";

export interface IUnit{
    id:number,
    name:string,
    basicUnit:IBasicUnit,
    factor:number,
    product:IProduct
}