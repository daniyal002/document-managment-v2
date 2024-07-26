"use client";

import { Button } from "antd";
import HeaderOrder from "./HeaderOrder/HeaderOrder";
import ProductOrder from "./ProductOrder/ProductOrder";
import SelectProductOrder from "./SelectProductOrder/SelectProductOrder";
import style from "./NewOrder.module.scss";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hook/User/userHook";
import { useUserStore } from "@/store/UserStore/UserStore";
import { IGetMe } from "@/interface/user";
import { useCreateOrderMutation } from "@/hook/Order/orderHook";
import { IOrderItemRequest } from "@/interface/orderItem";
import { useOrderStore } from "@/store/OrderStore/orderStore";
import { IProductTable } from "@/interface/productTable";

interface Props {
  id: string;
}

export default function NewOrder({ id }: Props) {
  const { GetMeData } = useGetMe();
  const [selectEmployeeId, setSelectEmployeeId] = useState<number>();
  const [selectEmployeeType, setSelectEmployeeType] = useState<string>();
  const [selectDepartment, setSelectDepartment] = useState<number>();
  const [checkOms, setChekOms] = useState<boolean>();
  const orderById = useOrderStore((state) => state.getOrderById(Number(id)));
  const setGetMe = useUserStore((state) => state.setGetMe);

  const { mutate: createOrderMutation } = useCreateOrderMutation();

  const createNewOrder = () => {
    const newOrder: IOrderItemRequest = {
      employee_id: selectEmployeeId as number,
      department_id: selectDepartment as number,
      oms: checkOms as boolean,
      order_route_id: 1,
      order_status_id: 1,
      note: "Новая заявка",
      products:
        orderById?.productOrder?.map((product) => ({
          product_id: product.product.product_id,
          product_quantity: product.count,
          unit_measurement_id: product.unitProductTable.id as number,
          employee_ids: product.doctorParlor?.map(
            (doc) => doc.id as number
          ) as number[],
        })) || [],
      user_id: 1,
    };
    createOrderMutation(newOrder);
  };

  useEffect(() => {
    if (GetMeData) {
      setGetMe(GetMeData as IGetMe);
    }
  }, [GetMeData, setGetMe]);

  const [toggle, setToggle] = useState(false);
  const changeToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className={style.newOrder}>
      <h1>Заявка {id}</h1>
      <HeaderOrder
        selectDepartment={selectDepartment as number}
        selectEmployee={selectEmployeeId as number}
        setSelectDepartment={setSelectDepartment}
        setSelectEmployee={setSelectEmployeeId}
        setSelectEmployeeType={setSelectEmployeeType}
        setChekOms={setChekOms}
      />
      <Button onClick={changeToggle}>
        {toggle ? "Список выбранных товаров" : "Подбор товара"}
      </Button>

      <div
        className={
          toggle
            ? style.selectProductOrder + style.active
            : style.selectProductOrder
        }
      >
        <SelectProductOrder
          selectEmployeeType={selectEmployeeType as string}
          selectEmployeeId={selectEmployeeId as number}
        />
      </div>

      <div
        className={
          !toggle ? style.productOrder + style.active : style.productOrder
        }
      >
        <ProductOrder
          selectEmployeeType={selectEmployeeType as string}
          selectEmployeeId={selectEmployeeId as number}
        />
        <Button onClick={() => createNewOrder()}>Создать</Button>
      </div>
    </div>
  );
}
