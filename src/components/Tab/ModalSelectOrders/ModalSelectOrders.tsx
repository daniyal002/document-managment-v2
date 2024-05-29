import { useOrderStore } from "@/store/OrderStore/orderStore";
import {Button,Checkbox,Modal, Space, Table, TableColumnsType } from "antd";
import { useState } from "react";
import style from './ModalSelectOrders.module.scss'
import { IOrderItem } from "@/interface/orderItem";
import { compareByFullName } from "@/helper/EmployeeSorter";
import { IEmployee } from "@/interface/employee";
import { DrawerDetail } from "./Drawer/Drawer";

interface Props{
    isModalOpen:any
    handleOk:any
    handleCancel:any
}

export function ModalSelectOrders({isModalOpen, handleOk, handleCancel}:Props){

    const orders = useOrderStore((state) => state.orders);
    const [selectedOrderId, setSelectedOrderId] = useState<number[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<IOrderItem>();


    const handleCheckboxChange = (orderId: number) => {
        setSelectedOrderId((prevId) => {
          if (prevId.includes(orderId)) {
            // Удаление всех вхождений orderId
            return prevId.filter((id) => id !== orderId);
          } else {
            // Добавление orderId
            return [...prevId, orderId];
          }
        });
      };
  
    const onOk = () => {
        if (selectedOrderId && selectedOrderId.length > 0) {
          const selectedOrders = orders.filter((order) =>
            selectedOrderId.includes(order.id)
          );
          handleOk(selectedOrders); // Передаем выбранные заказы в handleOk
        }
      };

      const columns: TableColumnsType<IOrderItem> = [
        {
          title: '№',
          dataIndex: 'number',
          key: 'number',
          sorter: {
            compare: (a:any, b:any) => a.number - b.number,
          },
          width:"50px"
        },
        
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date',
          sorter: (a:any, b:any) => {
            // Convert date strings to Date objects
            const dateA = new Date(a.date.split('.').reverse()); 
            const dateB = new Date(b.date.split('.').reverse()); 
    
            // Compare Date objects using getTime() to get milliseconds since epoch
            return dateA.getTime() - dateB.getTime();
          },
          width:"100px",
          responsive:['sm']

        },
        {
          title: 'Инициатор',
          dataIndex: 'initiator',
          key: 'initiator',
          sorter: (a:IOrderItem, b:IOrderItem) => compareByFullName(a.initiator as IEmployee, b.initiator as IEmployee),
          ellipsis: true,
          render: (initiator:IEmployee) => `${initiator.last_name} ${initiator.first_name} ${initiator.middle_name}`,
          responsive:['sm']
        },
        {
          title: 'Действия',
          key: 'action',
          render:(_:any, record:IOrderItem) => (
            <Space size="middle">
              <Checkbox 
                checked={selectedOrderId?.includes(record.id)}
                onChange={() => handleCheckboxChange(record.id)}/>
                <Button onClick={() => {setSelectedOrder(record); showDrawer()}}>Подробно</Button>
            </Space>)
        },
    ];

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
      };
    

  return (
    <>
      
    <Modal title={`Создание сводной заявки`} width={900} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
          <>
            <Button onClick={()=>onOk()}>Создать</Button>
            <Button onClick={handleCancel}>Закрыть</Button>
          </>
        )}>
        <DrawerDetail open={open} onClose={onClose} order={selectedOrder as IOrderItem}/>
        <Table dataSource={orders} columns={columns} pagination={{ pageSize: 20}}/>
      </Modal>
    </>
  );
}