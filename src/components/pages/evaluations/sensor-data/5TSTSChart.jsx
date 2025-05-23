import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

export default function T5STSChart({ idadePaciente, tempoPaciente, sexo, labelColor = '#000' }) {
    const option = useMemo(() => {
        const idades = [10, 20, 30, 40, 50, 60, 70, 80, 90];

        const referenciaHomens = [5.5, 6.0, 6.1, 7.6, 7.7, 8.4, 11.6, 16.7, 19.5];
        const referenciaMulheres = [5.8, 6.0, 6.1, 7.6, 7.7, 12.7, 13.0, 17.2, 22.9];
        const referenciaBase = sexo === 'F' ? referenciaMulheres : referenciaHomens;

        const tempoRuim = referenciaBase.map(t => t + 5);

        return {
            title: {
                text: 'Gráfico de continuidade',
                left: 'left',
                textStyle: { color: labelColor },
            },
            tooltip: { trigger: 'axis' },
            legend: {
                top: 30,
                textStyle: { color: labelColor },
                data: ['Tempo Ideal', 'Tempo Ruim', 'Paciente'],
            },
            xAxis: {
                type: 'value',
                name: 'Idade',
                nameLocation: 'middle',
                nameGap: 30,
                min: 10,
                max: 90,
                interval: 10,
                axisLabel: { color: labelColor },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc',
                    },
                },
            },
            yAxis: {
                type: 'value',
                name: 'Tempo (segundos)',
                nameLocation: 'middle',
                nameGap: 50,
                axisLabel: { color: labelColor },
            },
            textStyle: { color: labelColor },
            series: [
                {
                    name: 'Tempo Ideal',
                    type: 'line',
                    data: idades.map((idade, i) => [idade, referenciaBase[i]]),
                    smooth: true,
                    lineStyle: { color: 'green', width: 2 },
                },
                {
                    name: 'Tempo Ruim',
                    type: 'line',
                    data: idades.map((idade, i) => [idade, tempoRuim[i]]),
                    smooth: true,
                    lineStyle: { color: 'red', width: 2 },
                },
                {
                    name: 'Paciente',
                    type: 'scatter',
                    data: [[idadePaciente, tempoPaciente]],
                    symbol: 'circle',
                    symbolSize: 12,
                    itemStyle: {
                        color: 'orange',
                    },
                    label: {
                        show: true,
                        formatter: `Paciente: ${tempoPaciente.toFixed(1)}s`,
                        position: 'top',
                        color: 'orange',
                        fontWeight: 'bold',
                    }
                }
            ],
        };
    }, [idadePaciente, tempoPaciente, sexo, labelColor]);

    return <ReactECharts option={option} style={{ height: 400 }} />;
}
