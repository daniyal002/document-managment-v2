import { OrderDataTable } from "./OrderDataTable/OrderDataTable";
import { OrderSearch } from "./OrderSearch/OrderSearch";
import style from './OrderList.module.scss'

export function OrderList(){
    return(
    <div className={style.orderList}>
        <OrderSearch/>
        <OrderDataTable/>
    </div>
    )
}