class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }//classe que gera o obj  despesa
}

//ligada ao botao index.html
function cadastrarDespesas() {
  //criar var para referenciar os valores dos campos
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')//.value
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

    //instancia da classe Despesa
  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value, 
    tipo.value,
    descricao.value,
    valor.value
)
//funcao que liga ao local storage
gravar(despesa)

}
//funcao que liga ao local storage
function gravar(d) {
  //converter o arquivo (despesa) para JSON para enviar ao local storage
  localStorage.setItem('despesa', JSON.stringify(d))
}

//JSON.stringify converte obj literal para JSON

//JSON.parse converte de JSON para ob literal









