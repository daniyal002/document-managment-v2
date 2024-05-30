import { IProductUnit } from "./product";

export interface IProductTable{
    id:number | undefined,
    product:IProductUnit,
    unitProductTable:number,
    count:number
}