import { Checkbox, CheckboxProps, SelectProps } from "antd";
import style from "./OrderHeader.module.scss"
import { Selector } from "@/components/UI/Select/Selector";
import { useDepartmentStore } from "@/store/DepartmentStore/DepartmentStore";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useEffect, useState } from "react";
import { IOrderItem } from "@/interface/orderItem";

interface Props{
    setOrderHeader:any
    getOrderById?:IOrderItem
}

export function OrderHeader({setOrderHeader,getOrderById}:Props){

    
    const [checkBox, setCheckBox] = useState<boolean>(false)
    const [selectDepartment, setSelectDepartment] = useState<number>()
    const [selectEmployee, setSelectEmployee] = useState<number>()

    const getDepartmentById = useDepartmentStore(state => state.getDepartmentById(Number(selectDepartment)))
    const getEmployeeById = useEmployeeStore(state => state.getEmployeeById(Number(selectEmployee)))

    useEffect(()=>{
        setCheckBox(getOrderById? getOrderById?.OMS:false)
        setSelectDepartment(getOrderById?.department?.id)
        setSelectEmployee(getOrderById?.initiator?.id)

    },[getOrderById])

    // checkBox onChange
    const onChangeCheckBox: CheckboxProps['onChange'] = (e) => {
        setCheckBox(e.target.checked)
      };

    // Select department
    const onChangeSelectDepartment: SelectProps['onChange'] = (e) =>{
        setSelectDepartment(e)
      }
    const departments = useDepartmentStore(state => state.departments)

    const optionsDepartments = departments.map(item=>({
        value: item.id,
        label: item.department_name
    })) 

    // Select employee
    const onChangeSelectEmployee: SelectProps['onChange'] = (e) =>{
        setSelectEmployee(e)
      }
    const employees = useEmployeeStore(state => state.employees)

    const optionsEmployee = employees.map(item=>({
        value: item.id,
        label: `${item.last_name} ${item.first_name} ${item.middle_name}`
    })) 

    useEffect(()=>{
        setOrderHeader({OMS:checkBox,initiator:getEmployeeById,department:getDepartmentById})
    },[checkBox, selectDepartment, selectEmployee])

    return(
        <div className={style.orderHeader}>
            <Checkbox onChange={onChangeCheckBox} defaultChecked={getOrderById? getOrderById?.OMS:false} >ОМС</Checkbox>
            <Selector onChange={onChangeSelectDepartment} optionArray={optionsDepartments} placeholder="Подразделение" value={selectDepartment}/>
            <Selector onChange={onChangeSelectEmployee} optionArray={optionsEmployee} placeholder="Инициатор" value={selectEmployee} />
        </div>
    )
}