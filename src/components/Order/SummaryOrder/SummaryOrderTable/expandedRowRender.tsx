import { IOrderItem } from "@/interface/orderItem"
import { IProduct } from "@/interface/product"
import { IProductTable } from "@/interface/productTable"
import { useTabStore } from "@/store/TabStore/TabStore"
import { Button, Space, Table, TableColumnsType } from "antd"


interface Props {
    record: IOrderItem;
    keyTab: string;
    setOrderId:any,
    setProductInOrderId:any,
    setDefaultValuesCount:any,
    setDefaultValuesUnit:any,
    setProduct:any
    showModal:any
  }


export default function ExpandedRow({ 
    record, 
    keyTab,
    setOrderId,
    setProductInOrderId,
    setDefaultValuesCount,
    setDefaultValuesUnit,
    setProduct,
    showModal}: Props) {


    const deleteProductFromOrder = useTabStore((state) => state.deleteProductFromOrder);
    

    const columns:TableColumnsType<IProductTable> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'product',
            key: 'product',
            render: (product: IProduct) => product.name 
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count', 
        },
        {
            title: 'Единица',
            dataIndex: 'unitProductTable',
            key: 'unitProductTable',
        },
        {
            title: 'Действия',
            key: 'action',
            render: (product:IProductTable) => (
              <Space size="middle">
                <Button onClick={() => {
                    setOrderId(record.id)
                    setProductInOrderId(product.id)
                    setDefaultValuesCount(product.count)
                    setDefaultValuesUnit(product.unitProductTable)
                    setProduct(product.product)
                    showModal();
                }}>Изменить</Button>
                <Button onClick={() => {
                    deleteProductFromOrder(keyTab, record.id, product.id as number)
                }}>Удалить</Button>
            </Space>
            ),
          },
    ]

    return <Table columns={columns} dataSource={record.productOrder} pagination={false} />;
}
