'use client'
import style from './AdminEmployee.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { useEmployeeStore } from '@/store/EmployeeStore/EmployeeStore'
import { IParlor } from '@/interface/parlor'
import { IPost } from '@/interface/post'
import { IEmployeeFullName } from '@/interface/employee'
import { AdminEmployeeModal } from './AdminEmployeeModal/AdminEmployeeModal'
import { AdminEmployeeTable } from './AdminEmployeeTable/AdminEmployeeTable'
import { useCreateEmployeeMutation } from '@/hook/Employee/employeeHook'



export function AdminEmployee(){

    const employees = useEmployeeStore(state => state.employees)
    const {mutate:createEmployeeMutation} = useCreateEmployeeMutation()


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (fullName:IEmployeeFullName,parlor:IParlor[],post:IPost) => {
        setIsModalOpen(false);
        createEmployeeMutation({first_name:fullName.firstName,last_name:fullName.lastName,middle_name:fullName.middleName,parlor,post})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <div className={style.adminEmployee}>
            <AdminEmployeeModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => showModal()}>Добавить сотрудника</Button>
            <AdminEmployeeTable employees={employees}/>
        </div>
    )
}

