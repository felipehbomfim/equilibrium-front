"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import { Pencil } from "lucide-react";

export default function UserMetaCard({ user }) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Alterações salvas!");
    closeModal();
  };

  return (
      <>
        <div className="border border-gray-200 rounded-2xl dark:border-gray-800">
          <div className="p-5 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between lg:p-6">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <Image
                    width={80}
                    height={80}
                    src={"/images/user/profile-pic.jpg"}
                    alt="Foto de perfil"
                />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {user?.firstName} {user?.lastName}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.company?.title || "Cargo indefinido"}
                  </p>
                  <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.address?.city}, {user?.address?.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
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
          <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Informações Pessoais
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Nome</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.firstName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Sobrenome</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.lastName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Telefone</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.phone}
                </p>
              </div>

              <div className="lg:col-span-2">
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Cargo</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user?.company?.title || "Não informado"}
                </p>
              </div>
            </div>
          </div>

        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div
              className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Editar Informações Pessoais
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Atualize seus dados para manter seu perfil atualizado.
              </p>
            </div>

            <form className="flex flex-col">
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Nome</Label>
                    <Input type="text" defaultValue={user?.firstName}/>
                  </div>
                  <div>
                    <Label>Sobrenome</Label>
                    <Input type="text" defaultValue={user?.lastName}/>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" defaultValue={user?.email}/>
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input type="text" defaultValue={user?.phone}/>
                  </div>
                  <div className="lg:col-span-2">
                    <Label>Cargo</Label>
                    <Input type="text" defaultValue={user?.company?.title || ""}/>
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
