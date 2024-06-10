import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { useRoleStore } from "@/store/RoleStore/RoleStore";
import { IRole } from "@/interface/role";
import { AdminRoleModal } from "../AdminRoleModal/AdminRoleModal";
import { useDeleteRoleMutation, useUpdateRoleMutation } from "@/hook/Role/roleHook";



interface Props{
    roles:IRole[],
    isLoading:boolean,
}

export function AdminRoleTable({roles,isLoading}:Props){

    const {mutate:updateRoleMutation} = useUpdateRoleMutation()
    const {mutate:deleteRoleMutation} = useDeleteRoleMutation()
    const getRoleById = useRoleStore(state => state.getRoleById)


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesRole, setDefaultValuesRole] = useState<string>("")
    const [roleId, setRoleId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (updateRole:string) => {
    setIsModalOpen(false);
    updateRoleMutation({id:roleId,role_name:updateRole})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Роль удалена');
    deleteRoleMutation(getRoleById(roleId as number) as IRole)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Роль не удалена');
  };

    const columns: TableColumnsType<IRole> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Роль',
            dataIndex: 'role_name',
            key: 'role_name',
            sorter: (a: any, b: any) => a.role_name.localeCompare(b.role_name, 'ru'),
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IRole) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {setRoleId(record.id);setDefaultValuesRole(record.role_name);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление роли"
                description="Вы точно хотите удалить роль ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setRoleId(record.id)}>Удалить</Button>
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
            <AdminRoleModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesRole={defaultValuesRole}/>
            <Table columns={columns} dataSource={roles} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} loading={isLoading} />
        </ConfigProvider>
        </>
    )
} 