'use client';

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import RegisterForm from "./RegisterForm";
import { Plus } from "lucide-react";

export default function UserRegisterModal({ onSuccess }) {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[900px] m-4">
                <div className="w-full max-w-[900px] rounded-3xl bg-white dark:bg-gray-900 p-4 lg:p-6">
                    <div className="px-2 mb-4">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                            Cadastrar novo usuário
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Preencha os dados para concluir o cadastro.
                        </p>
                    </div>

                    <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                        <RegisterForm
                            onSuccess={() => {
                                onSuccess?.();
                                closeModal();
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
                <Plus className="w-4 h-4" />
                Adicionar
            </button>
        </>
    );
}