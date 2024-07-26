'use client'

import { useTabStore } from "@/store/TabStore/TabStore";
import { Button, Tabs } from "antd";
import Order  from "../OrderOld/OrderTab/Order";
import useMessage from "antd/es/message/useMessage";
import style from './Tab.module.scss'
import { ModalSelectOrders } from "./ModalSelectOrders/ModalSelectOrders";
import { useEffect, useState } from "react";
import { IOrderItem } from "@/interface/orderItem";
import { useProductStore } from "@/store/ProductStore/ProductStore";
import { useProductData } from "@/hook/Product/productHook";
import { IProductUnit } from "@/interface/product";

export function Tab(){

  const [messageApi, contextHolder] = useMessage();
    const tabs = useTabStore((state) => state.tabs);
    const createNewTab = useTabStore((state) => state.createNewTab);
    const isNewTab = useTabStore((state) => state.isNewTab);
    const editIsNewTab = useTabStore((state) => state.editIsNewTab);
    const setActiveKey =  useTabStore((state) => state.setActiveKey);
    const activeKey =  useTabStore((state) => state.activeKey);


    ///Продукт
    const setProducts = useProductStore(state => state.setProducts)
    const {productData} = useProductData()
    useEffect(() => {
      if (productData) {
        setProducts(productData as IProductUnit[]);
      }
    }, [productData, setProducts]);
    ///Продукт


    const onChange = (key: string) => {
      setActiveKey(key);
    };

    function newTabPane(typeTab: "newTab" | "summaryNewTab",order?:IOrderItem[]) {
        if(isNewTab==false){
          const newKey = `tab-${Date.now()}`; // Уникальный ключ на основе времени
          setActiveKey(newKey)
          if(typeTab === "newTab"){
            createNewTab("Новая заявка", <> Новая заявка {newKey} <Order keyTab={newKey} type="Создание"/> </>, newKey );
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
        <Tabs items={tabs} activeKey={activeKey} onChange={onChange}/>
      </>
    )
}