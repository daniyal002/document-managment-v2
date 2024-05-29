import { Button, Input, Modal, InputProps, Typography } from 'antd'
import { useEffect, useState } from 'react';
import style from './AdminPostModal.module.scss'


interface Props{
    defaultValuesPost?:string
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminPostModal({isModalOpen, handleOk, handleCancel,type,defaultValuesPost}:Props){
    const [enterPost, setEnterPost] = useState<string>("");

    useEffect(() => {
        if (defaultValuesPost) {
            setEnterPost(defaultValuesPost);
        }
    }, [defaultValuesPost]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        setEnterPost(e.target.value)
    }

    const onOk = () => {
        handleOk(enterPost)
        setEnterPost("")
    };

    return(
        <>
        <Modal title={`${type} должности`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Название должности</Typography.Title>
                <Input placeholder="Введите название должности" type="text" onChange={onChangeInput} value={enterPost} required/>
            </div>
        </Modal>
        </>
    )
   
}