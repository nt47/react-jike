import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/userSlice'

const { Header, Sider } = Layout


const items = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const onMenuClick = (route) => {
        navigate(route.key)
    }
    const location = useLocation()
    const selectedKey = location.pathname
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    const onConfirm = () => {
        dispatch(clearUserInfo())
        navigate("/login")
    }

    const [params] = useSearchParams()
    const articleId = params.get('id')

    const itemsNew = [
        ...items
    ]
    itemsNew[2] = {
        label: articleId ? '编辑文章' : '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    }

    const userName = useSelector(state => state.user.userInfo.name)
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{userName}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedKey}
                        items={itemsNew}
                        onClick={onMenuClick}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }}>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout