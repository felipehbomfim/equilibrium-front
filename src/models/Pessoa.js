export class Pessoa {
    constructor(data, perfil) {
        this.cpf = data.cpf;
        this.name = data.nome;
        this.password = data.senha;
        this.phone = data.telefone;
        this.gender = data.sexo;
        this.profile = this.mapPerfil(perfil);
        this.email = data.email || null;
    }

    toJSON() {
        return {
            cpf: this.cpf,
            name: this.name,
            password: this.password,
            phone: this.phone,
            gender: this.gender,
            profile: this.profile,
            email: this.email,
        };
    }

    mapPerfil(perfil) {
        switch (perfil) {
            case 'pesquisador': return 'researcher';
            case 'profissional': return 'healthProfessional';
            default: return 'patient';
        }
    }

    static fromJSON(json) {
        return new Pessoa({
            cpf: json.cpf,
            nome: json.name,
            senha: json.password,
            telefone: json.phone,
            sexo: json.gender,
            email: json.email
        }, json.profile);
    }
}
