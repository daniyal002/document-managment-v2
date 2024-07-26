import { useProductStore } from "@/store/ProductStore/ProductStore";
import { Input } from "antd";
import type { SearchProps } from 'antd/es/input/Search';



export function ProductSearch(){

const products = useProductStore((state) => state.products);
const setSearchProducts = useProductStore((state) => state.setSearchProducts);


  const { Search } = Input;

    const onSearch: SearchProps['onSearch'] = (value, _e) => {
        if (value !== "") {
          // Создаем регулярное выражение из поискового запроса
          const regex = new RegExp(value.split('').join('.*'), 'i'); 
          setSearchProducts(products.filter(data => {
            return data.product_name.match(regex);
          }));
        } else {
            setSearchProducts(products);
        }
      };

      return(
      <Search placeholder="Введите название" onSearch={onSearch} enterButton />

      )
}