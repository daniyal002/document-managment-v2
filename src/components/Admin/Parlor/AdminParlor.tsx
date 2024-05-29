'use client'
import style from './AdminParlor.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { useParlorStore } from '@/store/ParlorStore/ParlorStore'
import { IDepartment } from '@/interface/department'
import { AdminParlorModal } from './AdminParlorModal/AdminParlorModal'
import { AdminParlorTable } from './AdminParlorTable/AdminParlorTable'
import { useCreateParlorMutation, useParlorData } from '@/hook/Parlor/parlorHook'
import { IFloor } from '@/interface/floor'


export function AdminParlor(){

    const parlors = useParlorStore(state => state.parlors)

      const {mutate:createParlorMutation} = useCreateParlorMutation()
      const {isLoading,error} = useParlorData() 

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (parlor_name:string,department:IDepartment,floor:IFloor) => {
        setIsModalOpen(false);
        createParlorMutation({parlor_name,department,floor})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <div className={style.adminParlor}>
            <AdminParlorModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => {showModal()}}>Добавить кабинет</Button>
            <AdminParlorTable parlors={parlors} isLoading={isLoading}/>
        </div>
    )
}