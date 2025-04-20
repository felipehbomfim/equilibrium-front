"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Plus } from "lucide-react";

// Schema de validação com base no tipo de usuário
const schemaProfessor = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

const schemaPaciente = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
  nascimento: yup.string().required("Data de nascimento é obrigatória"),
  altura: yup.string().required("Altura é obrigatória"),
  peso: yup.string().required("Peso é obrigatório"),
  atividadeFisica: yup.string().required("Informe se pratica atividade física"),
  cardio: yup.string().required("Informe se possui doenças cardio-respiratórias"),
  osseo: yup.string().required("Informe se possui problemas ósseos"),
  deficiencia: yup.string().required("Informe sobre deficiência física"),
  vezesSemana: yup.string().when("atividadeFisica", {
    is: "Sim",
    then: () => yup.string().required("Informe quantas vezes por semana"),
    otherwise: () => yup.string().notRequired(),
  }),
});

export default function CreateUserModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const [userType, setUserType] = useState("professor");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    resolver: yupResolver(userType === "professor" ? schemaProfessor : schemaPaciente),
    mode: "onBlur",
  });

  const atividadeFisica = watch("atividadeFisica");

  const onSubmit = (data) => {
    console.log("Dados validados:", { tipo: userType, ...data });
    closeModal();
    reset(); // limpa o formulário
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[900px] m-4">
        <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cadastrar novo {userType === "professor" ? "professor" : "paciente"}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Preencha os dados para concluir o cadastro.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="px-2 mb-5 flex gap-4">
              <label className="text-sm text-gray-700 dark:text-white">
                <input type="radio" value="professor" checked={userType === "professor"} onChange={() => setUserType("professor")} className="mr-2" />
                Professor
              </label>
              <label className="text-sm text-gray-700 dark:text-white">
                <input type="radio" value="paciente" checked={userType === "paciente"} onChange={() => setUserType("paciente")} className="mr-2" />
                Paciente
              </label>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 px-2">
              <div>
                <Label>Nome</Label>
                <Input {...register("nome")} />
                <p className="text-red-500 text-sm">{errors.nome?.message}</p>
              </div>

              {userType === "paciente" && (
                <div>
                  <Label>Data de nascimento</Label>
                  <Input type="date" {...register("nascimento")} />
                  <p className="text-red-500 text-sm">{errors.nascimento?.message}</p>
                </div>
              )}

              <div>
                <Label>CPF</Label>
                <Input {...register("cpf")} />
                <p className="text-red-500 text-sm">{errors.cpf?.message}</p>
              </div>

              {userType === "paciente" && (
                <>
                  <div>
                    <Label>Altura</Label>
                    <Input {...register("altura")} />
                    <p className="text-red-500 text-sm">{errors.altura?.message}</p>
                  </div>
                  <div>
                    <Label>Peso</Label>
                    <Input {...register("peso")} />
                    <p className="text-red-500 text-sm">{errors.peso?.message}</p>
                  </div>
                </>
              )}

              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <Label>Senha</Label>
                <Input type="password" {...register("senha")} />
                <p className="text-red-500 text-sm">{errors.senha?.message}</p>
              </div>

              {userType === "paciente" && (
              <>
                <div>
                  <Label>Possui alguma deficiência física?</Label>
                  <div className="flex gap-4 mt-1">
                    <label><input type="radio" value="Sim" {...register("deficiencia")} /> Sim</label>
                    <label><input type="radio" value="Não" {...register("deficiencia")} /> Não</label>
                  </div>
                  <p className="text-red-500 text-sm">{errors.deficiencia?.message}</p>
                </div>
                        
                <div>
                  <Label>Pratica atividade física?</Label>
                  <div className="flex gap-4 mt-1">
                    <label><input type="radio" value="Sim" {...register("atividadeFisica")} /> Sim</label>
                    <label><input type="radio" value="Não" {...register("atividadeFisica")} /> Não</label>
                  </div>
                  <p className="text-red-500 text-sm">{errors.atividadeFisica?.message}</p>
                </div>
                        
                {atividadeFisica === "Sim" && (
                  <div>
                    <Label>Se sim, quantas vezes na semana?</Label>
                    <Input {...register("vezesSemana")} />
                    <p className="text-red-500 text-sm">{errors.vezesSemana?.message}</p>
                  </div>
                )}
            
                <div>
                  <Label>Possui doenças cardio-respiratórias?</Label>
                  <div className="flex gap-4 mt-1">
                    <label><input type="radio" value="Sim" {...register("cardio")} /> Sim</label>
                    <label><input type="radio" value="Não" {...register("cardio")} /> Não</label>
                  </div>
                  <p className="text-red-500 text-sm">{errors.cardio?.message}</p>
                </div>
            
                <div className="lg:col-span-3">
                  <Label>Possui problemas ósseos, musculares ou em ligamentos?</Label>
                  <div className="flex gap-4 mt-1">
                    <label><input type="radio" value="Sim" {...register("osseo")} /> Sim</label>
                    <label><input type="radio" value="Não" {...register("osseo")} /> Não</label>
                  </div>
                  <p className="text-red-500 text-sm">{errors.osseo?.message}</p>
                </div>
              </>
            )}
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
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
