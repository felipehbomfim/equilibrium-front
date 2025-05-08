'use client';

import { Users } from 'lucide-react';
import UsersTable from "./UsersTable";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserRegisterModal from './UserRegisterModal';
import {useState} from "react";

export default function UsersContent() {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="p-2 space-y-2">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Usuários" },
                ]}
            />
            
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <Users className="w-5 h-5"/>
                            Listagem de usuários
                        </h3>
                        <UserRegisterModal
                            onSuccess={() => {
                                setRefreshKey(prev => prev + 1);
                            }}
                        />
                    </div>
                </div>
                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <UsersTable refreshKey={refreshKey} />
                </div>
            </div>
        </div>
    );
}