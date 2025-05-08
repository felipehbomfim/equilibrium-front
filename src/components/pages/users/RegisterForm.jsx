'use client';

import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import Radio from '@/components/form/input/Radio';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import Button from '@/components/ui/button/Button';
import { useState } from 'react';
import AddressForm from "@/components/form/AdressForm";
import InputField from "@/components/pages/users/components/InputField";
import {Pessoa} from "@/models/Pessoa";
import {api} from "@/services/apiPerson";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import { InputMask } from '@react-input/mask';
import {Paciente} from "@/models/Paciente";
import {Pesquisador} from "@/models/Pesquisador";

export default function RegisterForm({ onSuccess }) {
    const [perfil, setPerfil] = useState('pesquisador');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        control,
        register,
        setValue,
        watch,
        reset,
        getValues,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
        defaultValues: {
            cpf: '',
            telefone: '',
            perfil: 'pesquisador'
        }
    });

    // 🛠 Função para calcular idade
    const calcularIdade = (dataNascimento) => {
        if (!dataNascimento) return null;
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = await trigger();

        if (!isValid) {
            setLoading(false);
            return;
        }

        const formData = getValues();

        try {
            const pessoa = new Pessoa(formData, perfil);
            const pessoaPayload = {
                ...pessoa.toJSON(),
                institution: formData.instituicao,
                fieldOfStudy: formData.area,
                expertise: formData.especialidade,
                dateOfBirth: formData.data_nascimento,
                educationLevel: formData.escolaridade,
                socioeconomicStatus: formData.nivel_socio_economico,
                cep: formData.address_cep,
                street: formData.street,
                number: formData.number,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state,
                weight: formData.peso ? parseFloat(formData.peso) : null,
                height: formData.altura ? parseFloat(formData.altura) : null,
                age: formData.data_nascimento ? calcularIdade(formData.data_nascimento) : null,
                downFall: formData.queda ? formData.queda === 'true' : null,
            };
            await api.createPerson(pessoaPayload);
            toast.success('Usuário cadastrado com sucesso!');
            reset();

            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/users');
            }
        } catch (error) {
            toast.error(`Erro ao cadastrar usuário : ${error}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmitForm} className="space-y-6">
            {/* Perfil */}
            <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Tipo de Usuário <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 justify-evenly">
                    {['pesquisador', 'profissional', 'paciente'].map((tipo) => (
                        <Radio
                            key={tipo}
                            name="perfil"
                            value={tipo}
                            label={tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            checked={perfil === tipo}
                            onChange={() => {
                                setPerfil(tipo);
                                setValue('perfil', tipo);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Dados Comuns */}
            <div className="grid md:grid-cols-2 gap-6">
                <InputField name="nome" label="Nome" required register={register} errors={errors} />
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">CPF <span className="text-red-500">*</span></label>
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => (
                            <InputMask
                                {...field}
                                mask="___.___.___-__"
                                replacement={{ _: /\d/ }}
                                value={field.value ?? ''}
                                placeholder="CPF"
                                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700"
                            />
                        )}
                    />
                    {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf.message}</span>}
                </div>

                <InputField name="senha" type="password" label="Senha" required register={register} errors={errors} />
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Telefone</label>
                    <Controller
                        name="telefone"
                        control={control}
                        render={({ field }) => (
                            <InputMask
                                {...field}
                                value={field.value ?? ''}
                                mask="(__) _____-____"
                                replacement={{ _: /\d/ }}
                                placeholder="Telefone"
                                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700"
                            />
                        )}
                    />
                    {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone.message}</span>}
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Sexo <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <Radio name="sexo" value="M" label="Masculino" checked={watch("sexo") === "M"} onChange={() => setValue("sexo", "M")} />
                        <Radio name="sexo" value="F" label="Feminino" checked={watch("sexo") === "F"} onChange={() => setValue("sexo", "F")} />
                    </div>
                    {errors.sexo && <span className="text-red-500 text-sm">{errors.sexo.message}</span>}
                </div>
            </div>

            {/* Dados específicos */}
            {perfil === 'pesquisador' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="email" label="Email" required register={register} errors={errors} />
                    <InputField name="especialidade" label="Especialidade" required register={register} errors={errors} />
                    <InputField name="instituicao" label="Instituição" required register={register} errors={errors} />
                    <InputField name="area" label="Área" required register={register} errors={errors} />
                </div>
            )}

            {perfil === 'profissional' && (
                <div className="grid md:grid-cols-2 gap-6">
                    <InputField name="email" label="Email" required register={register} errors={errors} />
                    <InputField name="especialidade" label="Especialidade" required register={register} errors={errors} />
                </div>
            )}

            {perfil === 'paciente' && (
                <>
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField name="email" label="Email" required register={register} errors={errors} />
                        <InputField name="data_nascimento" type="date" label="Data de Nascimento" required register={register} errors={errors} />
                        <InputField name="escolaridade" label="Escolaridade" required register={register} errors={errors} />
                        <InputField name="nivel_socio_economico" label="Nível Socioeconômico" required register={register} errors={errors} />
                        <InputField name="peso" type="number" step="0.01" label="Peso (kg)" required register={register} errors={errors} />
                        <InputField name="altura" type="number" step="0.01" label="Altura (m)" required register={register} errors={errors} />
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Histórico de Queda <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-4">
                                <Radio
                                    name="queda"
                                    value="false"
                                    label="Não"
                                    checked={watch('queda') === 'false'}
                                    onChange={() => setValue('queda', 'false')}
                                />
                                <Radio
                                    name="queda"
                                    value="true"
                                    label="Sim"
                                    checked={watch('queda') === 'true'}
                                    onChange={() => setValue('queda', 'true')}
                                />
                            </div>
                            {errors.queda && <span className="text-red-500 text-sm">{errors.queda.message}</span>}
                        </div>
                    </div>

                    <AddressForm register={register} errors={errors} setValue={setValue} watch={watch} control={control}/>
                </>
            )}

            <div className="flex justify-end">
                <Button type="submit" className="w-full sm:w-auto">Cadastrar</Button>
            </div>
        </form>
    );
}
