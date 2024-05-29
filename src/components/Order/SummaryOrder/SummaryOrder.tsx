'use client'
import { useTabStore } from "@/store/TabStore/TabStore";
import { CloseCircleOutlined } from "@ant-design/icons";
import { SummaryOrderTable } from './SummaryOrderTable/SummaryOrderTable';
import { Button } from "antd";
import { useState } from "react";
import { IOrderItem } from "@/interface/orderItem";
import { SummaryOrderModal } from "./SummaryOrderModal/SummaryOrderModal";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useParlorStore } from "@/store/ParlorStore/ParlorStore";
import { useDepartmentStore } from "@/store/DepartmentStore/DepartmentStore";

interface Props{
    keyTab:string;
    // orders:IOrderItem[]
    type: "Создание" | "Изменение"
}

export default function SummaryOrder({keyTab}:Props){
    
    const deleteTab = useTabStore(state => state.deleteTab)
    const editIsNewTab = useTabStore((state) => state.editIsNewTab);
    const addOrderToTab = useTabStore((state) => state.addOrderToTab);
    const closeTab = () => {
        deleteTab(keyTab);
        editIsNewTab(false);
    }
    const getEmployeeById = useEmployeeStore(state => state.getEmployeeById)
    const getParlorById = useParlorStore(state => state.getParlorById)
    const getDepartmentById = useDepartmentStore(state => state.getDepartmentById)
    const thisTab = useTabStore(state => state.getTabByKey(keyTab))

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
  
      const handleOk = (employeeId:number,parlorId:number,departmentId:number, isOMS:boolean) => {
        const newOrder:IOrderItem = {
            id: thisTab?.orders.length as number + 1,
            number: (thisTab?.orders.length as number + 1).toString(),
            date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            status:"На согласовании",
            initiator: getEmployeeById(employeeId),
            parlor: getParlorById(parlorId),
            department:getDepartmentById(departmentId),
            OMS:isOMS,
            productOrder:[],
          }
        setIsModalOpen(false);
        addOrderToTab(keyTab,newOrder)
      };
  
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return(
        <>
        <SummaryOrderModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} type="Добавить"/>
        <button onClick={()=>closeTab()} ><CloseCircleOutlined style={{color:"red"}}/></button>
        <h1>Сводная заявка</h1>
        <Button onClick={showModal}>Добавить заявку</Button>
        <SummaryOrderTable keyTab={keyTab}/>
        </>
    )
}