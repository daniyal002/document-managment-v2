'use client'

import style from './page.module.scss'
import { AdminPost } from '@/components/Admin/Post/AdminPost'

export default function Posts(){
    return(
        <div className={style.roles}>
            <AdminPost/>
        </div>
    )
}