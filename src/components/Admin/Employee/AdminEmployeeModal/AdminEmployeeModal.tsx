import { Button, Input, Modal, InputProps, Typography, SelectProps } from 'antd'
import style from './AdminEmployeeModal.module.scss'
import { useEffect, useState } from 'react';
import { Selector } from '@/components/UI/Select/Selector';
import { useParlorStore } from '@/store/ParlorStore/ParlorStore';
import { usePostStore } from '@/store/PostStore/PostStore';
import { IParlor } from '@/interface/parlor';
import { IPost } from '@/interface/post';


interface Props{
    defaultValuesBuyerName?:string
    defaultValuesBuyerType?:string
    defaultValuesParlor?:IParlor[]
    defaultValuesPost?:IPost
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminEmployeeModal({isModalOpen, handleOk, handleCancel,type,defaultValuesBuyerType,defaultValuesParlor,defaultValuesPost,defaultValuesBuyerName}:Props){
    const [enterBuyerName, setEnterBuyerName] = useState<string>();
    const [selectBuyerType, setSelectBuyerType] = useState<string>();
    const [selectParlor, setSelectParlor] = useState<IParlor[] | null>()
    const [selectPost, setSelectPost] = useState<IPost | null>()

    const parlors = useParlorStore(state=>state.parlors)
    const optionsParlors:SelectProps['options'] = parlors.map(item=>({
        value: item.id,
        label: item.parlor_name,
    })) 

    const posts = usePostStore(state=>state.posts)
    const optionsPosts:SelectProps['options'] = posts.map(item=>({
        value: item.id,
        label: item.post_name,
    })) 

    const optionsBuyerType:SelectProps['options'] = [
        {
            value: "parlor",
            label: "Кабинет"
        },
        {
            value: "employee",
            label: "Сотрудник"
        },
        
    ]

    useEffect(() => {
        if (defaultValuesBuyerName) {
            setEnterBuyerName(defaultValuesBuyerName);
        }
        if (defaultValuesBuyerType) {
            setSelectBuyerType(defaultValuesBuyerType);
        }
        if(defaultValuesParlor){
                setSelectParlor(defaultValuesParlor)
                selectParlor?.forEach(item => {console.log(item?.id)})
        }
        if(defaultValuesPost){
                setSelectPost(defaultValuesPost)
        }
    }, [defaultValuesBuyerType,defaultValuesBuyerName,defaultValuesParlor,defaultValuesPost]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        const { name, value } = e.target;
        setEnterBuyerName(value)
      };
      const getParlorById = useParlorStore(state => state.getParlorById)
      const getPostById = usePostStore(state => state.getPostById)


    const onChangeSelectParlor = (value: number[]) =>{
        const arrayParlor:IParlor[] = []
        value.forEach(item => {
            arrayParlor.push(getParlorById(item) as IParlor)
        })
        setSelectParlor(arrayParlor)
    }

    const onChangeSelectPost = (value: number) =>{
        setSelectPost(getPostById(value))
    }

    const onChangeSelectBuyerType = (value: string) =>{
        setSelectBuyerType(value)
    }
    


    const onOk = () => {
        handleOk(enterBuyerName,selectBuyerType, selectParlor,selectPost)
        setEnterBuyerName('')
        setSelectBuyerType(undefined)
        setSelectParlor(undefined);
        setSelectPost(undefined)
    };

    return(
        <>
        <Modal title={`${type} сотрудника`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
                <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
             <div>
                <Typography.Title level={5}>Наименование</Typography.Title>
                <Input placeholder="Наименование" type="text"  onChange={onChangeInput}  value={enterBuyerName} name="lastName" required/>
            </div>
            <div>
                <Typography.Title level={5}>Вид</Typography.Title>
                <Selector onChange={onChangeSelectBuyerType} optionArray={optionsBuyerType} placeholder="Выберите вид" value={selectBuyerType ? selectBuyerType : null} defaultValue={selectBuyerType ? selectBuyerType : null}/>
            </div>
            <div>
                <Typography.Title level={5}>Кабинет</Typography.Title>
                <Selector onChange={onChangeSelectParlor} optionArray={optionsParlors} placeholder="Выберите кабинет" value={selectParlor ? selectParlor.map(item => item.id) : null} defaultValue={selectParlor ? selectParlor.map(item => item.id) : null} mode='multiple'/>
            </div>
            <div>
                <Typography.Title level={5}>Должность</Typography.Title>
                <Selector onChange={onChangeSelectPost} optionArray={optionsPosts} placeholder="Выберите должность" value={selectPost ? selectPost.id : null} />
            </div>
        </Modal>
        </>
    )
   
}