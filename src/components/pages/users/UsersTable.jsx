import React, {useEffect, useState} from "react";
import {generateColumns} from "@/components/datatable/GenerateColumns";
import DataTable from "@/components/datatable/DataTable";
import {useRouter} from "next/navigation";
import {Search} from "lucide-react";

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
        { accessorKey: 'firstName', title: 'Nome', enableSorting: true },
        { accessorKey: 'lastName', title: 'Sobrenome' },
        { accessorKey: 'email', title: 'Email' },
        { accessorKey: 'age', title: 'Idade', enableSorting: true },
        {
            accessorKey: 'actions',
            title: 'Ações',
            cell: ({ row }) => {
                const router = useRouter();
                const id = row.original.id;

                return (
                <button
                    onClick={() => router.push(`/users/profile/${id}`)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
                    <Search size={14} />
                    Visualizar
                </button>
                );
            },
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const endpoint = search
                    ? 'https://dummyjson.com/users/search'
                    : 'https://dummyjson.com/users';

                const params = new URLSearchParams({
                    limit: pageSize.toString(),
                    skip: (pageIndex * pageSize).toString(),
                });

                if (search) {
                    params.set('q', search);
                }

                if (sortBy && sortDir) {
                    params.set('sortBy', sortBy);
                    params.set('order', sortDir);
                }

                const url = `${endpoint}?${params.toString()}`;
                const res = await fetch(url);
                const json = await res.json();

                setData(json.users);
                setTotal(json.total);
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