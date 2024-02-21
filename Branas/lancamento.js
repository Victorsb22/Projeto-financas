class Lancamento {

	constructor (categoria, tipo, valor) {
		if (valor <= 0) {
			throw new Error("Lançamento Inválido: Valor deve ser maior que zero");
		}
		if (categoria === "") {
			throw new Error("Lançamento Inválido: A Categoria é obrigatória");
		}
		this.categoria = categoria
		this.tipo = tipo
		this.valor = valor
	}
	getValorString () {
		//operador ternário
		return (this.tipo === "Despesa") ? this.valor * - 1 : this.valor;
	}
}