import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { IParlor } from "@/interface/parlor";
import { IEmployee } from "@/interface/employee";
import { useEmployeeStore } from "@/store/EmployeeStore/EmployeeStore";
import { IPost } from "@/interface/post";
import { AdminEmployeeModal } from "../AdminEmployeeModal/AdminEmployeeModal";
import { useDeleteEmployeeMutation, useUpdateEmployeeMutation } from "@/hook/Employee/employeeHook";



interface Props{
    employees:IEmployee[]
}

export function AdminEmployeeTable({employees}:Props){

    const {mutate:updateEmployeeMutation} = useUpdateEmployeeMutation()
    const {mutate:deleteEmployeeMutation} = useDeleteEmployeeMutation()
    const getEmployeeById = useEmployeeStore(state => state.getEmployeeById)


    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesBuyerName, setDefaultValuesBuyerName] = useState<string>()
    const [defaultValuesBuyerType, setDefaultValuesBuyerType] = useState<string>()
    const [defaultValuesParlor, setDefaultValuesParlor] = useState<IParlor[]>()
    const [defaultValuesPost, setDefaultValuesPost] = useState<IPost>()
    const [employeeId, setEmployeeId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (buyer_name:string,buyer_type:string,parlor:IParlor[],post:IPost) => {
    setIsModalOpen(false);
    updateEmployeeMutation({id:employeeId,buyer_name,buyer_type,parlor,post})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Сотрудник удален');
    deleteEmployeeMutation(getEmployeeById(employeeId as number) as IEmployee)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Сотрудник не удален');
  };

    const columns: TableColumnsType<IEmployee> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Наименование',
            dataIndex: 'buyer_name',
            key: 'buyer_name',
            sorter: (a: any, b: any) => a.buyer_name.localeCompare(b.buyer_name, 'ru'),
          },
          {
            title: 'Вид',
            dataIndex: 'buyer_type',
            key: 'buyer_type',
            sorter: (a: any, b: any) => a.buyer_type.localeCompare(b.buyer_type, 'ru'),
          },
          {
            title: 'Кабинет',
            dataIndex: 'parlor',
            key: 'parlor',
            sorter: (a: any, b: any) => a.parlor.parlor_name.localeCompare(b.parlor.parlor_name, 'ru'),
            render: (parlor: IParlor[]) => parlor?.map((parlor, index) => (
              <div key={index}>{parlor?.parlor_name}</div> 
            ))
          },
          {
            title: 'Должность',
            dataIndex: 'post',
            key: 'post',
            sorter: (a: any, b: any) => a?.post?.post_name?.localeCompare(b?.post?.post_name, 'ru'),
            render: (post: IPost) => post?.post_name // Or any other suitable React element 
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IEmployee) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {console.log(record);setEmployeeId(record.id);setDefaultValuesParlor(record.parlor);setDefaultValuesBuyerName(record.buyer_name);setDefaultValuesBuyerType(record.buyer_type);setDefaultValuesPost(record.post);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление сотрудника"
                description="Вы точно хотите удалить сотрудника ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setEmployeeId(record.id)}>Удалить</Button>
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
            <AdminEmployeeModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesBuyerName={defaultValuesBuyerName} defaultValuesBuyerType={defaultValuesBuyerType} defaultValuesParlor={defaultValuesParlor} defaultValuesPost={defaultValuesPost}/>
            <Table columns={columns} dataSource={employees} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} />
        </ConfigProvider>
        </>
    )
} 