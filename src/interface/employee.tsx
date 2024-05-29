import { IParlor } from "./parlor"
import { IPost } from "./post"

export interface IEmployee{
    id?:number
    first_name:string,
    last_name:string,
    middle_name:string,
    post:IPost,
    parlor:IParlor[] | undefined
} 

export interface IEmployeeFullName{
    firstName:string,
    lastName:string,
    middleName:string
}

export interface IEmployeeResponse{
    detail:IEmployee[]
}

export interface IEmployeeRequest{
    employee:{
    id?:number
    first_name:string,
    last_name:string,
    middle_name:string,
    post_id:number,
    },
    parlor_ids:number[]
}

export interface IEmployeeAddResponse{
    detail:string,
    employee: IEmployee
}
