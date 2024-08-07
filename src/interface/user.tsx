import { IEmployee, IEmployeeGetMe } from "./employee";
import { IRole } from "./role";

export interface IUser{
    id?:number,
    login:string,
    password:string,
    role:IRole | undefined,
    employee:IEmployee,
}

export interface IUserResponse{
    detail: IUser[]
}

export interface IUserRequest{
    id?:number,
    login:string,
    password:string,
    role_id:number,
    employee_id:number,
}

export interface IUserAddResponse{
    detail:string,
    user: IUser
}

export interface IGetMe{
    id?:number,
    login:string,
    password:string,
    role:IRole | undefined,
    employee:IEmployeeGetMe,
}