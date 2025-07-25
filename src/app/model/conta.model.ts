import { RateioDTO } from "./rateio.model";
import { Situacao } from "./situacao.enum";

export interface ContaDTO {
    id?: number;
    valor: number;
    dataVencimento: string;
    situacao: Situacao;
    observacao?: string;
    idTipo: number;
    idMoradorResponsavel: number;
    rateios: RateioDTO[];
}