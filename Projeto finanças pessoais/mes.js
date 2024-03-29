class mes {
	constructor (nome) {
		this.nome = nome;
		this.saldoInicial = 0;
		this.totalizador = { saldo: 0, juros: 0, rendimentos: 0, Receitas: 0, Despesas: 0, distribuicaoDeDespesas: [] };
		this.lancamentos = [];
	}
	adicionarLancamento (lancamento) {
		this.lancamentos.push(lancamento);
	}
	calcularSaldo () {
		this.totalizador = { saldo: 0, juros: 0, rendimentos: 0, Receitas: 0, Despesas: 0, distribuicaoDeDespesas: [] };
		this.totalizador.saldo = this.saldoInicial;
		this.apurarReceitas();
		this.apurarDespesas();
		this.distribuirDespesas();
		this.apurarJuros();
		this.apurarRendimentos();
	}
	apurarReceitas () {
		for (const lancamento of this.lancamentos) {
			if (lancamento.tipo === "Receita") {
				this.totalizador.saldo += lancamento.valor;
				this.totalizador.Receitas += lancamento.valor;
			}
		}
	}
	apurarDespesas () {
		for (const lancamento of this.lancamentos) {
			if (lancamento.tipo === "Despesa") {
				this.totalizador.saldo -= lancamento.valor;
				this.totalizador.Despesas += lancamento.valor;
			}
		}
	}
	distribuirDespesas () {
		const distribuicaoDeDespesas = [];
		for (const lancamento of this.lancamentos) {
			if (lancamento.tipo === "Despesa") {
				const percentual = arredondar((lancamento.valor/this.totalizador.Despesas)*100);
				distribuicaoDeDespesas.push({ categoria: lancamento.categoria, percentual });
			}
		}
		this.totalizador.distribuicaoDeDespesas = distribuicaoDeDespesas
	}
	apurarJuros () {
		if (this.totalizador.saldo < 0) {
			this.totalizador.juros = this.calcularJuros(this.totalizador.saldo);
			this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.juros);
		}
	}
	calcularJuros (valor) {
		const juros = arredondar(valor * 0.1);
		return juros;
	}
	apurarRendimentos () {
		if (this.totalizador.saldo > 0) {
			this.totalizador.rendimentos = this.calcularRendimentos(this.totalizador.saldo);
			this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
		}
	}
	calcularRendimentos (valor) {
		const rendimentos = arredondar(valor * 0.005);
		return rendimentos;
	}
}