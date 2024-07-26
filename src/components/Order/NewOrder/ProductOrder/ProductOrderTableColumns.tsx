import { IBasicUnit } from "@/interface/basicUnit";
import { IProduct } from "@/interface/product";
import { IProductTable } from "@/interface/productTable";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { Button, Space, TableColumnsType } from "antd";

export const productOrderTableColumns = (
  showModal: () => void,
  setSelectProduct: (product: IProductTable) => void,
  deleteProduct: (productId: number) => void
): TableColumnsType => [
  {
    title: "Товар",
    dataIndex: "product",
    key: "product",
    sorter: {
      compare: (a: any, b: any) =>
        a.product.product_name.localeCompare(b.product.product_name, "ru"),
    },
    render: (product: IProduct) => product.product_name,
  },

  {
    title: "Ед. измерения",
    dataIndex: "unitProductTable",
    key: "unitProductTable",
    sorter: {
      compare: (a: any, b: any) =>
        a.unitProductTable.name.localeCompare(b.unitProductTable.name, "ru"),
    },
    render: (unit: IBasicUnit) => unit?.name,
    responsive: ["sm"],
  },
  {
    title: "Количество",
    dataIndex: "count",
    key: "count",
    sorter: {
      compare: (a: any, b: any) => a.count - b.count,
    },
    responsive: ["sm"],
  },
  {
    title: "Действия",
    key: "action",
    render: (record: IProductTable) => (
      <Space size="middle">
        <div>
          <Button
            onClick={() => {
              setSelectProduct(record);
              showModal();
            }}
          >
            Изменить
          </Button>
          <Button
            onClick={() => {
              deleteProduct(record.id as number);
            }}
          >
            Удалить
          </Button>
        </div>
      </Space>
    ),
  },
];
