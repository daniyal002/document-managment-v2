import { useTabStore } from "@/store/TabStore/TabStore";
import { useProductTableStore } from "@/store/ProductTableStore/ProductTableStore";
import style from './Order.module.scss'
import { CloseCircleOutlined } from "@ant-design/icons";
import { OrderHeader } from "./OrderHeader/OrderHeader";
import { OrderProductTable } from "./OrderProductTable/OrderProductTable";
import { OrderFooter } from "./OrderFooter/OrderFooter";
import { useState } from "react";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { IOrderItem } from "@/interface/orderItem";

interface Props{
    keyTab:string;
    orderId?:number;
    type: "Создание" | "Изменение"
}

export default function Order({keyTab, orderId,type}:Props){

    const deleteTab = useTabStore(state => state.deleteTab)
    const clearProductTable = useProductTableStore(state => state.clearProductTable)
    const editIsNewTab = useTabStore((state) => state.editIsNewTab);
    const createNewOrder = useOrderStore((state=>state.createNewOrder))
    const orders = useOrderStore((state=>state.orders))
    const getOrderById = useOrderStore((state=>state.getOrderById(Number(orderId))))
    const updateOrder = useOrderStore((state) => state.updateOrderById)

    const [orderHeader, setOrderHeader] = useState({})
    const [orderProductTable, setOrderProductTable] = useState({})


    const closeTab = () => {
        deleteTab(keyTab);
        clearProductTable();
        editIsNewTab(false);
    }

    const newOrder = () => {
        const newIdOrder:number = orders.length + 1
        const date:string = new Date().toLocaleString('ru-RU')
        const status:string = "На согласовании"  
        const newOrder:IOrderItem = {
            id:newIdOrder,
            number:newIdOrder.toString(),
            date:date,
            status:status,
            OMS:orderHeader.OMS, 
            department:orderHeader.department,
            initiator:orderHeader.initiator,
            productOrder:orderProductTable
        }
        createNewOrder(newOrder)
        deleteTab(keyTab); 
        editIsNewTab(false)
    }

    const orderUpdate = () => {
        const date:string = new Date().toLocaleString('ru-RU')
        const status:string = "На согласовании" 
        const newUpdateOrder:IOrderItem = {
            date:date,
            status:status,
            OMS:orderHeader.OMS, 
            department:orderHeader.department,
            initiator:orderHeader.initiator,
            productOrder:orderProductTable
        }
        updateOrder(Number(orderId), newUpdateOrder);
        deleteTab(keyTab); 

    }

    return(
        <div className={style.order}>
        <button onClick={()=>closeTab()} className={style.orderCloseButton}><CloseCircleOutlined style={{color:"red"}}/></button>
        <OrderHeader setOrderHeader={setOrderHeader} getOrderById={getOrderById}/>
        <OrderProductTable setOrderProductTable={setOrderProductTable} keyTab={keyTab} getOrderById={getOrderById}/>
        <OrderFooter closeTab={()=>closeTab()} newOrder={()=>newOrder()} updateOrder={()=>orderUpdate()} type={type}/>
        </div>
    )
}