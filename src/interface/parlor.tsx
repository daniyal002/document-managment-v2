import { IDepartment } from "./department";
import { IFloor } from "./floor";

export interface IParlor{
    id?:number,
    parlor_name:string,
    department:IDepartment | undefined
    floor?: IFloor | undefined
}

export interface IParlorRespone{
    detail:IParlor[]
}

export interface IParlorRequest{
    id?:number,
    parlor_name:string,
    department_id:number
    floor_id?: number
}

export interface IParlorAddResponse{
    detail:string,
    parlor: IParlor
}