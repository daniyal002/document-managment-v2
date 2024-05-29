'use client'
import style from './AdminDepartment.module.scss'
import { Button } from 'antd'
import { IHousing } from '@/interface/housing'
import { useState } from 'react'
import { useDepartmentStore } from '@/store/DepartmentStore/DepartmentStore'
import { AdminDepartmentModal } from './AdminDepartmentModal/AdminDepartmentModal'
import { AdminDepartmentTable } from './AdminDepartmentTable/AdminDepartmentTable'
import { useCreateDepartmentMutation, useDepartmentData } from '@/hook/Department/departmentHook'


export function AdminDepartment(){
  const departments = useDepartmentStore(state => state.departments)
  const {mutate:createDepartmentMutation} = useCreateDepartmentMutation()
  const {isLoading,error} = useDepartmentData()  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (department_name:string,housing:IHousing) => {
    setIsModalOpen(false);
    createDepartmentMutation({department_name,housing})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


    return(
        <div className={style.adminDepartment}>
            <AdminDepartmentModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => {showModal()}}>Добавить подразделение</Button>
            <AdminDepartmentTable departments={departments} isLoading={isLoading}/>
        </div>
    )
}