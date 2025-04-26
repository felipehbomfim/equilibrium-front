const API_URL = 'http://localhost:3001';

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
    }
}; 