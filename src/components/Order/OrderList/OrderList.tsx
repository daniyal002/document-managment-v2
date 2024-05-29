import { OrderDataTable } from "./OrderDataTable/OrderDataTable";
import { OrderSearch } from "./OrderSearch/OrderSearch";

export function OrderList(){
    return(<>
    <OrderSearch/>
    <OrderDataTable/>
    </>)
}