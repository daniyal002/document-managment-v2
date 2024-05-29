'use client'
import { useHousingStore } from '@/store/HousingStore/HousingStore'
import style from './AdminHousing.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { HousingModal } from './HousingModal/HousingModal'
import {  AdminHousingTable } from './AdminHousingTable/AdminHousingTable'
import { useCreateHousingMutation, useHousingData } from '@/hook/Housing/housingHook'


export function AdminHousing(){

  const housings = useHousingStore(state => state.housings);

  const { mutate: createHousingMutation } = useCreateHousingMutation();
  const {isLoading,error} = useHousingData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (newHousing:string) => {
    setIsModalOpen(false);
    createHousingMutation({housing_name:newHousing})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

    return(
        <div className={style.adminHousing}>
            <HousingModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => {showModal()}}>Добавить корпус</Button>
            <AdminHousingTable housings={housings} isLoading={isLoading}/>
        </div>
    )
}