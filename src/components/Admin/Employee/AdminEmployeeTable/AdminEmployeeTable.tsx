import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { IParlor } from "@/interface/parlor";
import { IEmployee, IEmployeeFullName } from "@/interface/employee";
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
    const [defaultValuesFullName, setDefaultValuesFullName] = useState<IEmployeeFullName>()
    const [defaultValuesParlor, setDefaultValuesParlor] = useState<IParlor[]>()
    const [defaultValuesPost, setDefaultValuesPost] = useState<IPost>()
    const [employeeId, setEmployeeId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (fullName:IEmployeeFullName,parlor:IParlor[],post:IPost) => {
    setIsModalOpen(false);
    updateEmployeeMutation({id:employeeId,first_name:fullName.firstName,last_name:fullName.lastName,middle_name:fullName.middleName,parlor,post})
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
            title: 'Фамилия',
            dataIndex: 'last_name',
            key: 'last_name',
            sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name, 'ru'),
          },
          {
            title: 'Имя',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name, 'ru'),
          },
          {
            title: 'Отчество',
            dataIndex: 'middle_name',
            key: 'middle_name',
            sorter: (a: any, b: any) => a.middle_name.localeCompare(b.middle_name, 'ru'),
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
            sorter: (a: any, b: any) => a.post.post.localeCompare(b.post.post, 'ru'),
            render: (post: IPost) => post?.post_name // Or any other suitable React element 
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IEmployee) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {console.log(record);setEmployeeId(record.id);setDefaultValuesParlor(record.parlor);setDefaultValuesFullName({firstName:record.first_name,lastName:record.last_name,middleName:record.middle_name});setDefaultValuesPost(record.post);showModal()}} >Изменить</Button>
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
            <AdminEmployeeModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesFullName={defaultValuesFullName} defaultValuesParlor={defaultValuesParlor} defaultValuesPost={defaultValuesPost}/>
            <Table columns={columns} dataSource={employees} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} />
        </ConfigProvider>
        </>
    )
} 