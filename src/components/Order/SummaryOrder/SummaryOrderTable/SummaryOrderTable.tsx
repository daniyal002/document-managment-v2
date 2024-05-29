import { IOrderItem } from "@/interface/orderItem";
import { Button, Space, Table, TableColumnsType } from "antd"
import ExpandedRow from "./expandedRowRender";
import { SummaryOrderProductModal } from "../SummaryOrderModal/SummaryOrderProductModal";
import { DraggableModal } from "../SummaryOrderDrawer/DraggableModal";
import { useState } from "react";
import { useTabStore } from "@/store/TabStore/TabStore";
import { IProduct } from "@/interface/product";
import { compareByFullName } from "@/helper/EmployeeSorter";
import { IEmployee } from "@/interface/employee";
import { IParlor } from "@/interface/parlor";

interface Props{
    keyTab:string,
}

export function SummaryOrderTable({keyTab}:Props){
    const getTabByKey = useTabStore((state) => state.getTabByKey(keyTab));
    const updateProductInOrder = useTabStore((state) => state.updateProductInOrder);
    const deleteOrderToTab = useTabStore((state) => state.deleteOrderToTab)
    const [orderId,setOrderId] = useState<number>()
    const [productInOrderId,setProductInOrderId] = useState<number>()
    const [defaultValuesCount,setDefaultValuesCount] = useState<number>()
    const [defaultValuesUnit,setDefaultValuesUnit] = useState<string>()
    const [product,setProduct] = useState<IProduct>()

    const columns: TableColumnsType<IOrderItem> = [
        {
          title: 'Номер',
          dataIndex: 'number',
          key: 'number',
        },
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Инициатор',
          dataIndex: 'initiator',
          key: 'initiator',
          sorter: (a:IOrderItem, b:IOrderItem) => compareByFullName(a.initiator as IEmployee, b.initiator as IEmployee),
          ellipsis: true,
          render: (initiator:IEmployee) => `${initiator.last_name} ${initiator.first_name} ${initiator.middle_name}` 
        },
        {
          title: 'Кабинет',
          dataIndex: 'parlor',
          key: 'parlor',
          render: (parlor:IParlor) => parlor?.parlor_name
        },
      
        {
          title: 'Действия',
          key: 'action',
          render: (record:IOrderItem) => (
            <Space size="middle">
              <Button onClick={() => {
                  setOrderId(record.id);
                  showModalDraggableModal()
              }}>Добавить товар</Button>
              <Button onClick={()=>{
                deleteOrderToTab(keyTab,record.id)
              }}>Удалить заявку</Button>
          </Space>
          ),
        },
        
       
      ];

      //DraggableModal
    const [openDraggableModal, setOpenDraggableModal] = useState(false);

    const showModalDraggableModal = () => {
        setOpenDraggableModal(true);
      };
    
      const handleOkDraggableModal = (e: React.MouseEvent<HTMLElement>) => {
        setOpenDraggableModal(false);
      };
    
      const handleCancelDraggableModal = (e: React.MouseEvent<HTMLElement>) => {
        setOpenDraggableModal(false);
      };

      //DraggableModal

      //SummaryOrderModal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
  
      const handleOk = (unitProductTable:string, count:number) => {
        setIsModalOpen(false);
        updateProductInOrder(keyTab,Number(orderId),Number(productInOrderId),unitProductTable,count)
      };
  
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      //SummaryOrderModal
    return(
    <>
        <SummaryOrderProductModal handleCancel={handleCancel} handleOk={handleOk} isModalOpen={isModalOpen} product={product as IProduct} type="Изменение" defaultValuesCount={defaultValuesCount} defaultValuesUnit={defaultValuesUnit}/>
        <DraggableModal open={openDraggableModal} handleOk={handleOkDraggableModal} handleCancel={handleCancelDraggableModal} keyTab={keyTab} orderID={orderId as number} />
        <Table dataSource={getTabByKey?.orders} columns={columns} expandable={{ 
            expandedRowRender: (record:IOrderItem) => <ExpandedRow record={record} keyTab={keyTab} setOrderId={setOrderId}
            setProductInOrderId = {setProductInOrderId}
            setDefaultValuesCount = {setDefaultValuesCount}
            setDefaultValuesUnit = {setDefaultValuesUnit}
            setProduct = {setProduct}
            showModal = {showModal} />,
             defaultExpandedRowKeys: ['0'] }}/>
        </>
    )
}