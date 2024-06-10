import { IEmployee } from "@/interface/employee";
import { IOrderItem } from "@/interface/orderItem";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { useTabStore } from "@/store/TabStore/TabStore";
import { Table, Space,Button, TableColumnsType, ConfigProvider, Tooltip } from "antd";
import { useEffect } from "react";
import Order from "../../OrderTab/Order";
import { compareByFullName } from "@/helper/EmployeeSorter";


export function OrderDataTable(){
  const statuses = [
    {text:'Согласован',value:'Согласован'},
    {text:'Отклонен',value:'Отклонен'},
    {text:'В ожидании',value:'В ожидании'}
]
const searchOrders = useOrderStore((state) => state.searchOrders);
const orders = useOrderStore((state) => state.orders);
const deleteOrderInTable = useOrderStore((state) => state.deleteOrderInTable);
const createNewTab = useTabStore(state => state.createNewTab)
const setActiveKey =  useTabStore((state) => state.setActiveKey);


    
const setSearchOrders = useOrderStore((state) => state.setSearchOrders);
useEffect(()=>{
    setSearchOrders(orders)
},[])

const editOrder = (orderId:number,number:string) => {
  const newKey = `editTab-${Date.now()}`; // Уникальный ключ на основе времени
  setActiveKey(newKey)
  createNewTab(`Изменение заявки - ${number}`, <> Изменение заявки - {number} {newKey} <Order keyTab={newKey} type="Изменение" orderId={orderId}/> </>, newKey );
}

    
const columns: TableColumnsType<IOrderItem> = [
        {
          title: '№',
          dataIndex: 'number',
          key: 'number',
          sorter: {
            compare: (a:any, b:any) => a.number - b.number,
            multiple: 4,
          },
          showSorterTooltip: {title:"Сортировка по номеру заявки"},
        },
        
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date',
          sorter: (a:any, b:any) => {
            // Convert date strings to Date objects
            const dateA = new Date(a.date.split('.').reverse()); 
            const dateB = new Date(b.date.split('.').reverse()); 
    
            // Compare Date objects using getTime() to get milliseconds since epoch
            return dateA.getTime() - dateB.getTime();
          },
          showSorterTooltip: {title:"Сортировка по дате"},
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
          sorter: {
            compare: (a:any, b:any) => a.status.localeCompare(b.status, 'ru'),
            multiple: 2,
          },
          filters:statuses,
          filterMode: 'menu',
          filterSearch: true,
          onFilter: (value:string, record:IOrderItem) => record.status.includes(value),
          showSorterTooltip: {title:"Сортировка по статусу"},
        },
        {
          title: 'Инициатор',
          dataIndex: 'initiator',
          key: 'initiator',
          sorter: (a:IOrderItem, b:IOrderItem) => compareByFullName(a.initiator as IEmployee, b.initiator as IEmployee),
          ellipsis: true,
          render: (initiator:IEmployee) => `${initiator?.last_name} ${initiator?.first_name} ${initiator?.middle_name}`,
          showSorterTooltip: {title:"Сортировка по инициатору"},
        },
        {
          title: 'Действия',
          key: 'action',
          render:(_:any, record:IOrderItem) => (
            <Space size="middle">
              <Button type="dashed" onClick={()=>editOrder(record.id, record.number)}>Изменить</Button>
              <Button type="primary" danger onClick={()=>deleteOrderInTable(record.id)}>Удалить</Button>
            </Space>)
        },
    ];

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
          }
        }
      }}> 
    <Table dataSource={searchOrders} columns={columns} />
    </ConfigProvider>
)
}