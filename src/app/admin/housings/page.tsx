'use client'


import { AdminHousing } from '@/components/Admin/Housing/AdminHousing'
import style from './page.module.scss'

export default function Housing(){
    return(
        <div className={style.housing}>
           <AdminHousing/>
        </div>
    )
}