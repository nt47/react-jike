import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI, getChannelsAPI, getArticleDetailAPI, updateArticleAPI } from '@/apis/article'
import { useEffect, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'
import { update } from 'lodash'

const { Option } = Select

const Publish = () => {
    // const [channelList, SetChannelList] = useState([])
    // const GetChannels = async () => {
    //     const res = await getChannelsAPI()
    //     return res.data.channels//返回一个promise对象
    // }
    // useEffect(() => {
    //     GetChannels().then(result => {
    //         SetChannelList(result)
    //     })
    // }, [])
    const { channelList } = useChannel()
    //console.log(channelList)
    const navigate = useNavigate()

    const onFinish = (values) => {
        //console.log(values)
        if (imageList.length != imageType) return message.warning('封面数量与实际数量不符')
        const { title, channel_id, content } = values
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    }
                    else {
                        return item.url
                    }
                })
            },
            channel_id
        }

        const createArticle = async () => {
            await createArticleAPI(reqData)
            navigate('/article')
        }

        const updateArticle = async () => {
            await updateArticleAPI({ ...reqData, id: articleId })
            navigate('/article')
        }
        if (articleId) {
            updateArticle()
        }
        else {
            createArticle()
        }

    }

    const [imageList, setImageList] = useState([])
    const onUploadChange = (values) => {
        //console.log(values)
        setImageList(values.fileList)
    }
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    const p = useSearchParams()
    const [form] = Form.useForm()
    const articleId = p[0].get('id')

    useEffect(() => {
        //console.log(id)
        const getArticleDetail = async () => {
            const res = await getArticleDetailAPI(articleId)
            console.log(res.data)

            const { id, pub_date, ...data } = res.data

            form.setFieldsValue({
                ...data,
                type: data.cover.type
            })//不是setFieldValue！

            setImageType(data.cover.type)
            setImageList(data.cover.images.map(url => {
                return { url }
            }))

        }
        if (articleId)
            getArticleDetail()
    }, [articleId, form])
    //console.log(imageList)
    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑文章' : '发布文章'}` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}//封面类型
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload
                                listType="picture-card"
                                showUploadList
                                action='http://geek.itheima.net/v1_0/upload'
                                onChange={onUploadChange}
                                name='image'
                                maxCount={imageType}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>}
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {(() => {
                                    if (articleId) {
                                        return '更新文章'
                                    }
                                    return '发布文章'
                                })()}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish