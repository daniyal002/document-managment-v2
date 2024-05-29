import { Button, Drawer, Space, Table } from 'antd';
import { IOrderItem } from '@/interface/orderItem';
import style from './Drawer.module.scss'

interface Props{
    order:IOrderItem
    onClose:any,
    open:boolean,
}

export function DrawerDetail({order,onClose,open}:Props){

    const columns = [
        {
          title: 'Товар',
          dataIndex: 'product',
          key: 'product',
          sorter: {
            compare: (a:any, b:any) => a.product.name.localeCompare(b.product.name, 'ru'),
          },
          render: (product:any) => product.name,

        },
        {
            title: 'Ед. измерения',
            dataIndex: 'unitProductTable',
            key: 'unitProductTable',
            sorter: {
              compare: (a:any, b:any) => a.unitProductTable.localeCompare(b.unitProductTable, 'ru'),
            },
          },
          {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
            sorter: {
              compare: (a:any, b:any) => a.count - b.count,
            },
          },
    ];

if(!order) return null;

  return (
    <>
      <Drawer
        title={`Подробно о заявке: ${order.number}`}
        placement={'bottom'}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Закрыть</Button>
          </Space>
        }
      >
        <div className={style.drawerDetailHeader}>
        <p><span>Кабинет: </span>{order.parlor?.parlor_name}</p>
        <p><span>Инициатор: </span>{`${order.initiator?.lastName} ${order.initiator?.firstName} ${order.initiator?.middleName}`}</p>
        </div>
        <Table dataSource={order.productOrder} columns={columns} pagination={{ pageSize: 20}}/>
      </Drawer>
    </>
  );
};
