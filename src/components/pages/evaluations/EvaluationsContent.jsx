'use client';

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Filter, List } from "lucide-react";
import EvallutionsTable from "@/components/pages/evaluations/EvaluationsTable";

export default function EvaluationsContent() {
    const [refreshKey, setRefreshKey] = useState(0);

    // 🎯 Novos filtros
    const [filterType, setFilterType] = useState('');
    const [filterApplicator, setFilterApplicator] = useState('');


    return (
        <div className="p-2 space-y-4">
            <PageBreadcrumb
                items={[
                    { label: "Home", href: "/home" },
                    { label: "Avaliações" },
                ]}
            />

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <Filter className="w-5 h-5" />
                            Filtros
                        </h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {/* Tipo de teste */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Tipo de Teste
                            </label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="block w-full rounded-lg border px-3 py-2 text-sm shadow-theme-xs dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                            >
                                <option value="">Todos</option>
                                <option value="TUG">TUG</option>
                                <option value="5TSTS">5TSTS</option>
                            </select>
                        </div>

                        {/* Aplicador */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Aplicador
                            </label>
                            <input
                                type="text"
                                placeholder="Digite o nome do aplicador"
                                value={filterApplicator}
                                onChange={(e) => setFilterApplicator(e.target.value)}
                                className="block w-full rounded-lg border px-3 py-2 text-sm shadow-theme-xs dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="flex items-center gap-2 text-base font-medium text-gray-800 dark:text-white/90">
                            <List className="w-5 h-5" />
                            Listagem de avaliações
                        </h3>
                    </div>

                    <EvallutionsTable
                        refreshKey={refreshKey}
                        filterType={filterType}
                        filterApplicator={filterApplicator}
                    />
                </div>
            </div>
        </div>
    );
}
