import { Button, Input, Modal, InputProps, Typography, SelectProps, Form, message, Space } from 'antd'
import style from './AdminUserModal.module.scss'
import { useEffect, useState } from 'react';
import { Selector } from '@/components/UI/Select/Selector';
import { useEmployeeStore } from '@/store/EmployeeStore/EmployeeStore';
import { useRoleStore } from '@/store/RoleStore/RoleStore';
import { useDepartmentStore } from '@/store/DepartmentStore/DepartmentStore';


interface Props{
    defaultValuesLogin?:string
    defaultValuesPassword?:string
    defaultValuesEmployee?:number
    defaultValuesRole?:number
    type?:"Создание" | "Изменение"
    isModalOpen:any
    handleOk:any
    handleCancel:any

  }

export function AdminUserModal({isModalOpen, handleOk, handleCancel,type,defaultValuesLogin,defaultValuesPassword,defaultValuesEmployee,defaultValuesRole}:Props){
    const [enterLogin, setEnterLogin] = useState<string>();
    const [enterPassword, setEnterPassword] = useState<string>();

    const [selectEmployee, setSelectEmployee] = useState<number>()
    const [selectRole, setSelectRole] = useState<number>()

    const getDepartmentById = useDepartmentStore(state => state.getDepartmentById)


    const employees = useEmployeeStore(state=>state.employees)
    const optionsEmployees = employees.map(item=>({
        value: item.id,
        label: item.buyer_name,
    })) 

    const roles = useRoleStore(state=>state.roles)
    const optionsRoles = roles.map(item=>({
        value: item.id,
        label: item.role_name,
    })) 

    useEffect(() => {
        if (defaultValuesLogin) {
            setEnterLogin(defaultValuesLogin);
        }
        if(defaultValuesPassword){
            setEnterPassword(defaultValuesPassword)
        }
        if(defaultValuesEmployee){
            setSelectEmployee(defaultValuesEmployee)
        }
        if(defaultValuesRole){
            setSelectRole(defaultValuesRole)
        }
    }, [defaultValuesLogin,defaultValuesPassword,defaultValuesEmployee,defaultValuesRole]);

    useEffect(() => {
        if(!defaultValuesLogin){
            const generateLogin = employees.find(employee => employee.id === selectEmployee)
            setEnterLogin(`${generateLogin?.buyer_name}`)
        }else{
            setEnterLogin("")
        }

    },[selectEmployee])

    const onChangeInputLogin: InputProps['onChange'] = (e) => {
        setEnterLogin(e.target.value)
    };

    const onChangeInputPassword: InputProps['onChange'] = (e) => {
        setEnterPassword(e.target.value)
    };

    const onChangeSelectEmployees: SelectProps['onChange'] = (e) =>{
        setSelectEmployee(Number(e))
    }

    const onChangeSelectRoles: SelectProps['onChange'] = (e) =>{
        setSelectRole(Number(e))
    }
    const getEmployeeById = useEmployeeStore(state=>state.getEmployeeById(Number(selectEmployee)))
    const getRoleById = useRoleStore(state=>state.getRoleById(Number(selectRole)))

    const randomPassword = () => {
        const generatePassword = Math.floor(Math.random() * (999999 - 100000) + 100000);
        setEnterPassword(generatePassword.toString())
    }


    const onOk = () => {
        if(enterLogin && enterPassword && getEmployeeById && getRoleById){
            handleOk(enterLogin,enterPassword, getEmployeeById,getRoleById)
            setEnterLogin("")
            setEnterPassword("")
            setSelectEmployee(undefined);
            setSelectRole(undefined)
        }else{
            message.error('Заполните все поля');
        }
    };

    return(
        <>
        <Modal title={`${type} пользователя`} open={isModalOpen} onOk={()=>onOk()} onCancel={handleCancel}  footer={(_) => (
              <>
               <Button onClick={()=>onOk()}>{type == "Изменение" ? "Изменить" : "Добавить" }</Button>
                <Button onClick={handleCancel}>Закрыть</Button>
              </>
            )}>
            <div>
                <Typography.Title level={5}>Пользователь</Typography.Title>
                <Input placeholder="Введите никнейм" type="text" onChange={onChangeInputLogin} value={enterLogin} name="login" required/>
            </div>
            <div>
                <Typography.Title level={5}>Пароль</Typography.Title>
                <Space direction="horizontal">
                    <Input.Password placeholder="Введите пароль" type="password" onChange={onChangeInputPassword} value={enterPassword} name="password" required maxLength={6}/>
                    <Button onClick={() => randomPassword()} >
                        Сгенерировать
                    </Button>
                </Space>
            </div>
            <div>
                <Typography.Title level={5}>Сотрудник</Typography.Title>
                <Selector onChange={onChangeSelectEmployees} optionArray={optionsEmployees} placeholder="Выберите кабинет" value={selectEmployee ? selectEmployee : null} />
            </div>
            <div>
                <Typography.Title level={5}>Роль</Typography.Title>
                <Selector onChange={onChangeSelectRoles} optionArray={optionsRoles} placeholder="Выберите роль" value={selectRole ? selectRole : null} />
            </div>
            
        </Modal>
        </>
    )
   
}