'use client'
import { IOrderItem } from "@/interface/orderItem"
import { useOrderStore } from "@/store/OrderStore/orderStore"
import Link from "next/link"

export default function Order(){
const nowTime = Date.now()
const createNewOrder = useOrderStore(state => state.createNewOrder)
const NewOrder = () =>{
    const newOrder:IOrderItem = {
        id: Number(nowTime),
        number: String(nowTime),
        date: new Date().toLocaleString('ru-RU'),
        OMS:false,
        status:"На согласовании",
        department:undefined,
        initiator:undefined,
        productOrder:[]
    }
    createNewOrder(newOrder)
}
    return(
        <Link href={`/order/${nowTime}`} onClick={() =>NewOrder()}>Создать заявку</Link>
    )
}
    