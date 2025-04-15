// 'use client';
//
// import React, { useEffect, useState } from 'react';
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     Legend,
//     CartesianGrid,
//     ResponsiveContainer,
// } from 'recharts';
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import ReactECharts from "echarts-for-react";
// import {Plus, LineChart as LineChartIcon} from "lucide-react";
//
// const Grafico = () => {
//     const [dados, setDados] = useState([]);
//
//     useEffect(() => {
//         const fetchDados = async () => {
//             try {
//                 const response = await fetch('http://20.201.114.238/dado-sensor/teste/26');
//                 const data = await response.json();
//
//                 const dadosFormatados = data.map((item) => {
//                     const t = new Date(item.tempo);
//                     const tempoFormatado = `${t.getHours().toString().padStart(2, '0')}:${t
//                         .getMinutes()
//                         .toString()
//                         .padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
//                     return {
//                         tempo: tempoFormatado,
//                         accel_x: item.accel_x,
//                         accel_y: item.accel_y,
//                         accel_z: item.accel_z,
//                         gyro_x: item.gyro_x,
//                         gyro_y: item.gyro_y,
//                         gyro_z: item.gyro_z,
//                     };
//                 });
//
//                 setDados(dadosFormatados);
//             } catch (error) {
//                 console.error('Erro ao buscar dados:', error);
//             }
//         };
//
//         fetchDados();
//     }, []);
//
//     return (
//         <div className="p-2 space-y-2">
//             <PageBreadcrumb
//                 items={
//                     [
//                         { label: "Home", href: "/home" },
//                         { label: "Gráficos" },
//                     ]
//                 }
//             />
//             {/* Card */}
//             <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//                 <div className="px-5 py-4 sm:px-6 sm:py-5">
//                     <div className="flex items-center justify-between">
//                         <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
//                             <LineChartIcon className="w-5 h-5"/>
//                             Listagem de gráficos
//                         </h3>
//                     </div>
//                 </div>
//                 <div className={`border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6`}>
//                     <div className="w-full p-4 space-y-10">
//                         <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
//                             Gráficos de Sensor
//                         </h1>
//
//                         {/* Gráfico de Aceleração */}
//                         <div className="w-full h-[400px]">
//                             <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
//                                 Aceleração (X, Y, Z)
//                             </h2>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={dados}>
//                                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                     <XAxis dataKey="tempo" tick={{ fontSize: 10 }} />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Line type="monotone" dataKey="accel_x" stroke="#6366f1" dot={false} strokeWidth={2} />
//                                     <Line type="monotone" dataKey="accel_y" stroke="#22c55e" dot={false} strokeWidth={2} />
//                                     <Line type="monotone" dataKey="accel_z" stroke="#f59e0b" dot={false} strokeWidth={2} />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>
//
//                         {/* Gráfico de Giroscópio */}
//                         <div className="w-full h-[400px]">
//                             <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
//                                 Giroscópio (X, Y, Z)
//                             </h2>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart data={dados}>
//                                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                     <XAxis dataKey="tempo" tick={{ fontSize: 10 }} />
//                                     <YAxis />
//                                     <Tooltip />
//                                     <Legend />
//                                     <Line type="monotone" dataKey="gyro_x" stroke="#ef4444" dot={false} strokeWidth={2} />
//                                     <Line type="monotone" dataKey="gyro_y" stroke="#06b6d4" dot={false} strokeWidth={2} />
//                                     <Line type="monotone" dataKey="gyro_z" stroke="#8b5cf6" dot={false} strokeWidth={2} />
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Grafico;


'use client'

import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Plus, LineChart} from "lucide-react";

const Grafico = () => {
    const [optionAccel, setOptionAccel] = useState(null)
    const [optionGyro, setOptionGyro] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://20.201.114.238/dado-sensor/teste/26')
            const data = await response.json()

            const labels = []
            const accelX = [], accelY = [], accelZ = []
            const gyroX = [], gyroY = [], gyroZ = []

            data.forEach(item => {
                const t = new Date(item.tempo)
                const label = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`
                labels.push(label)

                accelX.push(item.accel_x)
                accelY.push(item.accel_y)
                accelZ.push(item.accel_z)

                gyroX.push(item.gyro_x)
                gyroY.push(item.gyro_y)
                gyroZ.push(item.gyro_z)
            })

            const commonOptions = {
                tooltip: { trigger: 'axis' },
                legend: {
                    top: 'top',
                    right: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: labels,
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        throttle: 50, // melhora performance
                    },
                    {
                        type: 'slider',
                        show: true,
                        height: 20,
                        bottom: 10,
                    }
                ],
                toolbox: {
                    feature: {
                        restore: { title: 'Resetar', show: true }
                    },
                    top: 10,
                    right: 20
                },
            }

            setOptionAccel({
                ...commonOptions,
                title: { text: 'Acelerômetro', left: 'left' },
                series: [
                    { name: 'Accel X', type: 'line', data: accelX, smooth: true },
                    { name: 'Accel Y', type: 'line', data: accelY, smooth: true },
                    { name: 'Accel Z', type: 'line', data: accelZ, smooth: true }
                ]
            })

            setOptionGyro({
                ...commonOptions,
                title: { text: 'Giroscópio', left: 'left' },
                series: [
                    { name: 'Gyro X', type: 'line', data: gyroX, smooth: true },
                    { name: 'Gyro Y', type: 'line', data: gyroY, smooth: true },
                    { name: 'Gyro Z', type: 'line', data: gyroZ, smooth: true }
                ]
            })
        }

        fetchData()
    }, [])

    return (
        <div className="p-2 space-y-2">
            <PageBreadcrumb
                items={
                    [
                        { label: "Home", href: "/home" },
                        { label: "Gráficos" },
                    ]
                }
            />
            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <LineChart className="w-5 h-5"/>
                            Listagem de gráficos
                        </h3>
                    </div>
                </div>
                <div className={`border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6`}>
                    {optionAccel && <ReactECharts option={optionAccel} style={{ height: 400 }} />}
                    {optionGyro && <ReactECharts option={optionGyro} style={{ height: 400 }} />}
                </div>
            </div>
        </div>
    )
}
export default Grafico
