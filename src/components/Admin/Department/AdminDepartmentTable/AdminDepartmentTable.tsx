import { IHousing } from "@/interface/housing";
import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { AdminDepartmentModal } from "../AdminDepartmentModal/AdminDepartmentModal";
import { IDepartment } from "@/interface/department";
import { useDepartmentStore } from "@/store/DepartmentStore/DepartmentStore";
import { useDeleteDepartmentMutation, useUpdateDepartmentMutation } from "@/hook/Department/departmentHook";



interface Props{
  departments:IDepartment[]
  isLoading:boolean
}

export function AdminDepartmentTable({departments,isLoading}:Props){

    const {mutate:updateDepartmentMutation} = useUpdateDepartmentMutation()
    const {mutate:deleteDepartmentMutation} = useDeleteDepartmentMutation()
    const getDepartmentById = useDepartmentStore(state => state.getDepartmentById)


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesDepartmentName, setDefaultValuesDepartmentName] = useState<string>("")
    const [defaultValuesHousing, setDefaultValuesHousing] = useState<IHousing>()
    const [departmentId, setDepartmentId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (updateDepartmentName:string,housing:IHousing) => {
    setIsModalOpen(false);
    updateDepartmentMutation({id:departmentId,department_name:updateDepartmentName,housing})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Подразделение удалено');
    deleteDepartmentMutation(getDepartmentById(departmentId as number) as IDepartment)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Подразделение не удалено');
  };

    const columns: TableColumnsType<IDepartment> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Подразделение',
            dataIndex: 'department_name',
            key: 'department_name',
            sorter: (a: any, b: any) => a.department_name.localeCompare(b.department_name, 'ru'),
          },
          {
            title: 'Корпус',
            dataIndex: 'housing',
            key: 'housing',
            sorter: (a: any, b: any) => a.housing?.housing_name.localeCompare(b.housing?.housing_name, 'ru'),
            render: (housing:IHousing) => housing?.housing_name
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IDepartment) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {setDepartmentId(record.id);setDefaultValuesDepartmentName(record.department_name);setDefaultValuesHousing(record.housing);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление подразделения"
                description="Вы точно хотите удалить подразделение ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setDepartmentId(record.id)}>Удалить</Button>
            </Popconfirm>
              </Space>)
          },
    ]
    return(
        <>   <ConfigProvider 
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
            <AdminDepartmentModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesDepartmentName={defaultValuesDepartmentName} defaultValuesHousing={defaultValuesHousing?.id}/>
            <Table columns={columns} dataSource={departments} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} loading={isLoading} />
        </ConfigProvider>
        </>
    )
} 