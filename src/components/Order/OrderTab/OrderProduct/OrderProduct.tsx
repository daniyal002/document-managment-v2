import { IProduct } from "@/interface/product";
import { useProductStore } from "@/store/ProductStore/ProductStore";
import { Table } from "antd";
import style from "./OrderProduct.module.scss"
import { useEffect, useState } from "react";
import { OrderModal } from "../OrderModal/OrderModal";
import { ProductSearch } from "./ProductSearch/ProductSearch";
import { useTabStore } from "@/store/TabStore/TabStore";


interface Props{
  keyTab:string
}

export function OrderProduct({keyTab}:Props){

    const thisTab = useTabStore(state => state.getTabByKey(keyTab))

    const addProductInTable = useTabStore(state => state.addProductToTable)


    const columns = [
        {
          title: 'Товар',
          dataIndex: 'name',
          key: 'name',
          sorter: {
            compare: (a:any, b:any) => a.name.localeCompare(b.product, 'ru'),
          },
          className: style.productName
          
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [productWhenDoubleClick, setProductWhenDoubleClick] = useState<IProduct>({id:1, name:"1", basicUnit:{id:1, fullName:'in',name:"ss"}})

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (unitProductTable:string, count:number) => {
    setIsModalOpen(false);
    const newIdProductInTable = thisTab?.productsInTable ? thisTab?.productsInTable.length + 1 : 1; 
    addProductInTable(keyTab,{id:newIdProductInTable,product:productWhenDoubleClick, unitProductTable:unitProductTable,count:count})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const searchProducts = useProductStore((state) => state.searchProducts);
const oldProducts = useProductStore((state) => state.products);

    
const setSearchProducts = useProductStore((state) => state.setSearchProducts);
useEffect(()=>{
  setSearchProducts(oldProducts)
},[])
    

    return(
        <>
        <OrderModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} product={productWhenDoubleClick} type="Добавление"/>
        <div className={style.orderProduct}>
        <ProductSearch/>
        <Table dataSource={searchProducts}
                columns={columns}
                className={style.table} 
                onRow={(record:IProduct)=>({onDoubleClick: () => {setProductWhenDoubleClick(record);showModal()} })}
                scroll={{ y: 700 }}
                pagination={{ pageSize: 20}}

                
                />
        </div>

        </>
        
    )
}