import {
    Home,
    User,
    Users,
    BarChart3,
    ListCheck,
    Hospital
} from 'lucide-react';

export const navItems = [
    {
        icon: <Home size={18} />,
        name: 'Home',
        path: '/home',
    },
    {
        icon: <Users size={18} />,
        name: 'Usuários',
        path: '/users',
    },
    {
        icon: <User size={18} />,
        name: 'Perfil',
        path: '/users/profile/me',
    },
    {
        icon: <ListCheck size={18} />,
        name: 'Avaliações',
        path: '/evaluations',
    },
    {
        icon: <Hospital size={18} />,
        name: 'Unidade(s) de saúde',
        path: '/healthUnit',
    },
];

export const othersItems = [
    {
        icon: <BarChart3 size={18} />,
        name: 'Exemplo',
        subItems: [
            { name: 'Exemplo sub menu', path: '/exemplo-1', pro: false },
            { name: 'Exemplo sub menu 2', path: '/exemplo-2', pro: false },
        ],
    },
];
