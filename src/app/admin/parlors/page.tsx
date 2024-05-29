'use client'

import { AdminParlor } from '@/components/Admin/Parlor/AdminParlor'
import style from './page.module.scss'

export default function Parlor(){
    return(
        <div className={style.parlor}>
        <AdminParlor/>
        </div>
    )
}