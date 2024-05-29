import { IDepartment } from "@/interface/department";
import { IEmployee } from "@/interface/employee";
import { IProductTable } from "@/interface/productTable";
import { IParlor } from "./parlor";

export interface IOrderItem {
    id:number;
    number: string;
    date: string;
    status: string;
    initiator: IEmployee | undefined;
    OMS:true | false,
    department:IDepartment | undefined;
    parlor:IParlor | undefined;
    productOrder:IProductTable[];
  }