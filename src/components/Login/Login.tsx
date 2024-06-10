'use client'

import { Alert, Button, Form, FormProps, Input, message, Typography } from "antd";
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
    // console.log('Failed:', errorInfo);
  };

    return(
        <>
        <Form
        name="basic"
        style={{padding:'20px'}}
        className={`${style.formLogin} ${error ? style.error : ''}`}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <Typography.Title className={style.loginLogo}>Доктор Снабжение</Typography.Title>
          <Typography.Title level={4} className={style.loginText}>Войдите в свою учетную запись</Typography.Title>

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

        <div className={style.loginForgotPassword}>
          <a id={style.loginForgotPasswordText} onClick={() => message.info("Обратитесь в поддержку для смены пароля")}>
            Забыли пароль ? 
          </a>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" id={style.loginSubmit}>
            Войти
          </Button>
         
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
      </Form>
      </>
    )
}