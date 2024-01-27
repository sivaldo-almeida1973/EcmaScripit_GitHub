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


//------------------criar calss BD----------------------------------------

class Bd {
  constructor() {
    //verificar se esta info existe
    let id = localStorage.getItem('id')

    if(id === null)  {
      localStorage.setItem('id', 0)
    }

  }
  //funcao de logica para criar novo ID
  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1

  }

  //metodo  gravar
  gravar(d) {
    //JSON.stringify converte obj literal para JSON 
   //JSON.parse converte de JSON para ob literal
   //setItem(inserir no local srorage)
   
    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(d))
    //atualizar o id
    localStorage.setItem('id' ,id )

  }
  
}
//chamar instancia da class Bd
let bd = new Bd()


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
  bd.gravar(despesa)

}









