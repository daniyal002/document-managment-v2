'use client'

import { Alert, Button, Form, FormProps, Input } from "antd";
import style from './Login.module.scss'
import { ILoginRequest } from "@/interface/auth";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hook/Auth/authHook";

export default function Login(){
      
  const {push} = useRouter()
  const {mutate,error} = useLogin(push)
    
  const onFinish: FormProps<ILoginRequest>['onFinish'] = async (values) => {
    mutate(values)
  };
      
  const onFinishFailed: FormProps<ILoginRequest>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

    return(
        <>
        <Form
        name="basic"
        style={{ maxWidth: 310, width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className={`${style.formLogin} ${error ? style.error : ''}`}>

        <Form.Item<ILoginRequest>
          name="login"
          rules={[{ required: true, message: 'Введите логин!' }]}
        >
            <div className={style.formItem}>
            <label htmlFor="login">Логин</label>
            <Input id={style.usernameInput} placeholder="Введите логин"/>
            </div>
        </Form.Item>
    
        <Form.Item<ILoginRequest>
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
            <div className={style.formItem}>
            <label htmlFor="password">Пароль</label>
            <Input.Password id={style.passwordInput} placeholder="Введите пароль"/>
            </div>
        </Form.Item>
    
        <Form.Item>
          <Button type="primary" htmlType="submit" id={style.loginSubmit}>
            Войти
          </Button>
          {/* <Button type="primary" 
          onClick={() => authService.logout()} 
          id={style.loginSubmit}>
            Выйти
          </Button> */}
         
        </Form.Item>
        {error && (
            <Alert
              message="Ошибка"
              description={error?.response === undefined ? "Ошибка сети" : error?.response.data.detail}
              type="error"
              showIcon
              id={style.alertError}
              />
          )}
        </div>

      </Form>
      </>
    )
}