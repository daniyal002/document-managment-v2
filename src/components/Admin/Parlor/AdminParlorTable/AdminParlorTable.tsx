import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { IDepartment } from "@/interface/department";
import { IParlor } from "@/interface/parlor";
import { useParlorStore } from "@/store/ParlorStore/ParlorStore";
import { AdminParlorModal } from "../AdminParlorModal/AdminParlorModal";
import { useDeleteParlorMutation, useUpdateParlorMutation } from "@/hook/Parlor/parlorHook";
import { IFloor } from "@/interface/floor";



interface Props{
  parlors:IParlor[]
  isLoading:boolean,
}

export function AdminParlorTable({parlors,isLoading}:Props){

    const {mutate:updateParlorMutation} = useUpdateParlorMutation()
    const {mutate:deleteParlorMutation} = useDeleteParlorMutation()
    const getParlorById = useParlorStore(state => state.getParlorById)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesParlor, setDefaultValuesParlor] = useState<string>("")
    const [defaultValuesDepartment, setDefaultValuesDepartment] = useState<IDepartment>()
    const [parlorId, setParlorId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (parlor_name:string,department:IDepartment,floor:IFloor) => {
    setIsModalOpen(false);
    updateParlorMutation({id:parlorId,parlor_name,department,floor})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Кабинет удален');
    deleteParlorMutation(getParlorById(parlorId as number) as IParlor)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Кабинет не удален');
  };

    const columns: TableColumnsType<IParlor> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Кабинет',
            dataIndex: 'parlor_name',
            key: 'parlor_name',
            sorter: (a: any, b: any) => a.parlor_name.localeCompare(b.parlor_name, 'ru'),
          },
          {
            title: 'Подразделение',
            dataIndex: 'department',
            key: 'department',
            sorter: (a: any, b: any) => a.department.department_name.localeCompare(b.department.department_name, 'ru'),
            render: (department:IDepartment) => department?.department_name
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IParlor) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {console.log(record);setParlorId(record.id);setDefaultValuesParlor(record.parlor_name);setDefaultValuesDepartment(record.department);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление кабинета"
                description="Вы точно хотите удалить кабинет ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setParlorId(record.id)}>Удалить</Button>
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
            <AdminParlorModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesParlor={defaultValuesParlor} defaultValuesDepartment={defaultValuesDepartment?.id}/>
            <Table columns={columns} dataSource={parlors} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} loading={isLoading} />
        </ConfigProvider>
        </>
    )
} 