export default class Material {
    id: number | null;
    codigo: string;
    descricao: string;
    precoTotal: number;
    diametro: number;
    dataCadastro: string;
    status: string;
    constructor(id: number | null, codigo: string, descricao: string, precoTotal: number | null, diametro: number, dataCadastro: string, status: string) {
        if (precoTotal == null) { precoTotal = 0 };
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.precoTotal = precoTotal;
        this.diametro = diametro;
        this.dataCadastro = dataCadastro;
        this.status = status;
    }

    static vazio(): Material {
        return new Material(null, "", "", 0, 0, "", "");
    }
}