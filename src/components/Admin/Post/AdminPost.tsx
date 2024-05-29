'use client'
import style from './AdminPost.module.scss'
import { Button } from 'antd'
import { useState } from 'react'
import { usePostStore } from '@/store/PostStore/PostStore'
import { AdminPostTable } from './AdminPostTable/AdminPostTable'
import { AdminPostModal } from './AdminPostModal/AdminPostModal'
import { useCreatePostMutation, usePostData } from '@/hook/Post/postHook'


export function AdminPost(){
  const posts  = usePostStore(state => state.posts);

  const { mutate: createHousingMutation } = useCreatePostMutation();
  const {isLoading,error} = usePostData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (newPost:string) => {
    setIsModalOpen(false);
    createHousingMutation({post_name:newPost})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


   

    return(
        <div className={style.adminPosts}>
            <AdminPostModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} type='Создание'/>
            <Button type='primary' onClick={() => {showModal()}}>Добавить Должность</Button>
            <AdminPostTable posts={posts} isLoading={isLoading}/>
        </div>
    )
}