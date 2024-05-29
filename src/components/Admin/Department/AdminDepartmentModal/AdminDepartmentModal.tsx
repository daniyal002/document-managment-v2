import { Button, Input, Modal, InputProps, Typography, SelectProps } from 'antd'
import style from './AdminDepartmentModal.module.scss'
import { useEffect, useState } from 'react';
import { Selector } from '@/components/UI/Select/Selector';
import { useHousingStore } from '@/store/HousingStore/HousingStore';


interface Props{
    defaultValuesDepartmentName?:string
    defaultValuesHousing?:number
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminDepartmentModal({isModalOpen, handleOk, handleCancel,type,defaultValuesHousing,defaultValuesDepartmentName}:Props){
    const [enterDepartmentName, setEnterDepartmentName] = useState<string>("");
    const [selectHousing, setSelectHousing] = useState<number>()
    const housings = useHousingStore(state => state.housings)

    const options = housings?.map(item=>({
        value: item.id,
        label: item.housing_name,
    })) 

    useEffect(() => {
        if (defaultValuesDepartmentName) {
            setEnterDepartmentName(defaultValuesDepartmentName);
        }
        if(defaultValuesHousing){
            setSelectHousing(defaultValuesHousing)
        }
    }, [defaultValuesDepartmentName,defaultValuesHousing]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        setEnterDepartmentName(e.target.value)
    }

    const onChangeSelect: SelectProps['onChange'] = (e) =>{
        setSelectHousing(Number(e))
    }
    const getHousingById = useHousingStore(state=>state.getHousingById(Number(selectHousing)))

    const onOk = () => {
        handleOk(enterDepartmentName, getHousingById)
        setEnterDepartmentName("")
        setSelectHousing(undefined);
    };

    return(
        <>
        <Modal title={`${type} подразделения`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Название подразделения</Typography.Title>
                <Input placeholder="Введите название подразделения" type="text" onChange={onChangeInput} value={enterDepartmentName} required/>
            </div>
            <div>
                <Typography.Title level={5}>Корпус</Typography.Title>
                <Selector onChange={onChangeSelect} optionArray={options} placeholder="Выберите корпус" value={selectHousing ? selectHousing : null} />
            </div>
        </Modal>
        </>
    )
   
}