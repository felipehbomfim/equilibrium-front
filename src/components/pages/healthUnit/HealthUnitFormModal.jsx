import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect } from "react";
import { api } from "@/services/apiHealthUnit";
import {toast} from "sonner";

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    address_cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
    number: yup.string().required('Número é obrigatório'),
    street: yup.string().required('Rua é obrigatória'),
    complement: yup.string(),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().required('Estado é obrigatório'),
});

export default function HealthUnitFormModal({ isOpen, onClose, onSuccess, initialData = {} }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            address_cep: '',
            number: '',
            street: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            id_address: 1,
        },
    });

    const watchCep = watch("address_cep");

    useEffect(() => {
        if (isOpen && initialData) {
            reset(initialData);
        }
    }, [isOpen]);

    useEffect(() => {
        const cleanedCep = watchCep?.replace(/\D/g, '');
        if (cleanedCep?.length === 8) {
            fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.erro) {
                        setValue('street', data.logradouro || '');
                        setValue('neighborhood', data.bairro || '');
                        setValue('city', data.localidade || '');
                        setValue('state', data.uf || '');
                    }
                })
                .catch((err) => console.error("Erro ao buscar CEP:", err));
        }
    }, [watchCep, setValue]);

    async function submitForm(data) {
        try {
            if (initialData?.id) {
                await api.updateHealthUnit(initialData.id, data);
            } else {
                await api.createHealthUnit(data);
            }
            toast.success(`Sucesso ao ${initialData?.id ? "editar" : "adicionar"} unidade de saúde.`);
            if (onSuccess) onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(`Oops! Erro ao ${initialData?.id ? "editar" : "adicionar"} unidade de saúde. Tente novamente!`);
        }
    }

    function formatCep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            {initialData?.id ? 'Editar Unidade de Saúde' : 'Cadastrar Unidade de Saúde'}
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Preencha os dados abaixo para salvar as informações.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
                        <div className="custom-scrollbar max-h-[500px] overflow-y-auto px-2 pb-3 space-y-7">
                            {/* Unidade */}
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Informações da Unidade</h5>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Nome</label>
                                    <input
                                        {...register("name")}
                                        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                                        placeholder="Nome da Unidade"
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                                </div>
                            </div>

                            {/* Endereço */}
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Endereço</h5>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">CEP</label>
                                        <input
                                            {...register("address_cep")}
                                            onChange={(e) => setValue('address_cep', formatCep(e.target.value))}
                                            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                                            placeholder="CEP"
                                        />
                                        {errors.address_cep && <span className="text-red-500 text-sm">{errors.address_cep.message}</span>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Número</label>
                                        <input {...register("number")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Número" />
                                        {errors.number && <span className="text-red-500 text-sm">{errors.number.message}</span>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Rua</label>
                                        <input {...register("street")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Rua" />
                                        {errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Complemento</label>
                                        <input {...register("complement")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Complemento" />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Bairro</label>
                                        <input {...register("neighborhood")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Bairro" />
                                        {errors.neighborhood && <span className="text-red-500 text-sm">{errors.neighborhood.message}</span>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Cidade</label>
                                        <input {...register("city")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Cidade" />
                                        {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Estado (UF)</label>
                                        <input {...register("state")} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800" placeholder="Estado" />
                                        {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <button type="button" onClick={onClose} className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Fechar</button>
                            <button type="submit" className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">Salvar</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
