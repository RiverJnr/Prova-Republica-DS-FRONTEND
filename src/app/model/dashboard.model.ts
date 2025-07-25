export interface GastoPorTipoDTO {
    tipo: string;
    total: number;
}

export interface GastoPorMoradorDTO {
    morador: string;
    total: number;
}

export interface ContaPendenteDTO {
    tipo: string;
    valor: number;
    dataVencimento: string;
}

export interface DashboardDTO {
    gastosPorTipo: GastoPorTipoDTO[];
    gastosPorMorador: GastoPorMoradorDTO[];
    contasPendentes: ContaPendenteDTO[];
}