'use client'
import style from './AdminRole.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { useRoleStore } from '@/store/RoleStore/RoleStore'
import { AdminRoleModal } from './AdminRoleModal/AdminRoleModal'
import { AdminRoleTable } from './AdminRoleTable/AdminRoleTable'
import { useCreateRoleMutation, useRoleData } from '@/hook/Role/roleHook'


export function AdminRole(){


  const roles = useRoleStore(state => state.roles);

  const { mutate: createRoleMutation } = useCreateRoleMutation();
  const {isLoading,error} = useRoleData();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (newRole:string) => {
    setIsModalOpen(false);
    createRoleMutation({role_name:newRole})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    return(
        <div className={style.adminRole}>
            <AdminRoleModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => {showModal()}}>Добавить роль</Button>
            <AdminRoleTable roles={roles} isLoading={isLoading}/>
        </div>
    )
}