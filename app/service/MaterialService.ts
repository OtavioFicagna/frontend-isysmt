import axios from 'axios';
import Material from '../core/Material';

interface ApiResponse {
    content: Material[];
}

const BASE_URL = 'http://localhost:8080';
export const fetchMaterial = async (): Promise<Material[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/materiais`);
        return response.data.content;
    } catch (error) {
        throw new Error('Erro ao buscar materiais!');
    }
};

export const fetchMaterialId = async (id: number): Promise<Material> => {
    try {
        const response = await axios.get<Material>(`${BASE_URL}/materiais/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar material!');
    }
};