import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { IEmployee } from "@/interface/employee";
import { useUserStore } from "@/store/UserStore/UserStore";
import { IRole } from "@/interface/role";
import { IUser } from "@/interface/user";
import { AdminUserModal } from "../AdminUserModal/AdminUserModal";
import { compareByFullName } from "@/helper/EmployeeSorter";
import { useDeleteUserMutation, useUpdateUserMutation } from "@/hook/User/userHook";



interface Props{
    users:IUser[]
}

export function AdminUserTable({users}:Props){

    const {mutate:updateUserMutation} = useUpdateUserMutation()
    const {mutate:deleteUserMutation} = useDeleteUserMutation()
    const getUserById = useUserStore(state => state.getUserById)


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesLogin, setDefaultValuesLogin] = useState<string>()
    const [defaultValuesPassword, setDefaultValuesPassword] = useState<string>()
    const [defaultValuesEmployee, setDefaultValuesEmployee] = useState<IEmployee>()
    const [defaultValuesRole, setDefaultValuesRole] = useState<IRole>()
    const [userId, setUserId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (login:string,password:string,employee:IEmployee,role:IRole ) => {
    setIsModalOpen(false);
    updateUserMutation({id:userId,login,password,employee,role })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Пользователь удален');
    deleteUserMutation(getUserById(userId as number) as IUser)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Пользователь не удален');
  };

    const columns: TableColumnsType<IUser> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          {
            title: 'Пользователь',
            dataIndex: 'login',
            key: 'login',
            sorter: (a: any, b: any) => a.login.localeCompare(b.login, 'ru'),
          },
          {
            title: 'Сотрудник',
            dataIndex: 'employee',
            key: 'employee',
            sorter: (a:IUser, b:IUser) => a.employee.buyer_name.localeCompare(b.employee.buyer_name, 'ru'),
            render: (employee:IEmployee) => employee.buyer_name
          },
          
          {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            sorter: (a: any, b: any) => a.role.role_name.localeCompare(b.role.role_name, 'ru'),
            render: (role:IRole) => role?.role_name
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IUser) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {setUserId(record.id);setDefaultValuesLogin(record.login);setDefaultValuesPassword(record.password);setDefaultValuesEmployee(record.employee);setDefaultValuesRole(record.role);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление пользователя"
                description="Вы точно хотите удалить пользователя ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setUserId(record.id)}>Удалить</Button>
            </Popconfirm>
              </Space>)
          },
    ]
    return(
        <>  
        <ConfigProvider 
        theme={{
          components:{
            Table:{
              headerColor:"rgba(255,255,255,1)",
              headerBg:"rgba(80, 111, 217,0.7)",
              headerSortHoverBg:'rgba(80, 111, 217,0.5)',
              bodySortBg:"rgba(220, 226, 247,1)",
              headerSortActiveBg:"rgba(80, 111, 217,0.5)",
              rowHoverBg:"rgba(80, 111, 217,0.1)",
            }
          }
        }}> 
            <AdminUserModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesLogin={defaultValuesLogin} defaultValuesPassword={defaultValuesPassword} defaultValuesEmployee={defaultValuesEmployee?.id} defaultValuesRole={defaultValuesRole?.id}/>
            <Table columns={columns} dataSource={users} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} />
       </ConfigProvider>
        </>
    )
} 