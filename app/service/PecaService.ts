import axios from 'axios';
import Peca from '../core/Peca';

interface ApiResponse {
    content: Peca[];
}

const BASE_URL = 'http://localhost:8080';
export const fetchPeca = async (): Promise<Peca[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/pecas`);
        return response.data.content;
    } catch (error) {
        throw new Error('Erro ao buscar peças!');
    }
};

export const fetchPecaId = async (id: number): Promise<Peca> => {
    try {
        const response = await axios.get<Peca>(`${BASE_URL}/pecas/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar peças!');
    }
};