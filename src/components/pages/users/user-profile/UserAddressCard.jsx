"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import {Pencil} from "lucide-react";

export default function UserAddressCard({ user }) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    // lógica de salvar
    console.log("Salvando alterações...");
    closeModal();
  };

  return (
      <>
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                Endereço
              </h4>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    País
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.address?.country || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    Cidade/Estado
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.address?.city || "N/A"},{" "}
                    {user?.address?.state || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    CEP
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.address?.postalCode || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                    CPF/CNPJ
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {user?.taxId || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <Pencil className="w-4 h-4"/>
              Editar
            </button>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div
              className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar endereço
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Atualize seus dados para manter seu perfil atualizado.
              </p>
            </div>

            <form className="flex flex-col">
              <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>País</Label>
                    <Input type="text" defaultValue={user?.address?.country}/>
                  </div>
                  <div>
                    <Label>Cidade/Estado</Label>
                    <Input
                        type="text"
                        defaultValue={`${user?.address?.city}, ${user?.address?.state}`}
                    />
                  </div>
                  <div>
                    <Label>CEP</Label>
                    <Input type="text" defaultValue={user?.address?.postalCode}/>
                  </div>
                  <div>
                    <Label>CPF/CNPJ</Label>
                    <Input type="text" defaultValue={user?.taxId}/>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Salvar alterações
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </>
  );
}
