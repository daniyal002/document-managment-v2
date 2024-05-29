'use client'
import style from './AdminUsers.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { IEmployee } from '@/interface/employee'
import { useUserStore } from '@/store/UserStore/UserStore'
import { IRole } from '@/interface/role'
import { AdminUserTable } from './AdminUserTable/AdminUserTable'
import { AdminUserModal } from './AdminUserModal/AdminUserModal'
import { useCreateUserMutation } from '@/hook/User/userHook'



export function AdminUsers(){

    const users = useUserStore(state => state.users)
    const {mutate:createUserMutation,error} = useCreateUserMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (login:string, password:string, employee:IEmployee, role:IRole) => {
            createUserMutation({login,password,employee,role})
            console.log(error)
            if(!error){

                setIsModalOpen(false);
            }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <div className={style.adminUsers}>
            <AdminUserModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => showModal()}>Добавить Пользователя</Button>
            <AdminUserTable users={users}/>
        </div>
    )
}

