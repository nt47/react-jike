import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useState, useEffect } from 'react'
import { asyncLogin } from '@/store/modules/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [mobile, SetMobile] = useState('')
    const [code, SetCode] = useState('')
    const handleBlur = () => {
        if (mobile.trim() == '' && code.trim() == '')
            window.location.reload()
    }
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const navigate = useNavigate()
    const onFinish = async values => {
        console.log(values)
        //触发asyncLogin
        await dispatch(asyncLogin(values))

        navigate("/")
        message.success("登录成功")

    }
    console.log(token)

    useEffect(() => {
        // 在组件渲染前跳转到新的路由
        if (token)
            navigate('/');

    }, [navigate]);

    if (!token)
        return (
            <div className="login">
                <Card className="login-container">
                    <img className="login-logo" src={logo} alt="" />
                    {/* 登录表单 */}
                    <Form
                        onBlur={handleBlur}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号不能为空'
                                },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: '手机号格式不对'
                                }
                            ]}
                        >
                            <Input size="large" placeholder="请输入手机号" value={mobile}
                                onChange={(event) => SetMobile(event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '验证码不能为空'
                                }
                            ]}
                        >
                            <Input size="large" placeholder="请输入验证码" value={code}
                                onChange={(event) => SetCode(event.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
}

export default Login