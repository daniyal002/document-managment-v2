import { IHousing } from "@/interface/housing";
import { useHousingStore } from "@/store/HousingStore/HousingStore";
import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { HousingModal } from "../HousingModal/HousingModal";
import { useDeleteHousingMutation, useUpdateHousingMutation } from "@/hook/Housing/housingHook";



interface Props{
  housings:IHousing[]
  isLoading:boolean,
}

export function AdminHousingTable({housings,isLoading}:Props){

    const {mutate:updateHousingMutation} = useUpdateHousingMutation()
    const {mutate:deleteHousingMutation} = useDeleteHousingMutation()
    const getHousingById = useHousingStore(state => state.getHousingById)



    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesHousing, setDefaultValuesHousing] = useState<string>("")
    const [housingId, setHousingId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (updateHousing:string) => {
    setIsModalOpen(false);
    updateHousingMutation({id:housingId,housing_name:updateHousing})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Корпус удален');
    deleteHousingMutation(getHousingById(housingId as number) as IHousing)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Корпус не удален');
  };

    const columns: TableColumnsType<IHousing> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Корпус',
            dataIndex: 'housing_name',
            key: 'housing_name',
            sorter: (a: any, b: any) => a.housing_name.localeCompare(b.housing_name, 'ru'),
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IHousing) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {setHousingId(record.id);setDefaultValuesHousing(record.housing_name);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление корпуса"
                description="Вы точно хотите удалить корпус ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setHousingId(record.id)}>Удалить</Button>
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
            <HousingModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesHousing={defaultValuesHousing}/>
            <Table columns={columns} dataSource={housings} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} loading={isLoading}/>
        </ConfigProvider>
        </>
    )
} 