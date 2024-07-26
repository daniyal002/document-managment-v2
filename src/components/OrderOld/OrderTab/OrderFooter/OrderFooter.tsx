import { Button } from "antd";
import style from "./OrderFooter.module.scss"

interface Props{
    closeTab:any
    newOrder:any
    updateOrder?:any
    type: "Создание" | "Изменение"

}

export function OrderFooter({closeTab,newOrder,updateOrder,type}:Props){
    return(
    <div className={style.orderFooter}>
        {type == "Создание" ? 
        ( 
            <Button type="primary" onClick={()=>newOrder()}>Старт</Button>
        ):
        (
            <Button type="primary" onClick={()=>updateOrder()}>Старт</Button>
        )}
       
        <Button onClick={()=>closeTab()} danger>Отмена</Button>
    </div>)
}