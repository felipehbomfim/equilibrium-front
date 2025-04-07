"use client";
import React from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import {Pencil} from 'lucide-react';

export default function UserInfoCard({ user }) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar dados
    console.log("Alterações salvas...");
    closeModal();
  };

  return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
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
      </div>
  );
}
