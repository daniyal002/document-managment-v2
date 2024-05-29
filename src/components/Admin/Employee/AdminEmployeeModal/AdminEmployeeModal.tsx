import { Button, Input, Modal, InputProps, Typography, SelectProps } from 'antd'
import style from './AdminEmployeeModal.module.scss'
import { useEffect, useState } from 'react';
import { Selector } from '@/components/UI/Select/Selector';
import { IEmployeeFullName } from '@/interface/employee';
import { useParlorStore } from '@/store/ParlorStore/ParlorStore';
import { usePostStore } from '@/store/PostStore/PostStore';
import { IParlor } from '@/interface/parlor';
import { IPost } from '@/interface/post';


interface Props{
    defaultValuesFullName?:IEmployeeFullName
    defaultValuesParlor?:IParlor[]
    defaultValuesPost?:IPost
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminEmployeeModal({isModalOpen, handleOk, handleCancel,type,defaultValuesFullName,defaultValuesParlor,defaultValuesPost}:Props){
    const [enterFullName, setEnterFullName] = useState<IEmployeeFullName>();
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

    useEffect(() => {
        if (defaultValuesFullName) {
            setEnterFullName(defaultValuesFullName);
        }
        if(defaultValuesParlor){
                setSelectParlor(defaultValuesParlor)
                selectParlor?.forEach(item => {console.log(item?.id)})
        }
        if(defaultValuesPost){
                setSelectPost(defaultValuesPost)
        }
    }, [defaultValuesFullName,defaultValuesParlor,defaultValuesPost]);

    const onChangeInput: InputProps['onChange'] = (e) => {
        const { name, value } = e.target;
        setEnterFullName((prevFullName) => ({
          ...prevFullName,
          [name]: value, // Обновление нужного поля
        } as IEmployeeFullName ));
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
    


    const onOk = () => {
        handleOk(enterFullName, selectParlor,selectPost)
        setEnterFullName({firstName:"",lastName:"",middleName:""})
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
                <Typography.Title level={5}>Фамилия</Typography.Title>
                <Input placeholder="Введите фамилию" type="text"  onChange={onChangeInput}  value={enterFullName?.lastName} name="lastName" required/>
            </div>
            <div>
                <Typography.Title level={5}>Имя</Typography.Title>
                <Input placeholder="Введите имя" type="text" onChange={onChangeInput} value={enterFullName?.firstName} name="firstName" required/>
            </div>
            <div>
                <Typography.Title level={5}>Отчество</Typography.Title>
                <Input placeholder="Введите отчество" type="text" onChange={onChangeInput} value={enterFullName?.middleName} name="middleName" required/>
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