class Despesa {//classe que gera o obj  despesa
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }
   //metodo valiadr dados--------------------------------------
   //percorrer cada um dos elementos do metodo despesa
   validarDados() {
      for(let i in this) {
        if(this[i] == undefined || this[i] == '' || this[i] == null) {
        return false
      }
      
   }
   //se estiver todos preechidos 
    return true
   }
}


//------------------criar class BD----------------------------

class Bd {
    constructor() {
      //logica para recuperar o primeiro id(0)
      let id = localStorage.getItem('id')

      if(id === null)  {
        //recuperar um dado(set) do local storage
        localStorage.setItem('id', 0)
      }
    }
    //funcao para atualizar novo ID
    getProximoId() {
      let proximoId = localStorage.getItem('id')
      return parseInt(proximoId) + 1

    }

    gravar(d) {    
      let id = this.getProximoId()
      //atualizar o id no local storage
      localStorage.setItem(id, JSON.stringify(d))
      localStorage.setItem('id' ,id )

    }
   
    recuperarTodosRegistros() {
      //array de despesas
      //a cada intera vou pegar a despesa no local storage
      let despesas = Array()

      let id = localStorage.getItem('id')
       //vai recuperar todas as despesas em local cadastradas storage
      for(let i = 1; i <= id ; i++) {
        //recuperar a desepesa(e converter para obj literal)
        let despesa = JSON.parse(localStorage.getItem(i))
        
        //se existe existe removidos
        //pular esses indices
        if(despesa === null) {
          continue
        }

        despesas.push(despesa)

      }

        return despesas
    }
  
}
//chamar instancia da class Bd------------------------------------
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

     //chamada o obj da classe bd
    if(despesa.validarDados()) {//se os dados forem validos
       //bd.gravar(despesa)

       document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
       document.getElementById('modal_titulo_div').className = 'modal-header text-success'
       document.getElementById('modal_conteudo').innerHTML = 'Despesa foi Cadastrada com sucesso!'
       document.getElementById('modal_btn').innerHTML = 'Voltar'
       document.getElementById('modal_btn').className = 'btn btn-success'
       
       //dialog de sucesso
       $('#modalRegistraDespesa').modal('show')
    }else {

      //dialog de erro
      document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!'
      document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
      document.getElementById('modal_conteudo').innerHTML = 'Erro de gravação, verifique se todos os compos foram preenchidos corretamente!'
      document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
      document.getElementById('modal_btn').className = 'btn btn-danger'

      $('#modalRegistraDespesa').modal('show')

    }
}

//---------onload="carregaListaDsepesas()" no body-------------------------------------
function carregaListaDespesas() {
  let despesas = Array()

  despesas =  bd.recuperarTodosRegistros()

  console.log(despesas)
}








