'use client';

import { Users, Home as HomeIcon } from 'lucide-react';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function HomePage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            {/* Título + Ações */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-gray-800 dark:text-white/90">
                    <HomeIcon className="w-5 h-5" />
                    <h1 className="text-2xl font-bold">Página Inicial</h1>
                </div>

                <button className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
                    <Users className="h-4 w-4" />
                    Ação Rápida
                </button>
            </div>




            {/* Conteúdo principal */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Conteúdo</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                </p>
            </section>
        </div>
    );
}
