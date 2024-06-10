import { useOrderStore } from "@/store/OrderStore/orderStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input } from "antd";
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
            const fullName = `${data.initiator?.last_name} ${data.initiator?.first_name} ${data.initiator?.middle_name}`;
      
            // Check if either the order number or the combined name matches the search term
            return data.number.toString().includes(value) || regex.test(fullName);
          }));
        } else {
            setSearchOrders(orders);
        }
      };

      return(
        <ConfigProvider 
      theme={{
        components:{
          Input:{
            colorIcon:"rgba(151, 141, 237,0.9)",
            colorIconHover:"rgba(151, 141, 237,0.9)",
          },
          
        }
      }}> 
      <Search placeholder="Введите номер заявки или инициатора" onSearch={onSearch} enterButton />
      </ConfigProvider>
      )
}