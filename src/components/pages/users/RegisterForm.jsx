'use client';

import React, { useState } from 'react';
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { api } from '@/services/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ onSuccess }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [perfil, setPerfil] = useState('');
    const [formData, setFormData] = useState({
        // Dados básicos (pessoa)
        nome: '',
        cpf: '',
        senha: '',
        telefone: '',
        sexo: '',
        // Dados específicos
        email: '',
        instituicao: '',
        area: '',
        especialidade: '',
        data_nascimento: '',
        escolaridade: '',
        nivel_socio_economico: '',
        peso: '',
        altura: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Primeiro, cadastra a pessoa
            const pessoaData = {
                nome: formData.nome,
                cpf: formData.cpf,
                senha: formData.senha,
                telefone: formData.telefone,
                sexo: formData.sexo,
                perfil
            };

            const pessoa = await api.cadastrarPessoa(pessoaData);

            // Depois, cadastra os dados específicos do perfil
            let perfilData = {};
            let endpoint = '';

             switch(perfil) {
            case 'pesquisador':
                endpoint = 'pesquisadores';
                perfilData = {
                    cpf_pesquisador: formData.cpf,
                    nome: formData.nome,
                    email: formData.email,
                    instituicao: formData.instituicao,
                    area: formData.area,
                    especialidade: formData.especialidade
                };
                break;
            case 'profissional':
                endpoint = 'profissionais';
                perfilData = {
                    cpf_profissional: formData.cpf,
                    nome: formData.nome,
                    email: formData.email,
                    especialidade: formData.especialidade
                };
                break;
            case 'paciente':
                endpoint = 'pacientes';
                perfilData = {
                    cpf_paciente: formData.cpf,
                    data_nascimento: formData.data_nascimento,
                    escolaridade: formData.escolaridade,
                    nivel_socio_economico: formData.nivel_socio_economico,
                    peso: parseFloat(formData.peso),
                    altura: parseFloat(formData.altura),
                    queda: false
                };
                break;
        }

        await api.cadastrarPerfil(endpoint, perfilData);
            
            toast.success('Usuário cadastrado com sucesso!');

            setPerfil('');
            setFormData({
                nome: '',
                cpf: '',
                senha: '',
                telefone: '',
                sexo: '',
                email: '',
                instituicao: '',
                area: '',
                especialidade: '',
                data_nascimento: '',
                escolaridade: '',
                nivel_socio_economico: '',
                peso: '',
                altura: ''
            });
            
            if (onSuccess) {
                onSuccess(); // Fecha a modal se estiver em uma
            } else {
                router.push('/users'); // Comportamento padrão
            }
        } catch (error) {
            toast.error('Erro ao cadastrar usuário');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seleção de Perfil */}
            <div>
                <Label>Tipo de Usuário <span className="text-error-500">*</span></Label>
                <select
                    name="perfil"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-500"
                    required
                >
                    <option value="">Selecione um tipo</option>
                    <option value="pesquisador">Pesquisador</option>
                    <option value="profissional">Profissional</option>
                    <option value="paciente">Paciente</option>
                </select>
            </div>

            {/* Campos Básicos */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <Label>Nome <span className="text-error-500">*</span></Label>
                    <Input
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>CPF <span className="text-error-500">*</span></Label>
                    <Input
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>Senha <span className="text-error-500">*</span></Label>
                    <Input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label>Telefone</Label>
                    <Input
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label>Sexo <span className="text-error-500">*</span></Label>
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 focus:border-brand-500 focus:ring-brand-500"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
            </div>

            {/* Campos específicos por perfil */}
            {perfil && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Campos para Pesquisador e Profissional */}
                    {(perfil === 'pesquisador' || perfil === 'profissional') && (
                        <>
                            <div>
                                <Label>Email <span className="text-error-500">*</span></Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Especialidade <span className="text-error-500">*</span></Label>
                                <Input
                                    name="especialidade"
                                    value={formData.especialidade}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Campos específicos para Pesquisador */}
                    {perfil === 'pesquisador' && (
                        <>
                            <div>
                                <Label>Instituição <span className="text-error-500">*</span></Label>
                                <Input
                                    name="instituicao"
                                    value={formData.instituicao}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Área <span className="text-error-500">*</span></Label>
                                <Input
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Campos específicos para Paciente */}
                    {perfil === 'paciente' && (
                        <>
                            <div>
                                <Label>Data de Nascimento <span className="text-error-500">*</span></Label>
                                <Input
                                    type="date"
                                    name="data_nascimento"
                                    value={formData.data_nascimento}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Escolaridade <span className="text-error-500">*</span></Label>
                                <Input
                                    name="escolaridade"
                                    value={formData.escolaridade}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Nível Socioeconômico <span className="text-error-500">*</span></Label>
                                <Input
                                    name="nivel_socio_economico"
                                    value={formData.nivel_socio_economico}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Peso (kg) <span className="text-error-500">*</span></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="peso"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Altura (m) <span className="text-error-500">*</span></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="altura"
                                    value={formData.altura}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto"
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
            </div>
        </form>
    );
} 