import { Button, Input, Modal, InputProps, Typography } from 'antd'
import style from './HousingModal.module.scss'
import { useEffect, useState } from 'react';


interface Props{
    defaultValuesHousing?:string
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any
  }

export function HousingModal({isModalOpen, handleOk, handleCancel,type,defaultValuesHousing}:Props){
    const [enterHousing, setEnterHousing] = useState<string>("");

    useEffect(() => {
        if (defaultValuesHousing) {
            setEnterHousing(defaultValuesHousing);
        }
    }, [defaultValuesHousing]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        setEnterHousing(e.target.value)
    }

    const onOk = () => {
        handleOk(enterHousing)
        setEnterHousing("")
    };

    return(
        <>
        <Modal title={`${type} корпуса`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Название корпуса</Typography.Title>
                <Input placeholder="Введите название корпуса" type="text" onChange={onChangeInput} value={enterHousing} required/>
            </div>
        </Modal>
        </>
    )
   
}