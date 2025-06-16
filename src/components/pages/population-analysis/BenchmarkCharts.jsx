'use client';

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/services/apiEvaluations';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Users } from 'lucide-react';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

export default function PopulationAnalysisPage() {
    const [evaluations, setEvaluations] = useState([]);
    const [sensorDataByEval, setSensorDataByEval] = useState({});
    const [loading, setLoading] = useState(true);
    const groupedBySex = useMemo(() => groupBy(evaluations, e => e.patient?.gender || 'Indefinido'), [evaluations]);
    const groupedByAge = useMemo(() => groupBy(evaluations, e => {
        const birth = e.patient?.dateOfBirth;
        if (!birth) return 'Indefinido';
        const age = getAgeFromBirth(birth);
        return getAgeGroup(age);
    }), [evaluations]);
    const sexKeys = Object.keys(groupedBySex);
    const sexColors = {
        F: '#e74c3c', // vermelho
        M: '#3498db', // azul
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const allEvaluations = await api.getEvaluations();
                setEvaluations(allEvaluations);

                const sensorMap = Object.fromEntries(
                    allEvaluations.map(e => [e.id, e.sensorData])
                );

                setSensorDataByEval(sensorMap);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    function getAgeFromBirth(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getAgeGroup(age) {
        if (age < 20) return '0-19';
        if (age < 40) return '20-39';
        if (age < 60) return '40-59';
        return '60+';
    }

    function groupBy(arr, keyGetter) {
        return arr.reduce((acc, item) => {
            const key = typeof keyGetter === 'function' ? keyGetter(item) : item[keyGetter];
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    function getAverageTime(evals, sensorData) {
        let total = 0;
        let count = 0;
        for (const e of evals) {
            if (!sensorData[e.id] || !e.totalTime) continue;
            const parts = e.totalTime.split(':').map(Number);
            const seconds = parts?.[1] ?? 0;
            total += seconds;
            count++;
        }
        return count ? parseFloat((total / count).toFixed(2)) : 0;
    }

    function getRadarValues(evals, sensorData) {
        let total = { tempo: 0, potencia: 0, fadiga: 0 };
        let count = 0;

        for (const e of evals) {
            const data = sensorData[e.id];
            if (!Array.isArray(data) || data.length < 2 || !e.totalTime) continue;

            const t = e.totalTime.split(':').map(Number)[1] || 0;
            const A1 = Math.sqrt(data[0].accel_x ** 2 + data[0].accel_y ** 2 + data[0].accel_z ** 2);
            const A5 = Math.sqrt(data[data.length - 1].accel_x ** 2 + data[data.length - 1].accel_y ** 2 + data[data.length - 1].accel_z ** 2);
            const fadiga = ((A1 - A5) / A1) * 100;
            const potencia = (0.4 * 9.8) / t;

            total.tempo += t;
            total.potencia += potencia;
            total.fadiga += fadiga;
            count++;
        }

        return count > 0 ? [
            parseFloat((total.tempo / count).toFixed(2)),
            parseFloat((total.potencia / count).toFixed(2)),
            parseFloat((total.fadiga / count).toFixed(2)),
        ] : [0, 0, 0];
    }

    const optionBar = {
        title: {
            text: 'Tempo médio por sexo',
            left: 'center',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: sexKeys,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Tempo médio (s)',
                type: 'bar',
                data: sexKeys.map(sex => ({
                    value: getAverageTime(groupedBySex[sex], sensorDataByEval),
                    itemStyle: {
                        color: sexColors[sex] || '#95a5a6',
                    },
                })),
            },
        ],
    };

    const optionRadar = {
        title: {
            text: 'Indicadores médios por faixa etária',
            left: 'center',
            top: 0,
        },
        tooltip: {},
        legend: {
            data: Object.keys(groupedByAge),
            top: 100,
        },
        radar: {
            indicator: [
                { name: 'Tempo', max: 20 },
                { name: 'Potência', max: 5 },
                { name: 'Fadiga', max: 100 },
            ],
        },
        series: [
            {
                type: 'radar',
                data: Object.entries(groupedByAge).map(([ageGroup, group]) => ({
                    value: getRadarValues(group, sensorDataByEval),
                    name: ageGroup,
                })),
            },
        ],
    };

    if (loading) {
        return <div className="p-4">Carregando análise da população...</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="rounded-xl bg-white dark:bg-white/[0.02] p-4 border border-gray-200 dark:border-gray-800">
                <ReactECharts option={optionBar} style={{ height: 400 }} />
            </div>
            <div className="rounded-xl bg-white dark:bg-white/[0.02] p-4 border border-gray-200 dark:border-gray-800">
                <ReactECharts option={optionRadar} style={{ height: 400 }} />
            </div>
        </div>
    );
}
