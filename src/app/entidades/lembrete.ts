export class Lembrete {
    constructor(
        public compromisso: string,
        public responsavel: string,
        public data: Date,
        public submitted: boolean,
        public feito: boolean
    ) { }
}