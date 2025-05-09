import API_URL from './api';

export const api = {
    async getEvaluations(params) {
        try {
            const response = await fetch(`${API_URL}/evaluation`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar HealthUnits:', error);
            throw error;
        }
    },
}