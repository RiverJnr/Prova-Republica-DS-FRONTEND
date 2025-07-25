import { Situacao } from "./situacao.enum";

export interface RateioDTO {
    id?: number;
    valor: number;
    situacao: Situacao;
    idMorador: number;
    idConta: number;
}