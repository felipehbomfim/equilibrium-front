'use client'

import React, {useEffect, useMemo, useState} from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { LineChart, ArrowLeft } from "lucide-react";
import ReactECharts from 'echarts-for-react';
import { api } from "@/services/apiEvaluations";
import T5STSChart from "@/components/pages/evaluations/sensor-data/5TSTSChart";
import {RadarChart} from "@/components/pages/evaluations/sensor-data/RadarChart";
import {HeatmapChart} from "@/components/pages/evaluations/sensor-data/HeatmapChart";

export default function SensorDataPage() {
    const { id } = useParams();
    const router = useRouter();
    const [noData, setNoData] = useState(false);
    const [evaluationDetails, setEvaluationDetails] = useState(null);
    const [labelColor, setLabelColor] = useState('#000');
    const [sensorData, setSensorData] = useState([]);

    const updateLabelColor = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setLabelColor(isDark ? '#fff' : '#000');
    };

    const indicadoresRadar = useMemo(() => calcularIndicadores(sensorData), [sensorData]);

    useEffect(() => {
        updateLabelColor();
        const observer = new MutationObserver(updateLabelColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getSensorData(id);
                const details = await api.getEvaluationDetails(id);
                setEvaluationDetails(details);
                setSensorData(data);
                if (!data || data.length === 0) setNoData(true);
            } catch (err) {
                console.error(err);
                setNoData(true);
            }
        };
        if (id) fetchData();
    }, [id]);


    const chartOptions = useMemo(() => {
        if (!sensorData.length) return { accel: null, gyro: null };

        const labels = [], accelX = [], accelY = [], accelZ = [], gyroX = [], gyroY = [], gyroZ = [];

        sensorData.forEach(item => {
            const t = new Date(item.time);
            const label = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}:${t.getSeconds().toString().padStart(2, '0')}`;
            labels.push(label);
            accelX.push(item.accel_x);
            accelY.push(item.accel_y);
            accelZ.push(item.accel_z);
            gyroX.push(item.gyro_x);
            gyroY.push(item.gyro_y);
            gyroZ.push(item.gyro_z);
        });

        const baseOptions = {
            tooltip: { trigger: 'axis' },
            legend: { top: 'top', right: 'center', textStyle: { color: labelColor } },
            xAxis: {
                type: 'category',
                data: labels,
                boundaryGap: false,
                axisLabel: { color: labelColor },
            },
            yAxis: {
                type: 'value',
                splitLine: { show: true, lineStyle: { type: 'dashed' } },
                axisLabel: { color: labelColor },
            },
            dataZoom: [
                { type: 'inside', throttle: 50 },
                { type: 'slider', height: 20, bottom: 10 }
            ],
            toolbox: {
                feature: { restore: { title: 'Resetar', show: true } },
                top: 10,
                right: 20,
            },
            backgroundColor: 'transparent',
            textStyle: { color: labelColor },
        };

        return {
            accel: {
                ...baseOptions,
                title: { text: 'Acelerômetro', left: 'left', textStyle: { color: labelColor } },
                series: [
                    { name: 'Accel X', type: 'line', data: accelX, smooth: true },
                    { name: 'Accel Y', type: 'line', data: accelY, smooth: true },
                    { name: 'Accel Z', type: 'line', data: accelZ, smooth: true },
                ]
            },
            gyro: {
                ...baseOptions,
                title: { text: 'Giroscópio', left: 'left', textStyle: { color: labelColor } },
                series: [
                    { name: 'Gyro X', type: 'line', data: gyroX, smooth: true },
                    { name: 'Gyro Y', type: 'line', data: gyroY, smooth: true },
                    { name: 'Gyro Z', type: 'line', data: gyroZ, smooth: true },
                ]
            },
        };
    }, [sensorData, labelColor]);

    const InfoItem = ({ label, value }) => (
        <div>
            <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value ?? "Sem informações"}</p>
        </div>
    );

    function formatCpf(value) {
        if (!value) return '';
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    const formatDateBr = (dateStr) => {
        if (!dateStr) return 'Sem informação';
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR');
    };

    function calcularIndicadores(sensorData) {
        if (!sensorData.length) return null;

        const accelNorm = sensorData.map(d => Math.sqrt(
            d.accel_x ** 2 + d.accel_y ** 2 + d.accel_z ** 2
        ));

        const potencia = Math.sqrt(accelNorm.reduce((acc, v) => acc + v ** 2, 0) / accelNorm.length);
        const fadiga = Math.sqrt(accelNorm.reduce((acc, v) => acc + (v - (accelNorm.reduce((a, b) => a + b, 0) / accelNorm.length)) ** 2, 0) / accelNorm.length);

        const simetria = Math.abs(
            sensorData.filter(d => d.accel_x >= 0).length - sensorData.filter(d => d.accel_x < 0).length
        ) / sensorData.length;

        const t0 = new Date(sensorData[0].time).getTime();
        const tN = new Date(sensorData[sensorData.length - 1].time).getTime();
        const tempo = (tN - t0) / 1000; // segundos

        return [
            { name: 'Tempo', value: tempo, maxValue: 60 },
            { name: 'Potência', value: potencia, maxValue: 20 },
            { name: 'Fadiga', value: fadiga, maxValue: 10 },
            { name: 'Simetria', value: simetria * 10, maxValue: 10 },
        ];
    }


    function calcularIdadeAnos(nascimento, dataRef) {
        const nasc = new Date(nascimento);
        const ref = new Date(dataRef);
        let idade = ref.getFullYear() - nasc.getFullYear();
        const m = ref.getMonth() - nasc.getMonth();
        if (m < 0 || (m === 0 && ref.getDate() < nasc.getDate())) idade--;
        return idade;
    }

    function tempoStringParaSegundos(tempoStr) {
        const [h, m, s] = tempoStr.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    }

    function tempoStringParaMinutos(tempoStr) {
        return tempoStringParaSegundos(tempoStr) / 60;
    }

    return (
        <div className="p-2 space-y-4">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Avaliações", href: "/evaluations" },
                    { label: "Dados dos sensores" },
                ]}
            />
            <a
                href="/evaluations"
                className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar
            </a>

            {evaluationDetails && (
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white/90">Informações da Avaliação</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3 2xl:gap-x-32">
                            <InfoItem label="Tipo" value={evaluationDetails.type} />
                            <InfoItem label="Data" value={new Date(evaluationDetails.date).toLocaleString('pt-BR')} />
                            <InfoItem label="Tempo Total" value={evaluationDetails.totalTime} />
                            <InfoItem label="Unidade de Saúde" value={evaluationDetails.healthUnit?.name} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white/90">Informações do Paciente</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3 2xl:gap-x-32">
                            <InfoItem label="Nome" value={evaluationDetails.patient?.name} />
                            <InfoItem label="CPF" value={formatCpf(evaluationDetails?.cpfPatient)} />
                            <InfoItem label="Sexo" value={evaluationDetails.patient?.gender === 'M' ? 'Masculino' : 'Feminino'} />
                            <InfoItem label="Data de Nascimento" value={formatDateBr(evaluationDetails.patient?.dateOfBirth)} />
                            <InfoItem label="Peso" value={evaluationDetails.patient?.weight ? `${evaluationDetails.patient.weight} kg` : undefined} />
                            <InfoItem label="Altura" value={evaluationDetails.patient?.height ? `${evaluationDetails.patient.height} cm` : undefined} />
                            <InfoItem label="Telefone" value={evaluationDetails.patient?.phone ? `${evaluationDetails.patient.phone}` : undefined} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white/90">Informações do Profissional</h4>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-3 2xl:gap-x-32">
                            <InfoItem label="Nome" value={evaluationDetails.healthProfessional?.name} />
                            <InfoItem label="CPF" value={formatCpf(evaluationDetails?.cpfHealthProfessional)} />
                            <InfoItem label="E-mail" value={evaluationDetails.healthProfessional?.email} />
                            <InfoItem label="Telefone" value={evaluationDetails.healthProfessional?.phone} />
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <LineChart className="w-5 h-5" />
                            Dados de Sensores
                        </h3>
                    </div>
                </div>

                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    {noData ? (
                        <p className="text-center text-gray-600 dark:text-gray-300 py-10">
                            Dados dos sensores não encontrados.
                        </p>
                    ) : (
                        <>
                            {chartOptions.accel && (
                                <div className="p-10">
                                    <ReactECharts option={chartOptions.accel} style={{ height: 400 }} />
                                </div>
                            )}
                            {chartOptions.gyro && (
                                <div className="border-t border-gray-200 p-5 dark:border-gray-600 sm:p-10 ">
                                    <ReactECharts option={chartOptions.gyro} style={{ height: 400 }} />
                                </div>
                            )}
                            {evaluationDetails && evaluationDetails.patient?.dateOfBirth && evaluationDetails.date && evaluationDetails?.type === '5TSTS' && (
                                <div className="border-t border-gray-200 p-5 dark:border-gray-600 sm:p-10 ">
                                    <T5STSChart
                                        idadePaciente={calcularIdadeAnos(evaluationDetails.patient.dateOfBirth, evaluationDetails.date)}
                                        tempoPaciente={tempoStringParaMinutos(evaluationDetails.totalTime)}
                                        sexo={evaluationDetails.patient.gender}
                                        labelColor={labelColor}
                                    />
                                </div>
                            )}
                            {indicadoresRadar && (
                                <div className="border-t border-gray-200 p-5 dark:border-gray-600 sm:p-10 ">
                                    <RadarChart indicators={indicadoresRadar} labelColor={labelColor} />
                                </div>
                            )}
                            {sensorData && (
                                <div className="border-t border-gray-200 p-5 dark:border-gray-600 sm:p-10 ">
                                    <HeatmapChart data={sensorData} labelColor="#000" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
