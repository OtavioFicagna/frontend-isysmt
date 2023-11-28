import axios from 'axios';
import Orcamentos from '../core/Orcamentos';

interface ApiResponse {
    content: Orcamentos[];
}

const BASE_URL = 'http://localhost:8080';
export const fetchOrcamentos = async (): Promise<Orcamentos[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/orcamentos`);
        return response.data.content;
    } catch (error) {
        throw new Error('Erro ao buscar orçamentos!');
    }
};

export const createOrcamento = async (orcamentos: Orcamentos): Promise<Orcamentos> => {
    try {
        const response = await axios.post<Orcamentos>(`${BASE_URL}/orcamentos`, orcamentos);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar orçamento:", error);
        throw error;
    }
};

export const updateOrcamento = async (orcamentos: Orcamentos): Promise<Orcamentos> => {
    try {
        const response = await axios.put<Orcamentos>(
            `${BASE_URL}/orcamentos/${orcamentos.id}`, orcamentos);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar orçamento:", error);
        throw error;
    }
};

export const deleteOrcamento = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/orcamentos/${id}`);
    } catch (error) {
        console.error("Erro ao excluir orçamento:", error);
        throw error;
    }
};