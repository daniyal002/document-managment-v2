import { Table } from "antd";
import { productOrderTableColumns } from "./ProductOrderTableColumns";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IBasicUnit } from "@/interface/basicUnit";
import { IProductTable } from "@/interface/productTable";
import ModalSelectProductOrder from "../SelectProductOrder/ModalSelectProductOrder/ModalSelectProductOrder";
import { IProductUnit } from "@/interface/product";
import { IEmployeeFromParlorGetMe } from "@/interface/employee";

interface Props {
  selectEmployeeType: string;
  selectEmployeeId: number;
}

export default function ProductOrder({
  selectEmployeeType,
  selectEmployeeId,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productInTable, setProductInTable] = useState<IProductTable>();
  const updateProductInOrder = useOrderStore(
    (state) => state.updateProductInOrder
  );
  const deleteProductInOrder = useOrderStore(
    (state) => state.deleteProductInOrder
  );

  const pathname = usePathname();
  const orderId = pathname.split("/order/");
  const OrderById = useOrderStore((state) =>
    state.getOrderById(Number(orderId[1]))
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (
    unitProductTable: IBasicUnit,
    count: number,
    doctor?: IEmployeeFromParlorGetMe[]
  ) => {
    updateProductInOrder(Number(orderId[1]), productInTable?.id as number, {
      unitProductTable: unitProductTable,
      count: count,
      doctorParlor: doctor,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteProduct = (productId: number) => {
    deleteProductInOrder(Number(orderId[1]), productId);
  };

  const columns = productOrderTableColumns(
    showModal,
    setProductInTable,
    deleteProduct
  );

  return (
    <>
      <ModalSelectProductOrder
        type="Изменить"
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        productTable={productInTable}
        product={productInTable?.product as IProductUnit}
        selectEmployeeId={selectEmployeeId}
        selectEmployeeType={selectEmployeeType}
      />
      <Table columns={columns} dataSource={OrderById?.productOrder} />
    </>
  );
}
