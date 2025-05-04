import API_URL from './api';

export const api = {
    async cadastrarPessoa(dados) {
        try {
            const response = await fetch(`${API_URL}/pessoas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            throw new Error('Erro ao cadastrar pessoa');
        }
    },

    async cadastrarPerfil(tipo, dados) {
        try {
            const response = await fetch(`${API_URL}/${tipo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao cadastrar ${tipo}`);
        }
    },

    async cadastrarEndereco(dados) {
        try {
            const response = await fetch(`${API_URL}/enderecos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao cadastrar endereço:', error);
            throw new Error('Erro ao cadastrar endereço: ' + error.message);
        }
    },

    async getPerson(cpf) {
        try {
            const response = await fetch(`${API_URL}/Person/${cpf}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar pessoa:', error);
            throw new Error('Erro ao buscar pessoa: ' + error.message);
        }
    }

}; 