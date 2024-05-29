import { useOrderStore } from "@/store/OrderStore/orderStore";
import { Input } from "antd";
import type { SearchProps } from 'antd/es/input/Search';



export function OrderSearch(){

const orders = useOrderStore((state) => state.orders);
const setSearchOrders = useOrderStore((state) => state.setSearchOrders);


  const { Search } = Input;

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        if (value !== "") {
          // Создаем регулярное выражение из поискового запроса
          const regex = new RegExp(value.split('').join('.*'), 'i');
          setSearchOrders(orders.filter(data => {
            // Create a combined name string
            const fullName = `${data.initiator?.lastName} ${data.initiator?.firstName} ${data.initiator?.middleName}`;
      
            // Check if either the order number or the combined name matches the search term
            return data.number.toString().includes(value) || regex.test(fullName);
          }));
        } else {
            setSearchOrders(orders);
        }
      };

      return(
      <Search placeholder="Введите номер заявки или инициатора" onSearch={onSearch} enterButton />

      )
}