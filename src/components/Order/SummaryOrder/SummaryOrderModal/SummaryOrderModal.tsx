import { Selector } from "@/components/UI/Select/Selector";
import { useDepartmentStore } from "@/store/DepartmentStore/DepartmentStore";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useParlorStore } from "@/store/ParlorStore/ParlorStore";
import {Button, Checkbox, CheckboxProps, Modal, SelectProps, Typography } from "antd";
import { useEffect, useState } from "react";


interface Props{
  defaultValuesInitiator?:number
  defaultValuesOMS?:boolean
    type?:string
    isModalOpen:any
    handleOk:any
    handleCancel:any
}

export function SummaryOrderModal({isModalOpen, handleOk, handleCancel,type,defaultValuesInitiator,defaultValuesOMS}:Props){

  const employees = useEmployeeStore(state => state.employees)
  const getEmployeeById = useEmployeeStore(state => state.getEmployeeById)
  const getParlorById = useParlorStore(state => state.getParlorById)
  const parlors = useParlorStore(state => state.parlors)
  const getDepartmentById = useDepartmentStore(state => state.getDepartmentById)

  const optionsEmployee = employees.map(item=>({
      value: item.id,
      label: `${item.last_name} ${item.first_name} ${item.middle_name}`,
  })) 

  const [selectEmployee, setEmployee] = useState<number>();

  const optionsParlor = getEmployeeById(selectEmployee as number)?.parlor?.map(item => ({
    value:item.id,
    label:item.parlor_name
  }))
  
  const [selectParlor, setParlour] = useState<number>();

  useEffect(()=>{
    console.log(getEmployeeById(2),getParlorById(1), getDepartmentById(6),parlors)
  },[selectParlor])

  const optionDepartment = [{
    value: getParlorById(selectParlor as number)?.department?.id,
    label: getParlorById(selectParlor as number)?.department?.department_name,

  }]
  const [selectDepartment, setDepartment] = useState<number>();

  const [isOMS, setIsOMS] = useState<boolean>(false)
  const onChangeCheckboxOMS: CheckboxProps['onChange'] = (e) => {
    setIsOMS(e.target.checked)
  };


  useEffect(() => {
    if (defaultValuesInitiator) {
      setEmployee(defaultValuesInitiator);
    }
    if(defaultValuesOMS){
      setIsOMS(defaultValuesOMS)
    }
   
  }, [defaultValuesInitiator, defaultValuesOMS]);

  const onChangeSelectEmployee: SelectProps['onChange'] = (e:any) =>{
    setEmployee(e);
  }
  const onChangeSelectParlour: SelectProps['onChange'] = (e:any) =>{
    setParlour(e);
  }
  const onChangeSelectDepartment: SelectProps['onChange'] = (e:any) =>{
    setDepartment(e);
  }

  const [disabledParlor,setDisabledParlor] = useState<boolean>(true)
  const [disabledDepartment,setDisabledDepartment] = useState<boolean>(true)

  useEffect(()=>{
    if(selectEmployee){
      setDisabledParlor(false)
    }
    if(selectParlor){
      setDisabledDepartment(false)
    }
  },[selectEmployee,selectParlor])
  
  const onOk = () => {
    handleOk(selectEmployee ,selectParlor,selectDepartment,isOMS)
    setEmployee(undefined);
    setParlour(undefined);
    setDepartment(undefined)
  };

  return (
    <>
      
    <Modal title={`${type} заявку`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={() => (
          <>
            <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
            <Button onClick={handleCancel}>Закрыть</Button>
          </>
        )}>
          <div>
          <Checkbox onChange={onChangeCheckboxOMS} defaultChecked={isOMS}>ОМС</Checkbox>
          </div>
        <div>
            <Typography.Title level={5}>Инициатор</Typography.Title>
            <Selector onChange={onChangeSelectEmployee} optionArray={optionsEmployee} placeholder="Выберите инициатора" value={selectEmployee ? selectEmployee : null }/>
        </div>
        <div>
            <Typography.Title level={5}>Кабинет</Typography.Title>
            <Selector onChange={onChangeSelectParlour} optionArray={optionsParlor} placeholder="Выберите кабинет" value={selectParlor ? selectParlor : null} disabled={disabledParlor}/>
        </div>
        <div>
            <Typography.Title level={5}>Подразделение</Typography.Title>
            <Selector onChange={onChangeSelectDepartment} optionArray={optionDepartment} placeholder="Выберите подразделение" value={selectDepartment ? selectDepartment : null} disabled={disabledDepartment}/>
        </div>
      </Modal>
    </>
  );
}