import { IProduct } from "./product";

export interface IProductTable{
    id:number | undefined,
    product:IProduct,
    unitProductTable:string,
    count:number
}