import { IProductGroup, IProductUnit } from "@/interface/product";
import { useProductStore } from "@/store/ProductStore/ProductStore";
import { Button, Modal, Table, TableColumnsType } from "antd";
import style from "./OrderProduct.module.scss"
import { useEffect, useState } from "react";
import { OrderModal } from "../OrderModal/OrderModal";
import { ProductSearch } from "./ProductSearch/ProductSearch";
import { useTabStore } from "@/store/TabStore/TabStore";
import { IBasicUnit } from "@/interface/basicUnit";


interface Props{
  keyTab:string,
  isModalOpen:any
  handleOk:any
  handleCancel:any
}

export function OrderProduct({keyTab,isModalOpen,handleOk,handleCancel}:Props){

    const thisTab = useTabStore(state => state.getTabByKey(keyTab))
    const addProductInTable = useTabStore(state => state.addProductToTable)
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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
      {
        title: 'Группа товара',
        dataIndex: 'product_group',
        key: 'product_group',
        sorter: {
          compare: (a:any, b:any) => a.product_group.name.localeCompare(b.product_group.name, 'ru'),
        },
        filters:searchProducts.map(product => ({text:product.product_group.name,value:product.product_group.name})),
        filterMode: 'menu',
        filterSearch: true,
        onFilter: (value:string, record:IProductUnit) => record.product_group.name.includes(value),
        render: (product_group:IProductGroup) => product_group?.name
      },
      
  ];

  const showModal = () => {
    setIsOrderModalOpen(true);
    console.log(productWhenDoubleClick)
  };

  const handleOkOrderModal = (unitProductTable:IBasicUnit, count:number) => {
    setIsOrderModalOpen(false);
    const newIdProductInTable = thisTab?.productsInTable ? thisTab?.productsInTable.length + 1 : 1; 
    addProductInTable(keyTab,{id:newIdProductInTable,product:productWhenDoubleClick as IProductUnit, unitProductTable,count})
  };

  const handleCancelOrderModal = () => {
    setIsOrderModalOpen(false);
  };
    
  const setSearchProducts = useProductStore((state) => state.setSearchProducts);
  useEffect(()=>{
    setSearchProducts(oldProducts)
  },[])
    
    return(
        <>
        <OrderModal handleCancel={handleCancelOrderModal} handleOk={handleOkOrderModal} isModalOpen={isOrderModalOpen} product={productWhenDoubleClick as IProductUnit} keyTab={keyTab} type="Добавление"/>
         <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={"90%"} footer={(_) => (
                  <>
                    <Button onClick={handleCancel}>Закрыть</Button>
                  </>)}>

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
        </Modal>
        </>
        
    )
}