import { Button, ConfigProvider, Popconfirm, PopconfirmProps, Space, Table, TableColumnsType, message } from "antd";
import { useState } from "react";
import { IPost } from "@/interface/post";
import { usePostStore } from "@/store/PostStore/PostStore";
import { AdminPostModal } from "../AdminPostModal/AdminPostModal";
import { useDeletePostMutation, useUpdatePostMutation } from "@/hook/Post/postHook";



interface Props{
    posts:IPost[],
    isLoading:boolean,
}

export function AdminPostTable({posts,isLoading}:Props){

    const {mutate:updatePostMutation} = useUpdatePostMutation()
    const {mutate:deletePostMutation} = useDeletePostMutation()
    const getPostById = usePostStore(state => state.getPostById)
  

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [defaultValuesPost, setDefaultValuesPost] = useState<string>("")
    const [postId, setPostId] = useState<number>()


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (updatePost:string) => {
    setIsModalOpen(false);
    updatePostMutation({id:postId, post_name:updatePost})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    message.success('Должность удалена');
    deletePostMutation(getPostById(postId as number) as IPost)
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    message.error('Должность не удалена');
  };

    const columns: TableColumnsType<IPost> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a:any, b:any) => a.id - b.id,
          },
          
          {
            title: 'Должность',
            dataIndex: 'post_name',
            key: 'post_name',
            sorter: (a: any, b: any) => a.post_name.localeCompare(b.post_name, 'ru'),
          },
          {
            title: 'Действия',
            key: 'action',
            render:(_:any, record:IPost) => (
              <Space size="middle">
                <Button type="dashed" onClick={() => {setPostId(record.id);setDefaultValuesPost(record.post_name);showModal()}} >Изменить</Button>
                <Popconfirm
                title="Удаление корпуса"
                description="Вы точно хотите удалить корпус ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Да"
                cancelText="Нет"
            >
                <Button type="primary" danger onClick={()=>setPostId(record.id)}>Удалить</Button>
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
            <AdminPostModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Изменение' defaultValuesPost={defaultValuesPost}/>
            <Table columns={columns} dataSource={posts} pagination={{ pageSize: 10}}   scroll={{ y: "80vh" }} loading={isLoading}/>
        </ConfigProvider>
        </>
    )
} 