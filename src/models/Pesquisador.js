export class Pesquisador {
    constructor(data) {
        this.id = data.id;
        this.nome = data.nome;
        this.cpf_pesquisador = data.cpf_pesquisador;
        this.instituicao = data.instituicao;
        this.area = data.area;
        this.especialidade = data.especialidade;
        this.email = data.email;
    }

    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            cpf_pesquisador: this.cpf_pesquisador,
            instituicao: this.instituicao,
            area: this.area,
            especialidade: this.especialidade,
            email: this.email
        };
    }

    static fromJSON(json) {
        return new Pesquisador(json);
    }
} 