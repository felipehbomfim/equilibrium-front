import {
    Home,
    User,
    Users,
    BarChart3,
    List
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
        subItems: [
            { name: 'Listagem', path: '/users', icon: <List size={16} /> },
        ],
    },
    {
        icon: <User size={18} />,
        name: 'Perfil',
        path: '/users/profile/me',
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
