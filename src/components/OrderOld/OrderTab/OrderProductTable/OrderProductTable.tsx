import style from "./OrderProductTable.module.scss"
import { useProductTableStore } from "@/store/ProductTableStore/ProductTableStore"
import { IProduct, IProductUnit } from "@/interface/product"
import { Button, ConfigProvider, Input, InputProps, Space, Table, Typography } from "antd"
import { OrderProduct } from "../OrderProduct/OrderProduct"
import { useEffect, useState } from "react"
import { IProductTable } from "@/interface/productTable"
import { OrderModal } from "../OrderModal/OrderModal"
import type { NotificationArgsProps, TableColumnsType } from 'antd';
import useNotification from "antd/es/notification/useNotification"
import { useTabStore } from "@/store/TabStore/TabStore"
import { IOrderItem } from "@/interface/orderItem"
import { IBasicUnit } from "@/interface/basicUnit"


type NotificationPlacement = NotificationArgsProps['placement'];

interface Props{
  setOrderProductTable:any
  keyTab:string
  getOrderById?:IOrderItem
}

export function OrderProductTable({setOrderProductTable,keyTab,getOrderById}:Props){

    
    const [api, contextHolder] = useNotification();
    const thisTab = useTabStore(state => state.getTabByKey(keyTab))

    const deleteProductInTable = useTabStore(state => state.deleteProductFromTable)
    const updateProductInTable = useTabStore(state => state.updateProductInTable)
    const pasteProductToTable = useTabStore(state => state.pasteProductToTable)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
    const [productInTable, setProductInTable] = useState<IProductTable>()

    useEffect(()=>{
        pasteProductToTable(keyTab, getOrderById?.productOrder as IProductTable[])
    },[getOrderById?.productOrder])

    useEffect(()=>{
      setOrderProductTable(thisTab?.productsInTable)
    },[thisTab?.productsInTable])

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = (unitProductTable:IBasicUnit, count:number) => {
      setIsModalOpen(false);
      updateProductInTable(keyTab,Number(productInTable?.id as number),unitProductTable,count)
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
            compare: (a:any, b:any) => a.product.product_name.localeCompare(b.product.product_name, 'ru'),
          },
          render: (product:IProduct) => product.product_name
        },
        
        {
          title: 'Ед. измерения',
          dataIndex: 'unitProductTable',
          key: 'unitProductTable',
          sorter: {
            compare: (a:any, b:any) => a.unitProductTable.localeCompare(b.unitProductTable, 'ru'),
          },
          render: (unit:IBasicUnit) => unit?.name,
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
                <Button onClick={()=>{setProductInTable(record);showModal(); console.log(record)}}>Изменить</Button>
                <Button onClick={()=>deleteProductInTable(keyTab,record.id as number)}>Удалить</Button>
                <Button onClick={() => openNotification('top', record.product.product_name, record.unitProductTable.name, record.count)}id={style.orderProductTableActionButton}>Подробнее</Button>
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


  const showModalProduct = () => {
    setIsModalOpenProduct(true);
  };

  const handleOkOProduct = () => {
    setIsModalOpenProduct(false);
  };

  const handleCancelProduct = () => {
    setIsModalOpenProduct(false);
  };
    return(
      <ConfigProvider 
      theme={{
        components:{
          Table:{
            headerColor:"rgba(255,255,255,1)",
            headerBg:"rgba(80, 111, 217,0.7)",
            headerSortHoverBg:'rgba(80, 111, 217,0.5)',
            bodySortBg:"rgba(220, 226, 247,1)",
            headerSortActiveBg:"rgba(80, 111, 217,0.5)",
            rowHoverBg:"rgba(80, 111, 217,0.1)",
            footerBg:"rgba(80, 111, 217,0.7)"
          }
        }
      }}> 
        <div className={style.orderProductTable}>
            {contextHolder}
            <OrderModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} product={productInTable?.product as IProductUnit} type="Изменение" defaultValuesCount={productInTable?.count} defaultValuesUnit={productInTable?.unitProductTable.id as number}/>
            <Button onClick={() => showModalProduct()}>Подбор</Button>
            <div className={style.orderProductTableSelection}>
                <Table dataSource={thisTab?.productsInTable} columns={columns} className={style.tableMaxWidth} pagination={{ pageSize: Number(pageSize)}}   scroll={{ y: 700 }}
                footer={(_) => (
                  <>
                    <Typography.Title id={style.orderProductTableFooterLabel}>Количество товара в странице таблицы</Typography.Title>
                    <Input onChange={onChangeInput} placeholder="10"  id={style.orderProductTableFooterInput}/>
                  </>)}
                />
                <OrderProduct keyTab={keyTab} isModalOpen={isModalOpenProduct}  handleOk={handleOkOProduct} handleCancel={handleCancelProduct}/>
            </div>
        </div>
        </ConfigProvider>
    )
}