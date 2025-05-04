'use client';

import {useParams, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import UserMetaCard from '@/components/pages/users/user-profile/UserMetaCard';
import UserAddressCard from '@/components/pages/users/user-profile/UserAddressCard';
import {Skeleton} from "@mui/material";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ArrowLeft} from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/services/apiPerson";

export default function ProfilePage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") return;

        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userId = id != "me" ? id : session?.user?.id;
                console.log(userId);
                if (!userId) return;
                const response = await api.getPerson(userId);
                console.log(response);
                setUser(response);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id, session, status]);

    if (loading) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 xl:p-7.5">
                <Skeleton className="w-1/3 h-6 mb-6" />
                <div className="space-y-6">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (!user) return <p className="text-center py-10">Usuário não encontrado</p>;
    return (
        <div>
            <PageBreadcrumb
                items={
                    id !== "me"
                        ? [
                            { label: "Home", href: "/home" },
                            { label: "Usuários", href: "/users" },
                            { label: "Visualizar perfil" },
                        ]
                        : [
                            { label: "Home", href: "/home" },
                            { label: "Meu perfil" },
                        ]
                }
            />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 xl:p-7.5">
                {id !== 'me' && (
                    <button
                        onClick={() => router.back()}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                    </button>
                )}

                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Dados do usuário
                </h3>

                <div className="space-y-6">
                    <UserMetaCard user={user}/>
                    <UserAddressCard user={user}/>
                </div>
            </div>
        </div>
    );
}

