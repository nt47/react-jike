import { useState, useEffect } from "react"
import { getChannelsAPI } from '@/apis/article'

export const useChannel = () => {
    const [channelList, SetChannelList] = useState([])
    const GetChannels = async () => {
        const res = await getChannelsAPI()
        return res.data.channels//返回一个promise对象
    }
    useEffect(() => {
        GetChannels().then(result => {
            SetChannelList(result)
        })
    }, [])

    return { channelList }
}
