import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    cpf: yup
        .string()
        .transform((value) => (value ? value.replace(/\D/g, '') : ''))
        .required('CPF é obrigatório')
        .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
    senha: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    telefone: yup.string().nullable(),
    sexo: yup.string().required('Sexo é obrigatório'),
    email: yup.string().required('E-mail é obrigatório'),
    perfil: yup.string().required('Perfil é obrigatório'),
    especialidade: yup.string().when('perfil', {
        is: (perfil) => perfil === 'pesquisador' || perfil === 'profissional',
        then: () =>
            yup.string().required('Especialidade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    instituicao: yup.string().when('perfil', {
        is: 'pesquisador',
        then: () =>
            yup.string().required('Instituição é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    area: yup.string().when('perfil', {
        is: 'pesquisador',
        then: () =>
            yup.string().required('Área é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    data_nascimento: yup.string().when('perfil', {
        is: 'paciente',
        then: () =>
            yup.string().required('Data de nascimento é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    escolaridade: yup.string().when('perfil', {
        is: 'paciente',
        then: () =>
            yup.string().required('Escolaridade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    nivel_socio_economico: yup.string().when('perfil', {
        is: 'paciente',
        then: () =>
            yup.string().required('Nível Socioeconômico é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    peso: yup.mixed().when('perfil', {
        is: 'paciente',
        then: () =>
            yup
                .number()
                .transform((value, originalValue) =>
                    originalValue === '' ? null : Number(originalValue)
                )
                .required('Peso é obrigatório')
                .min(0, 'Peso deve ser positivo'),
        otherwise: () => yup.mixed().nullable(),
    }),
    altura: yup.mixed().when('perfil', {
        is: 'paciente',
        then: () =>
            yup
                .number()
                .transform((value, originalValue) =>
                    originalValue === '' ? null : Number(originalValue)
                )
                .required('Altura é obrigatória')
                .min(0, 'Altura deve ser positiva'),
        otherwise: () => yup.mixed().nullable(),
    }),
    queda: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Histórico de queda é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),

    address_cep: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string()
            .transform((value) => (value ? value.replace(/\D/g, '') : ''))
            .required('CEP é obrigatório')
            .length(8, 'CEP deve ter 8 dígitos'),
        otherwise: () => yup.string().nullable(),
    }),
    number: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Número é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    street: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Rua é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    neighborhood: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Bairro é obrigatório'),
        otherwise: () => yup.string().nullable(),
    }),
    city: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Cidade é obrigatória'),
        otherwise: () => yup.string().nullable(),
    }),
    state: yup.string().when('perfil', {
        is: 'paciente',
        then: () => yup.string().required('Estado é obrigatório').length(2, 'Estado deve ter 2 letras'),
        otherwise: () => yup.string().nullable(),
    }),
});
