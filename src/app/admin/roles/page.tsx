'use client'

import { AdminRole } from '@/components/Admin/Role/AdminRole'
import style from './page.module.scss'

export default function Roles(){
    return(
        <div className={style.roles}>
            <AdminRole/>
        </div>
    )
}