import { Button, Input, Modal, InputProps, Typography } from 'antd'
import style from './AdminRoleModal.module.scss'
import { useEffect, useState } from 'react';


interface Props{
    defaultValuesRole?:string
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminRoleModal({isModalOpen, handleOk, handleCancel,type,defaultValuesRole}:Props){
    const [enterRole, setEnterRole] = useState<string>("");

    useEffect(() => {
        if (defaultValuesRole) {
            setEnterRole(defaultValuesRole);
        }
    }, [defaultValuesRole]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        setEnterRole(e.target.value)
    }

    const onOk = () => {
        handleOk(enterRole)
        setEnterRole("")
    };

    return(
        <>
        <Modal title={`${type} роли`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Роль</Typography.Title>
                <Input placeholder="Введите название роли" type="text" onChange={onChangeInput} value={enterRole} required/>
            </div>
        </Modal>
        </>
    )
   
}