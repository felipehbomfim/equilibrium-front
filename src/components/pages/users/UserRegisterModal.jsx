'use client';

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import RegisterForm from "./RegisterForm";
import { Plus } from "lucide-react";

export default function UserRegisterModal() {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[900px] m-4">
                <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Cadastrar novo usuário
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Preencha os dados para concluir o cadastro.
                        </p>
                    </div>

                    <RegisterForm onSuccess={closeModal} />
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