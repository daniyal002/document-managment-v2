import { useMutation, useQuery } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { IPost } from '@/interface/post';
import { usePostStore } from '@/store/PostStore/PostStore';
import { IErrorResponse } from '@/interface/error';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

export const usePostData = () => {
  const { data: postData, isLoading, error } = useQuery({queryKey:['newPosts'],queryFn:postService.getPost});
  return {postData, isLoading, error}
}

export const useCreatePostMutation = () => {
  const createPost = usePostStore(state => state.createPost)
    const {mutate} = useMutation({
        mutationKey:['createPost'],
        mutationFn:(data:IPost) => postService.addPost(data),
        onSuccess(data){
          createPost(data.post)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
      return {mutate}
};

export const useUpdatePostMutation = () => {
  const updatePostById = usePostStore(state => state.updatePostById)
    const {mutate} = useMutation({
        mutationKey:['updatePost'],
        mutationFn:(data:IPost) => postService.updatePost(data),
        onSuccess(data, variables){
          updatePostById(variables.id as number,variables)
        },
        onError(error:AxiosError<IErrorResponse>){
          message.error(error?.response?.data?.detail)
        }   
    })
      return {mutate}
};


export const useDeletePostMutation = () => {
  const deletePostById = usePostStore(state => state.deletePostById)

  const {mutate} = useMutation({
      mutationKey:['deletePost'],
      mutationFn:(data:IPost) => postService.deletePostById(data),
      onSuccess(data, variables){
        deletePostById(variables.id as number);
      },
      onError(error:AxiosError<IErrorResponse>){
        message.error(error?.response?.data?.detail)
      }   
  })
    return {mutate}
};
