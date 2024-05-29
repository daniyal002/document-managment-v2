'use client'
import Login from "@/components/Login/Login"
import style from "./page.module.scss"

export default function LoginPage(){

    return(
    <div className={style.loginPage}>
        <Login/>
    </div>
    )
}