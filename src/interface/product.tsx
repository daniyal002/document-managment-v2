import { IBasicUnit } from "./basicUnit";

export interface IProduct{
    id?:number,
    product_name:string,
    product_group:string,
    unit_measurement:IBasicUnit
}

export interface IProductResponse{
    detail:IProduct[]
}