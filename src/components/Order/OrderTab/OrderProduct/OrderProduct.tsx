import { IProductUnit } from "@/interface/product";
import { useProductStore } from "@/store/ProductStore/ProductStore";
import { Table, TableColumnsType } from "antd";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productWhenDoubleClick, setProductWhenDoubleClick] = useState<IProductUnit>()
    const searchProducts = useProductStore((state) => state.searchProducts);
    const oldProducts = useProductStore((state) => state.products);
    
    const columns:TableColumnsType<IProductUnit> = [
      {
        title: 'Товар',
        dataIndex: 'product_name',
        key: 'product_name',
        sorter: {
          compare: (a:any, b:any) => a.product_name.localeCompare(b.product_name, 'ru'),
        },
        className: style.productName
        
      },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (unitProductTable:number, count:number) => {
    setIsModalOpen(false);
    const newIdProductInTable = thisTab?.productsInTable ? thisTab?.productsInTable.length + 1 : 1; 
    addProductInTable(keyTab,{id:newIdProductInTable,product:productWhenDoubleClick as IProductUnit, unitProductTable:unitProductTable,count:count})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
    
  const setSearchProducts = useProductStore((state) => state.setSearchProducts);
  useEffect(()=>{
    setSearchProducts(oldProducts)
  },[])
    
    return(
        <>
        <OrderModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} product={productWhenDoubleClick as IProductUnit} type="Добавление"/>
        <div className={style.orderProduct}>
        <ProductSearch/>
        <Table dataSource={searchProducts}
                columns={columns}
                className={style.table} 
                onRow={(record:IProductUnit)=>({onDoubleClick: () => {setProductWhenDoubleClick(record);showModal()} })}
                scroll={{ y: 700 }}
                pagination={{ pageSize: 20}}
                />
        </div>

        </>
        
    )
}