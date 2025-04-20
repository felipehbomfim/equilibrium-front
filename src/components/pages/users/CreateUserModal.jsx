"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Plus } from "lucide-react";

export default function CreateUserModal() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreate = () => {
    console.log("Usuário criado com sucesso!");
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Criar Novo Usuário
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Preencha os campos para cadastrar um novo usuário no sistema.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <Label>Nome</Label>
                  <Input type="text" placeholder="Digite o nome" />
                </div>
                <div className="lg:col-span-2">
                  <Label>CPF</Label>
                  <Input type="text" placeholder="Digite o cpf" />
                </div>
                <div className="lg:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Digite o email" />
                </div>
                <div className="lg:col-span-2">
                  <Label>Senha</Label>
                  <Input type="text" placeholder="Digite a senha" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleCreate}>
                Criar Usuário
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Botão que dispara o modal */}
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
