import { Selector } from "@/components/UI/Select/Selector";
import { IProductUnit } from "@/interface/product";
import { IProductTable } from "@/interface/productTable";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useUserStore } from "@/store/UserStore/UserStore";
import {
  Button,
  Input,
  InputProps,
  Modal,
  SelectProps,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

interface Props {
  type: "Добавить" | "Изменить";
  isModalOpen: any;
  handleCancel: any;
  handleOk: any;
  product: IProductUnit;
  productTable?: IProductTable;
  selectEmployeeType: string;
  selectEmployeeId: number;
}

export default function ModalSelectProductOrder({
  isModalOpen,
  handleCancel,
  handleOk,
  type,
  product,
  productTable,
  selectEmployeeType,
  selectEmployeeId,
}: Props) {
  const [selectUnit, setSelectUnit] = useState<number>();
  const [enterCount, setEnterCount] = useState<number>(1);
  const [selectDoctors, setSelectDoctors] = useState<number[]>();
  const [multiplayCoefficient, setMultiplayCoefficient] = useState<number>();
  const getMe = useUserStore((state) => state.getMe);
  const employees =
    getMe?.employee?.parlor
      ?.filter((parlor) =>
        parlor.employees.some((employee) => employee.id === selectEmployeeId)
      )
      ?.flatMap((parlor) => parlor.employees) || [];

  useEffect(() => {
    if (productTable) {
      setEnterCount(productTable.count);
      setSelectUnit(productTable.unitProductTable.id);
      setSelectDoctors(
        productTable.doctorParlor?.map((doctor) => doctor.id as number)
      );
    }
  }, [productTable]);

  useEffect(() => {
    const unit = product?.directory_unit_measurement?.find(
      (item) => item.unit_measurement.id === selectUnit
    );
    setMultiplayCoefficient(Number(unit?.coefficient) * enterCount);
  }, [selectUnit, enterCount]);

  const multiplayUnitmeasurement = product?.unit_measurement?.name;

  const optionsUnit = product?.directory_unit_measurement?.map((item) => ({
    value: item?.unit_measurement?.id,
    label: `${item?.unit_measurement?.name}(${item.coefficient} ${multiplayUnitmeasurement})`,
  }));

  const onChangeSelectUnit: SelectProps["onChange"] = (e) => {
    setSelectUnit(e);
  };

  const optionsEmployees = employees
    ?.filter((employee) => employee.type === "employee")
    .map((employee) => ({
      value: employee.id,
      label: employee.name,
    }));

  const onChangeSelectDoctors = (value: number[]) => {
    setSelectDoctors(value);
  };

  const onChangeInput: InputProps["onChange"] = (e) => {
    if (Number(e.target.value) <= 0) {
      setEnterCount(1);
    } else {
      setEnterCount(Number(e.target.value));
    }
  };
  const onCancel = () => {
    setSelectUnit(undefined);
    setEnterCount(1);
    setSelectDoctors([]);
    handleCancel();
  };
  const onOk = () => {
    const isSelectUnit = selectUnit ? selectUnit : optionsUnit[0]?.value;
    const unit = product?.directory_unit_measurement.find(
      (item) => item.unit_measurement.id === isSelectUnit
    );
    const doctors = employees.filter((employee) =>
      selectDoctors?.includes(employee.id as number)
    );
    handleOk(unit?.unit_measurement, enterCount, doctors);
    setSelectUnit(undefined);
    setEnterCount(1);
    setSelectDoctors([]);
    handleCancel();
  };
  return (
    <Modal
      title={`Выбор товара ${product?.product_name}`}
      open={isModalOpen}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      footer={(_) => (
        <>
          <Button onClick={() => onOk()}>{type}</Button>
          <Button onClick={() => onCancel()}>Закрыть</Button>
        </>
      )}
    >
      <div>
        <Typography.Title level={5}>Количество</Typography.Title>
        <Input
          placeholder="Введите количество"
          type="number"
          onChange={onChangeInput}
          value={String(enterCount)}
          required
          min="1"
        />
      </div>

      <div>
        <Typography.Title level={5}>Единица измерения</Typography.Title>
        <Selector
          onChange={onChangeSelectUnit}
          optionArray={optionsUnit}
          placeholder="Выберите единицу измерения"
          value={selectUnit ? selectUnit : null}
        />
      </div>
      <div>
        <Typography>
          Количество в основной единице измерения:{" "}
          {`${
            multiplayCoefficient ? multiplayCoefficient : 1
          } ${multiplayUnitmeasurement}`}{" "}
        </Typography>
      </div>
      {selectEmployeeType !== "employee" && (
        <div>
          <Selector
            mode="multiple"
            onChange={onChangeSelectDoctors}
            optionArray={optionsEmployees}
            placeholder="Выберите врача"
            value={selectDoctors ? selectDoctors : null}
          />
        </div>
      )}
    </Modal>
  );
}
