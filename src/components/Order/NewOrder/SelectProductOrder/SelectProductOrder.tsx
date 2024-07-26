import { Table } from "antd";
import { SelectProductOrderTableColumns } from "./SelectProductOrderTableColumns";
import { useState } from "react";
import { IBasicUnit } from "@/interface/basicUnit";
import ModalSelectProductOrder from "./ModalSelectProductOrder/ModalSelectProductOrder";
import { IProductUnit } from "@/interface/product";
import { useProductData } from "@/hook/Product/productHook";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { IProductTable } from "@/interface/productTable";
import { usePathname } from "next/navigation";
import { getId } from "@/helper/generatorId";
import { IEmployeeFromParlorGetMe } from "@/interface/employee";

interface Props {
  selectEmployeeType: string;
  selectEmployeeId: number;
}

export default function SelectProductOrder({
  selectEmployeeType,
  selectEmployeeId,
}: Props) {
  const { productData } = useProductData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState<IProductUnit>();
  const pathname = usePathname();
  const orderId = pathname.split("/order/");
  const setProductInOrder = useOrderStore((state) => state.setProductInOrder);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (
    unitProductTable: IBasicUnit,
    count: number,
    doctors?: IEmployeeFromParlorGetMe[]
  ) => {
    const product: IProductTable = {
      id: getId(),
      product: selectProduct as IProductUnit,
      unitProductTable: unitProductTable,
      count: count,
      doctorParlor: doctors,
    };
    setProductInOrder(Number(orderId[1]), product);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = SelectProductOrderTableColumns(showModal, setSelectProduct);

  return (
    <>
      <ModalSelectProductOrder
        type="Добавить"
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        product={selectProduct as IProductUnit}
        selectEmployeeType={selectEmployeeType}
        selectEmployeeId={selectEmployeeId}
      />
      <Table columns={columns} dataSource={productData} />
    </>
  );
}
