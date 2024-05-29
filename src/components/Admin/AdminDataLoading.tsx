'use client'

import { useDepartmentData } from "@/hook/Department/departmentHook";
import { useEmployeeData } from "@/hook/Employee/employeeHook";
import { useFloorData } from "@/hook/Floor/floorHook";
import { useHousingData } from "@/hook/Housing/housingHook";
import { useParlorData } from "@/hook/Parlor/parlorHook";
import { usePostData } from "@/hook/Post/postHook";
import { useRoleData } from "@/hook/Role/roleHook";
import { useUserData } from "@/hook/User/userHook";
import { IDepartment } from "@/interface/department";
import { IEmployee } from "@/interface/employee";
import { IFloor } from "@/interface/floor";
import { IHousing } from "@/interface/housing";
import { IParlor } from "@/interface/parlor";
import { IPost } from "@/interface/post";
import { IRole } from "@/interface/role";
import { IUser } from "@/interface/user";
import { useDepartmentStore } from "@/store/DepartmentStore/DepartmentStore";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useFloorStore } from "@/store/FloorStore/FloorStore";
import { useHousingStore } from "@/store/HousingStore/HousingStore";
import { useParlorStore } from "@/store/ParlorStore/ParlorStore";
import { usePostStore } from "@/store/PostStore/PostStore";
import { useRoleStore } from "@/store/RoleStore/RoleStore";
import { useUserStore } from "@/store/UserStore/UserStore";
import { useEffect } from "react";

export function AdminDataLoading(){
    ///Корпуса
    const setHousings = useHousingStore(state => state.setHousings)
    const {housingsData} = useHousingData();

    useEffect(() => {
      if (housingsData) {
        setHousings(housingsData as IHousing[]);
      }
    }, [housingsData, setHousings]);
    ///Корпуса

    ///Подразделения
    const setDepartments = useDepartmentStore(state => state.setDepartments)
    const {departmentData} = useDepartmentData()
    useEffect(() => {
        if (departmentData) {
          setDepartments(departmentData as IDepartment[]);
        }
      }, [departmentData, setDepartments]);
    ///Подразделения

    ///Кабинеты
    const setParlors = useParlorStore(state => state.setParlors)
    const {parlorData} = useParlorData()
    useEffect(() => {
        if (parlorData) {
          setParlors(parlorData as IParlor[]);
        }
      }, [parlorData, setParlors]);
    ///Кабинеты

    ///Этажи
    const setFloors = useFloorStore(state => state.setFloors)
    const {floorData} = useFloorData()
    useEffect(() => {
      if (floorData) {
        setFloors(floorData as IFloor[]);
      }
    }, [floorData, setFloors]);
    ///Этажи

    ///Сотрудники
    const setEmployee = useEmployeeStore(state => state.setEmployee)
    const {employeeData} = useEmployeeData()
    useEffect(() => {
      if (employeeData) {
        setEmployee(employeeData as IEmployee[]);
      }
    }, [employeeData, setEmployee]);
    ///Сотрудники

    ///Роли
    const setRoles = useRoleStore(state => state.setRoles)
    const {roleData} = useRoleData()
    useEffect(() => {
      if (roleData) {
        setRoles(roleData as IRole[]);
      }
    }, [roleData, setRoles]);
    ///Роли

    ///Должности
    const setPosts = usePostStore(state => state.setPosts)
    const {postData} = usePostData()
    useEffect(() => {
      if (postData) {
        setPosts(postData as IPost[]);
      }
    }, [postData, setPosts]);
    ///Должности

     ///Пользователи
     const setUsers = useUserStore(state => state.setUsers)
     const {userData} = useUserData()
     useEffect(() => {
       if (userData) {
        setUsers(userData as IUser[]);
       }
     }, [userData, setUsers]);
     ///Пользователи

    return(<></>)
}