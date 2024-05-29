import { IPost } from "@/interface/post";
import { create } from "zustand";

interface IPostStore{
    posts: IPost[],
    setPosts: (newPosts:IPost[]) => void,
    getPostById: (id: number) => IPost | undefined
    createPost: (post:IPost) => void
    updatePostById: (id:number, updatePost: Partial<IPost>) => void
    deletePostById: (id:number) => void

}

export const usePostStore = create<IPostStore>((set,get) =>({
    posts:[],

    setPosts: (newPosts) =>{
        set({posts:newPosts})
    },

    getPostById: (id) => {
        return get().posts.find((post) => post.id === id)
    },

    createPost: (post) => {
        set((state)=>{return {posts:[...state.posts, post]}})
    },

    updatePostById: (id, updatePost) => {
        set((state) => ({
            posts: state.posts.map((post) =>
            post.id === id ? {...post, ...updatePost} : post 
                )
        }))
    },

    deletePostById: (id) => {
        set((state) => ({posts: state.posts.filter((post) => post.id !== id )}))
    }
}))