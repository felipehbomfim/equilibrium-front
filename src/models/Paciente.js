import { Pessoa } from './Pessoa';

export class Paciente extends Pessoa {
    constructor(data) {
        super(data.nome, data.cpf, data.senha, data.telefone, data.sexo, 'paciente');
        this.id = data.id;
        this.cpf_paciente = data.cpf_paciente;
        this.id_endereco = data.id_endereco;
        this.data_nascimento = data.data_nascimento ? new Date(data.data_nascimento) : null;
        this.escolaridade = data.escolaridade;
        this.nivel_socio_economico = data.nivel_socio_economico;
        this.peso = parseFloat(data.peso);
        this.altura = parseFloat(data.altura);
        this.idade = data.idade;
        this.queda = Boolean(data.queda);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
            cpf_paciente: this.cpf_paciente,
            id_endereco: this.id_endereco,
            data_nascimento: this.data_nascimento?.toISOString().split('T')[0],
            escolaridade: this.escolaridade,
            nivel_socio_economico: this.nivel_socio_economico,
            peso: this.peso,
            altura: this.altura,
            idade: this.idade,
            queda: this.queda
        };
    }

    static fromJSON(json) {
        return new Paciente(json);
    }

} 