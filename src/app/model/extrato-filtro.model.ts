import { Situacao } from './situacao.enum';

export interface ExtratoFiltroDTO {
    inicio: string;
    fim: string;
    idMorador: number;
    situacao: Situacao | null;
}