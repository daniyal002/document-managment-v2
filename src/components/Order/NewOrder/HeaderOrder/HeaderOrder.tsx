import { Selector } from "@/components/UI/Select/Selector";
import { Checkbox, CheckboxProps, SelectProps } from "antd";
import style from "./HeaderOrder.module.scss";
import { useEffect } from "react";
import { useUserStore } from "@/store/UserStore/UserStore";

interface Props {
  selectEmployee: number;
  setSelectEmployee: any;
  selectDepartment: number;
  setSelectDepartment: any;
  setSelectEmployeeType: any;
  setChekOms:any
}

export default function HeaderOrder({
  selectDepartment,
  selectEmployee,
  setSelectDepartment,
  setSelectEmployee,
  setSelectEmployeeType,
  setChekOms
}: Props) {
  const getMe = useUserStore((state) => state.getMe);

  useEffect(() => {
    getMe?.employee?.parlor?.forEach((parlor) => {
      let employee = parlor.employees.find(
        (employee) => employee.id === selectEmployee
      );
      if (employee) {
        setSelectEmployeeType(employee?.type);
      }
    }, setSelectDepartment(""));
  }, [selectEmployee]);

  const employeeSet = new Set();
  const optionsEmployee =
    getMe?.employee?.parlor?.flatMap((parlor) =>
      parlor.employees
        .filter((employee) => {
          if (employeeSet.has(employee.id)) {
            return false;
          } else {
            employeeSet.add(employee.id);
            return true;
          }
        })
        .map((employee) => ({
          value: employee.id,
          label: employee.name,
        }))
    ) || [];

  const onChangeSelectEmployee: SelectProps["onChange"] = (e: string) => {
    setSelectEmployee(e);
  };

  const departmentSet = new Set();

  const optionsDepartment = getMe?.employee?.parlor
    ?.flatMap((parlor) =>
      parlor.employees.some((employee) => employee.id === selectEmployee)
        ? [parlor]
        : []
    )
    .filter((parlor) => {
      if (departmentSet.has(parlor.department?.id)) {
        return false;
      } else {
        departmentSet.add(parlor.department?.id);
        return true;
      }
    })
    .map((parlor) => ({
      value: parlor.department?.id,
      label: parlor.department?.department_name,
    }));

  const onChangeSelectDepartment: SelectProps["onChange"] = (e) => {
    setSelectDepartment(e);
  };

  const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    setChekOms(e.target.checked)
  };

  return (
    <div className={style.headerOrder}>
      <div className={style.headerOrderOMS}>
        <label>ОМС</label>
        <Checkbox onChange={onChangeCheckbox}/>
      </div>
      <Selector
        placeholder="Сотрудник или кабинет"
        optionArray={optionsEmployee}
        onChange={onChangeSelectEmployee}
        value={selectEmployee ? selectEmployee : null}
      />
      <Selector
        placeholder="Подразделение"
        optionArray={optionsDepartment}
        onChange={onChangeSelectDepartment}
        value={selectDepartment ? selectDepartment : null}
      />
    </div>
  );
}
