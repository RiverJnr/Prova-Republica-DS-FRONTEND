export enum Situacao {
    PENDENTE = 'PENDENTE',
    QUITADA = 'QUITADA',
    CANCELADA = 'CANCELADA',
    PAGO = 'PAGO',
    EM_ABERTO = 'EM_ABERTO'
}

export const situacaoLabels: Record<Situacao, string> = {
    [Situacao.PENDENTE]: 'Pendente',
    [Situacao.QUITADA]: 'Quitada',
    [Situacao.CANCELADA]: 'Cancelada',
    [Situacao.PAGO]: 'Pago',
    [Situacao.EM_ABERTO]: 'Em Aberto'
};  