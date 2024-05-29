'use client'

import { useTabStore } from "@/store/TabStore/TabStore";
import { Button, Tabs } from "antd";
import Order  from "../Order/OrderTab/Order";
import useMessage from "antd/es/message/useMessage";
import style from './Tab.module.scss'
import { ModalSelectOrders } from "./ModalSelectOrders/ModalSelectOrders";
import { useState } from "react";
import SummaryOrder from "../Order/SummaryOrder/SummaryOrder";
import { IOrderItem } from "@/interface/orderItem";

export function Tab(){

  const [messageApi, contextHolder] = useMessage();
    const tabs = useTabStore((state) => state.tabs);
    const createNewTab = useTabStore((state) => state.createNewTab);
    const isNewTab = useTabStore((state) => state.isNewTab);
    const editIsNewTab = useTabStore((state) => state.editIsNewTab);
    const setActiveKey =  useTabStore((state) => state.setActiveKey);
    const activeKey =  useTabStore((state) => state.activeKey);




    const onChange = (key: string) => {
      setActiveKey(key);
    };

    function newTabPane(typeTab: "newTab" | "summaryNewTab",order?:IOrderItem[]) {
        if(isNewTab==false){
          const newKey = `tab-${Date.now()}`; // Уникальный ключ на основе времени
          setActiveKey(newKey)
          if(typeTab === "newTab"){
            createNewTab("Новая заявка", <> Новая заявка {newKey} <Order keyTab={newKey} type="Создание"/> </>, newKey );
          }else if(typeTab === "summaryNewTab"){
            createNewTab("Новая сводная заявка", <> Новая сводная заявка {newKey} <SummaryOrder keyTab={newKey} type="Создание"/> </>, newKey,order);
          }
          editIsNewTab(true);
        }else if(isNewTab==true){
          messageApi.open({
            type: 'error',
            content: 'Прежде чем создать новую заявку, закройте созадующую заявку',
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });
        }
        }

    
        const [isModalOpen, setIsModalOpen] = useState(false);

        const showModal = () => {
            setIsModalOpen(true);
        };
    
        const handleOk = (order:IOrderItem[]) => {
            setIsModalOpen(false);
            newTabPane("summaryNewTab",order)
            
        };
    
        const handleCancel = () => {
            setIsModalOpen(false);
        };
        
    return(
        <>
        {contextHolder}
        <ModalSelectOrders isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}/>
        <Button  onClick={() => newTabPane("newTab")} id={style.tabButton}>Создать</Button>
        <Button  onClick={showModal} id={style.tabButton}>Создать сводную заявку</Button>
        <Tabs items={tabs} activeKey={activeKey} onChange={onChange}/>
      </>
    )
}