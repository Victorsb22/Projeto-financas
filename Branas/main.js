
const janeiro = new mes("Janeiro");
janeiro.adicionarLancamento(new Lancamento("Salário", "Receita", 3000));
janeiro.adicionarLancamento(new Lancamento("Aluguel", "Despesa", 1000));
janeiro.adicionarLancamento(new Lancamento("Conta de Luz", "Despesa", 200));
janeiro.adicionarLancamento(new Lancamento("Conta de Água", "Despesa", 100));
const fevereiro = new mes("Fevereiro",);
fevereiro.adicionarLancamento(new Lancamento("Salário", "Receita", 3000));
fevereiro.adicionarLancamento(new Lancamento("Aluguel", "Despesa", 1200));
fevereiro.adicionarLancamento(new Lancamento("Conta de Luz", "Despesa", 250));
fevereiro.adicionarLancamento(new Lancamento("Conta de Água", "Despesa", 100));
const marco = new mes("Março",);
marco.adicionarLancamento(new Lancamento("Salário", "Receita", 4000));
marco.adicionarLancamento(new Lancamento("Aluguel", "Despesa", 1200));
marco.adicionarLancamento(new Lancamento("Conta de Luz", "Despesa", 200));
marco.adicionarLancamento(new Lancamento("Conta de Água", "Despesa", 100));
const abril = new mes("Abril");
abril.adicionarLancamento(new Lancamento("Salário", "Receita", 4000));
abril.adicionarLancamento(new Lancamento("Aluguel", "Despesa", 1200));
abril.adicionarLancamento(new Lancamento("Conta de Luz", "Despesa", 200));
abril.adicionarLancamento(new Lancamento("Conta de Água", "Despesa", 100));
const ano = new Ano();
ano.adicionarMes(janeiro);
ano.adicionarMes(fevereiro);
ano.adicionarMes(marco);
ano.adicionarMes(abril);
ano.calcularSaldo();
janeiro.adicionarLancamento(new Lancamento("Escola", "Despesa", 500));
fevereiro.adicionarLancamento(new Lancamento("Escola", "Despesa", 400));
marco.adicionarLancamento(new Lancamento("Escola", "Despesa", 500));
ano.calcularSaldo();

console.log(ano.meses);

function addElement(parent, elementType, text) {

    const element = document.createElement(elementType);
    if (text !== "" && text !== undefined && text !== null && text !== 0) {

        element.innerText = text;
    }

    parent.appendChild(element);
}

function renderizar () {
    const app = document.getElementById("app");
    if (app.firstChild) {
        app.firstChild.remove();
    }
    const painel = document.createElement("div");
    
    const cores = ["red", "yellow", "green", "blue"]
    const grafico = document.createElement("div");
    grafico.className = "grafico";
    for (const mes of ano.meses) {
        const coluna = document.createElement("div");
        coluna.classname = "grafico-coluna";
        const cor = document.createElement("div");
        cor.style.height = (mes.totalizador.saldo * 100) / 10000 + "px";
        cor.style.background = cores.pop();
        coluna.appendChild(cor);
        const nomeDoMes = document.createElement("div");
        nomeDoMes.className = "grafico-coluna-texto";
        nomeDoMes.innerText = mes.nome;
        coluna.appendChild(cor);
        coluna.appendChild(nomeDoMes);
        grafico.appendChild(coluna);
    }
    painel.appendChild(grafico);

    for (const mes of ano.meses) {
        addElement(painel, "h4", mes.nome);

        const tabelaLancamentos = new Tabela ("tabela-lancamentos");        
        tabelaLancamentos.addRow("th",["Categoria","Valor"]);
    

        for (const lancamento of mes.lancamentos) {

            tabelaLancamentos.addRow("td",[lancamento.categoria, formatarDinheiro(lancamento.getValorString())])
        }

        tabelaLancamentos.addRow ("th",["Juros", formatarDinheiro(mes.totalizador.juros)]);
        tabelaLancamentos.addRow ("th",["Rendimentos", formatarDinheiro(mes.totalizador.rendimentos)]);
        tabelaLancamentos.addRow ("th",["Total", formatarDinheiro(mes.totalizador.saldo)]);
        painel.appendChild(tabelaLancamentos.element);

    }
    app.appendChild(painel);
}

renderizar();

function adicionarLancamento() {
    const mes = document.getElementById("mes");
    const categoria = document.getElementById("categoria");
    const tipo = document.getElementById("tipo");
    const valor = document.getElementById("valor");
    ano.adicionarLancamento(mes.value, new Lancamento(categoria.value, tipo.value, parseFloat(valor.value)));
    ano.calcularSaldo();
    renderizar();
    mes.value = ano.meses[0].nome;
    categoria.value = "";
    tipo.value = "Receita";
    valor.value = "";
}

const botao = document.getElementById("botao");
botao.addEventListener("click", adicionarLancamento);

const mesSelect = document.getElementById("mes");

for (const mes of ano.meses) {
    const option = document.createElement("option");
    option.text = mes.nome;
    mesSelect.add(option);
}


