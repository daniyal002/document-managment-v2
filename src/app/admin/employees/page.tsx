'use client'


import { AdminEmployee } from '@/components/Admin/Employee/AdminEmployee'
import style from './page.module.scss'

export default function Employees(){
    return(
        <div className={style.employees}>
           <AdminEmployee/>
        </div>
    )
}