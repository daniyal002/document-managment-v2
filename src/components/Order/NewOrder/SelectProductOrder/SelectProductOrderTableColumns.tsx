import { IBasicUnit } from "@/interface/basicUnit";
import { IProductGroup, IProductUnit } from "@/interface/product";
import { Button, Space, TableColumnsType } from "antd";

export const SelectProductOrderTableColumns = (
  showModal: () => void,
  setSelectProduct: (product: IProductUnit) => void
): TableColumnsType => [
  {
    title: "Товар",
    dataIndex: "product_name",
    key: "product_name",
    sorter: {
      compare: (a: any, b: any) =>
        a.product_name.localeCompare(b.product_name, "ru"),
    },
  },
  {
    title: "Группа товаров",
    dataIndex: "product_group",
    key: "product_group",
    sorter: {
      compare: (a: any, b: any) =>
        a.product_group.localeCompare(b.product_group, "ru"),
    },
    render: (product_group: IProductGroup) => product_group.name,
    responsive: ["sm"],
  },
  {
    title: "Ед. измерения",
    dataIndex: "unit_measurement",
    key: "unit_measurement",
    sorter: {
      compare: (a: any, b: any) =>
        a.unit_measurement.localeCompare(b.unit_measurement, "ru"),
    },
    render: (unit_measurement: IBasicUnit) => unit_measurement.name,
    responsive: ["sm"],
  },
  {
    title: "Действия",
    key: "action",
    render: (record: IProductUnit) => (
      <Space size="middle">
        <div>
          <Button
            onClick={() => {
              showModal();
              setSelectProduct(record);
            }}
          >
            Добавить
          </Button>
        </div>
      </Space>
    ),
  },
];
