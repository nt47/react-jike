import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ obj }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        //var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartRef.current);
        var option;

        option = {
            title: {
                text: obj.title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'Angular', 'React']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: obj.data,
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);
    }, [])

    return <div ref={chartRef} style={{ width: '600px', height: '500px', display: 'inline-block' }}>

    </div>
}

export default BarChart;