import ReactECharts from "echarts-for-react";
import {useMemo} from "react";

export function HeatmapChart({ data, labelColor }) {
    const metrics = ['accel_z'];
    const timeLabels = data.map(d => new Date(d.time).toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    }));

    const heatmapData = [];

    metrics.forEach((metric, y) => {
        data.forEach((entry, x) => {
            heatmapData.push([x, y, entry[metric]]);
        });
    });

    const option = useMemo(() => ({
        tooltip: {
            position: 'top',
            formatter: params => {
                const time = timeLabels[params.data[0]];
                const metric = metrics[params.data[1]];
                const value = params.data[2].toFixed(2);
                return `${metric} @ ${time}: <b>${value}</b>`;
            }
        },
        grid: {
            height: '60%',
            top: '10%',
        },
        xAxis: {
            type: 'category',
            data: timeLabels,
            splitArea: { show: false },
            axisLabel: {
                interval: Math.floor(timeLabels.length / 10),
                rotate: 45,
                color: labelColor
            }
        },
        yAxis: {
            type: 'category',
            data: metrics,
            splitArea: { show: true },
            axisLabel: { color: labelColor }
        },
        visualMap: {
            min: -20,
            max: 20,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '5%',
            textStyle: { color: labelColor }
        },
        series: [{
            name: 'Aceleração',
            type: 'heatmap',
            data: heatmapData,
            label: { show: false },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }],
        textStyle: { color: labelColor }
    }), [data, labelColor]);

    return <ReactECharts option={option} style={{ height: 400 }} />;
}