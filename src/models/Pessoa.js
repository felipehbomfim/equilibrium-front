export class Pessoa {
    constructor(nome, cpf, senha, telefone, sexo, perfil) {
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.telefone = telefone;
        this.sexo = sexo;
        this.perfil = perfil;
    }

    toJSON() {
        return {
            nome: this.nome,
            cpf: this.cpf,
            senha: this.senha,
            telefone: this.telefone,
            sexo: this.sexo,
            perfil: this.perfil
        };
    }

    static fromJSON(json) {
        return new Pessoa(
            json.nome,
            json.cpf,
            json.senha,
            json.telefone,
            json.sexo,
            json.perfil
        );
    }
} 