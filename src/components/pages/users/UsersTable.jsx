import React, {useEffect, useState} from "react";
import {generateColumns} from "@/components/datatable/GenerateColumns";
import DataTable from "@/components/datatable/DataTable";
import {useRouter} from "next/navigation";
import {Search} from "lucide-react";
import {api} from "@/services/apiPerson";

export default function UsersTable() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(null); // ex: 'name'
    const [sortDir, setSortDir] = useState(null); // 'asc' ou 'desc'
    const columns = generateColumns([
            {
                accessorKey: 'cpf',
                title: 'CPF',
                enableSorting: true,
                cell: ({ row }) => {
                    const cpf = row.original.cpf;
                    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
                },
            },
            {
                accessorKey: 'name',
                title: 'Nome',
                enableSorting: true,
            },
            {
                accessorKey: 'phone',
                title: 'Telefone',
            },
            {
                accessorKey: 'gender',
                title: 'Sexo',
                cell: ({ row }) => {
                    const gender = row.original.gender;
                    return gender === 'M' ? 'Masculino' : gender === 'F' ? 'Feminino' : gender;
                },
            },
            {
                accessorKey: 'profile',
                title: 'Perfil',
                enableSorting: true,
                cell: ({ row }) => {
                    const perfil = row.original.profile;
                    if (perfil === 'patient') return 'Paciente';
                    if (perfil === 'researcher') return 'Pesquisador';
                    if (perfil === 'healthProfessional') return 'Profissional de Saúde';
                    return perfil;
                },
            },
            {
                accessorKey: 'createdAt',
                title: 'Criado em',
                cell: ({ row }) => {
                    const date = new Date(row.original.createdAt);
                    return date.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                },
            },
        ]
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const pessoas = await api.getAllPersons();

                let filtradas = pessoas;
                if (search) {
                    const searchLower = search.toLowerCase();
                    filtradas = pessoas.filter((pessoa) =>
                        pessoa.name.toLowerCase().includes(searchLower) ||
                        pessoa.cpf.toLowerCase().includes(searchLower) ||
                        pessoa.profile.toLowerCase().includes(searchLower)
                    );
                }

                if (sortBy) {
                    filtradas.sort((a, b) => {
                        const aValue = a[sortBy];
                        const bValue = b[sortBy];
                        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
                        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
                        return 0;
                    });
                }

                const start = pageIndex * pageSize;
                const paginadas = filtradas.slice(start, start + pageSize);

                setData(paginadas);
                setTotal(filtradas.length);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageIndex, pageSize, search, sortBy, sortDir]);

    return (
        <DataTable
            data={data}
            columns={columns}
            total={total}
            pageIndex={pageIndex}
            pageSize={pageSize}
            onPageChange={setPageIndex}
            loading={loading}
            onPageSizeChange={size => {
                setPageSize(size);
                setPageIndex(0);
            }}
            onSearch={value => {
                setSearch(value);
                setPageIndex(0);
            }}
            sortBy={sortBy}
            sortDir={sortDir}
            onSortChange={(field, direction) => {
                setSortBy(field);
                setSortDir(direction);
            }}
        />
    );
}