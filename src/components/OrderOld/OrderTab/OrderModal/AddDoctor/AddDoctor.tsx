import { Selector } from "@/components/UI/Select/Selector";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { useParlorStore } from "@/store/ParlorStore/ParlorStore";
import { SelectProps } from "antd";
import { useEffect, useState } from "react";
import style from './AddDoctor.module.scss'
import { IDoctorParlor } from "@/interface/employee";

interface Props{
    doctorParlor:IDoctorParlor[]
    setDoctorParlor:any
}

export function AddDoctor({doctorParlor,setDoctorParlor}:Props){
    const [selectEmployee, setSelectEmployee] = useState<number>()
    const [selectParlor, setSelectParlor] = useState<number>()

    useEffect(()=>{
        if(selectEmployee !== undefined && selectParlor !== undefined)
        setDoctorParlor([...doctorParlor,{employee_id:selectEmployee,parlor_id:selectParlor}])
    },[selectEmployee,selectParlor])

    //Employee
    const onChangeSelectEmployee: SelectProps['onChange'] = (e) =>{
        setSelectEmployee(e)
      }
    const employees = useEmployeeStore(state => state.employees)

    const optionsEmployee = employees.map(item=>({
        value: item.id,
        label: `${item.last_name} ${item.first_name} ${item.middle_name}`
    })) 


    //Parlor
    const onChangeSelectParlor: SelectProps['onChange'] = (e) =>{
        setSelectParlor(e)
      }
    const parlors = useParlorStore(state => state.parlors)

    const optionsParlor = parlors.map(item=>({
        value: item.id,
        label: item.parlor_name
    })) 

    return(
        <div className={style.addDoctor}>
            <Selector onChange={onChangeSelectEmployee} optionArray={optionsEmployee} placeholder="Врач"/>
            <Selector onChange={onChangeSelectParlor} optionArray={optionsParlor} placeholder="Кабинет"/>
        </div>
    )
}