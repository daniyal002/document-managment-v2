import { Button, Input, Modal, InputProps, Typography, SelectProps } from 'antd'
import style from './AdminParlorModal.module.scss'
import { useEffect, useState } from 'react';
import { Selector } from '@/components/UI/Select/Selector';
import { useDepartmentStore } from '@/store/DepartmentStore/DepartmentStore';
import { useFloorStore } from '@/store/FloorStore/FloorStore';


interface Props{
    defaultValuesParlor?:string
    defaultValuesDepartment?:number
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminParlorModal({isModalOpen, handleOk, handleCancel,type,defaultValuesParlor,defaultValuesDepartment}:Props){
    const [enterParlorName, setEnterParlorName] = useState<string>("");
    const [selectDepartment, setSelectDepartment] = useState<number>()
    const [selectFloor, setSelectFloor] = useState<number>(1)

    const departments = useDepartmentStore(state=>state.departments)
    const optionsDepartments = departments.map(item=>({
        value: item.id,
        label: item.department_name,
    }))

    const floors = useFloorStore(state=>state.floors)
    const optionsFloors = floors?.map(item=>({
        value: item.id,
        label: item.floor_name,
    })) 

    useEffect(() => {
        if (defaultValuesParlor) {
            setEnterParlorName(defaultValuesParlor);
        }
        if(defaultValuesDepartment){
            setSelectDepartment(defaultValuesDepartment)
        }
    }, [defaultValuesParlor,defaultValuesDepartment]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        setEnterParlorName(e.target.value)
    }

    const onChangeSelectDepartment: SelectProps['onChange'] = (e) =>{
        setSelectDepartment(Number(e))
    }

    const onChangeSelectFloor: SelectProps['onChange'] = (e) =>{
        setSelectFloor(Number(e))
    }

    const getDepartmentById = useDepartmentStore(state=>state.getDepartmentById(Number(selectDepartment)))
    const getFloorById = useFloorStore(state=>state.getFloorById(Number(selectFloor)))


    const onOk = () => {
        handleOk(enterParlorName, getDepartmentById,getFloorById)
        setEnterParlorName("")
        setSelectDepartment(undefined);
    };

    return(
        <>
        <Modal title={`${type} кабинета`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Номер кабинета</Typography.Title>
                <Input placeholder="Введите название кабинета" type="text" onChange={onChangeInput} value={enterParlorName} required/>
            </div>
            <div>
                <Typography.Title level={5}>Подразделение</Typography.Title>
                <Selector onChange={onChangeSelectDepartment} optionArray={optionsDepartments} placeholder="Выберите корпус" value={selectDepartment ? selectDepartment : null} />
            </div>
            <div>
                <Typography.Title level={5}>Этаж</Typography.Title>
                <Selector onChange={onChangeSelectFloor} optionArray={optionsFloors} placeholder="Выберите этаж" value={Number(selectFloor)} />
            </div>
        </Modal>
        </>
    )
   
}