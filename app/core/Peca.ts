import Orcamentos from "./Orcamentos";

export default class Peca {
    id: number | null;
    codigo: string;
    precoTotal: number;
    diametro: number;
    comprimento: number;
    dataCadastro: string;
    status: string;
    orcamentos : Orcamentos[];
    constructor(id: number | null, codigo: string, precoTotal: number | null, diametro: number, comprimento: number, dataCadastro: string, status: string, 
        orcamentos: Orcamentos[]) {
        if (precoTotal == null) { precoTotal = 0 };
        this.id = id;
        this.codigo = codigo;
        this.precoTotal = precoTotal;
        this.diametro = diametro;
        this.comprimento = comprimento;
        this.dataCadastro = dataCadastro;
        this.status = status;
        this.orcamentos = orcamentos;
    }

    static vazio(): Peca {
        return new Peca(null, "", 0, 0, 0, "", "", []);
    }
}