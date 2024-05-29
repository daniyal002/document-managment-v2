'use client'

import { AdminUsers } from '@/components/Admin/Users/AdminUsers'
import style from './page.module.scss'

export default function Users(){
    return(
        <div className={style.users}>
            <AdminUsers />
        </div>
    )
}