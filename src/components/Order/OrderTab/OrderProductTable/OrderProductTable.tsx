import style from "./OrderProductTable.module.scss"
import { useProductTableStore } from "@/store/ProductTableStore/ProductTableStore"
import { IProduct } from "@/interface/product"
import { Button, Input, InputProps, Space, Table, Typography } from "antd"
import { OrderProduct } from "../OrderProduct/OrderProduct"
import { useEffect, useState } from "react"
import { IProductTable } from "@/interface/productTable"
import { OrderModal } from "../OrderModal/OrderModal"
import type { NotificationArgsProps, TableColumnsType } from 'antd';
import useNotification from "antd/es/notification/useNotification"
import { useTabStore } from "@/store/TabStore/TabStore"
import { IOrderItem } from "@/interface/orderItem"


type NotificationPlacement = NotificationArgsProps['placement'];

interface Props{
  setOrderProductTable:any
  keyTab:string
  getOrderById?:IOrderItem
}

export function OrderProductTable({setOrderProductTable,keyTab,getOrderById}:Props){

    
    const [api, contextHolder] = useNotification();
    const productsTable = useProductTableStore(state => state.productsInTable)
    const thisTab = useTabStore(state => state.getTabByKey(keyTab))

    const deleteProductInTable = useTabStore(state => state.deleteProductFromTable)
    const updateProductInTable = useTabStore(state => state.updateProductInTable)
    const pasteProductToTable = useTabStore(state => state.pasteProductToTable)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openSelection, setOpenSelection] = useState(false);
    const [productInTable, setProductInTable] = useState<IProductTable>({id:1,product:{id:1, name:"1", basicUnit:{id:1, fullName:'in',name:"ss"}}, count:0,unitProductTable:"шт"})

    useEffect(()=>{
        pasteProductToTable(keyTab, getOrderById?.productOrder)
    },[getOrderById?.productOrder])

    useEffect(()=>{
      setOrderProductTable(thisTab?.productsInTable)
    },[thisTab?.productsInTable])

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = (unitProductTable:string, count:number) => {
      setIsModalOpen(false);
      updateProductInTable(keyTab,Number(productInTable.id),unitProductTable,count)
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const columns: TableColumnsType = [
        {
          title: 'Товар',
          dataIndex: 'product',
          key: 'product',
          sorter: {
            compare: (a:any, b:any) => a.product.name.localeCompare(b.product.name, 'ru'),
          },
          render: (product:IProduct) => product.name
        },
        
        {
          title: 'Ед. измерения',
          dataIndex: 'unitProductTable',
          key: 'unitProductTable',
          sorter: {
            compare: (a:any, b:any) => a.unitProductTable.localeCompare(b.unitProductTable, 'ru'),
          },
          responsive:['sm']
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
            sorter: {
                compare: (a:any, b:any) => a.count - b.count,
            },
          responsive:['sm']

          },
          {
            title: 'Действия',
            key: 'action',
            render: (record:IProductTable) => (
              <Space size="middle">
                <div className={style.orderProductTableAction}>
                <Button onClick={()=>{setProductInTable(record);showModal()}}>Изменить</Button>
                <Button onClick={()=>deleteProductInTable(keyTab,record.id)}>Удалить</Button>
                <Button onClick={() => openNotification('top', record.product.name, record.unitProductTable, record.count)}id={style.orderProductTableActionButton}>Подробнее</Button>
                </div>
            </Space>
            ),
          },
    ];

    const [pageSize, setPageSize] = useState<Number>(20)
    const onChangeInput:InputProps['onChange'] = (e) =>{
      if(Number(e.target.value) <= 0){
        setPageSize(10)
      }else{
        setPageSize(Number(e.target.value))
      }
    }
    

  const openNotification = (placement: NotificationPlacement, productName:string, productUnit:string, productCount:number) => {
    api.info({
      message: `Подробнее о товаре ${productName}`,
      description:
        `Количество: ${productCount} Единица измерения: ${productUnit}`,
      placement,
    });
  };

    return(
        
        <div className={style.orderProductTable}>
            {contextHolder}
            <OrderModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} product={productInTable.product} type="Изменение" defaultValuesCount={productInTable.count} defaultValuesUnit={productInTable.unitProductTable}/>
            <Button onClick={() => setOpenSelection(!openSelection)}>Подбор</Button>
            <div className={style.orderProductTableSelection}>
                <Table dataSource={thisTab?.productsInTable} columns={columns} className={openSelection ? style.table :style.tableMaxWidth} pagination={{ pageSize: Number(pageSize)}}   scroll={{ y: 700 }}
                footer={(_) => (
                  <>
                    <Typography.Title id={style.orderProductTableFooterLabel}>Количество товара в таблице</Typography.Title>
                    <Input onChange={onChangeInput} placeholder="10"  id={style.orderProductTableFooterInput}/>
                  </>)}
                />
                {openSelection && (
                <OrderProduct keyTab={keyTab}/>
                 )}
            </div>
        </div>
    )
}