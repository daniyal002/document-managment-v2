import { IBasicUnit } from "./basicUnit";
import { IProductUnit } from "./product";

export interface IProductTable{
    id:number | undefined,
    product:IProductUnit,
    unitProductTable:IBasicUnit,
    count:number
}