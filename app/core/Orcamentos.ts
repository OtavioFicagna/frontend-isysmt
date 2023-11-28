import { fetchPecaId } from "../service/PecaService";
import Material from "./Material";
import Peca from "./Peca";

export default class Orcamentos {
    id: number | null;
    tempoFabricacao: number;
    precoTotal: number;
    peca: Peca | null;
    material: Material | null;
    status: string;
    constructor(id: number | null, tempoFabricacao: number | null, precoTotal: number | null, peca: Peca | null, material: Material | null, status: string) {
        if (tempoFabricacao == null) { tempoFabricacao = 0 };
        if (precoTotal == null) { precoTotal = 0 };
        this.id = id;
        this.tempoFabricacao = tempoFabricacao;
        this.precoTotal = precoTotal;
        this.peca = peca;
        this.material = material;
        this.status = status;
    }

    static vazio(): Orcamentos {
        return new Orcamentos(null, null, null, null, null, "");
    }
}