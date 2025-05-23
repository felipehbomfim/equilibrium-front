import { Users, ClipboardCheck } from "lucide-react";

export const TotalUserAndEvaluations = ({ totalUser, totalEvaluations }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {/* Usuários */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {/* Ícone de fundo */}
                <div className="absolute right-4 bottom-4 opacity-10 text-blue-400 dark:text-blue-600">
                    <Users size={80} />
                </div>

                {/* Ícone principal */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 z-10">
                    <Users size={22} />
                </div>

                <div className="mt-5 z-10 relative">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuários</p>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">{totalUser}</h4>
                </div>
            </div>

            {/* Avaliações */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                {/* Ícone de fundo */}
                <div className="absolute right-4 bottom-4 opacity-10 text-green-400 dark:text-green-600">
                    <ClipboardCheck size={80} />
                </div>

                {/* Ícone principal */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 z-10">
                    <ClipboardCheck size={22} />
                </div>

                <div className="mt-5 z-10 relative">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avaliações</p>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">{totalEvaluations}</h4>
                </div>
            </div>
        </div>
    );
};
