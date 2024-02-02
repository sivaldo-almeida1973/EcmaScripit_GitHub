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
        
        //verificar se existe indices que foram removidos
        //nesse caso vamos pular esses indices
        if(despesa === null) {
          continue
        }
        //acrescenta despesa dentro do array despesas
        despesas.push(despesa)

      }

        return despesas
    }

    //criar metodo fltrar despesas----------------------------
    pesquisar(despesa) {
      let despesasFiltradas = Array()

      despesasFiltradas = this.recuperarTodosRegistros()
      
      console.log(despesa)

      console.log(despesasFiltradas)
     

      //se ano pesquisado for diferente de vazio, aplica o filter 
      if(despesa.ano != '') {
        console.log('filtro de ano')
      //aplicando filter,ano pesuisado == ao ano contido em despesa
        despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
      }
      //mes
      if(despesa.mes != '') {
        console.log('Filtro de mes')
        //aplicando filter,mes pesuisado == ao mes contido em despesa
          despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

         //dia
      if(despesa.dia != '') {
        console.log('Filtro de dia')
        //aplicando filter,dia pesuisado == ao dia contido em despesa
          despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        
         //tipo
      if(despesa.tipo != '') {
        console.log('Filtro de tipo')
        //aplicando filter,tipo pesuisado == ao tipo contido em despesa
          despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

           //descricao
      if(despesa.descricao != '') {
        console.log('Filtro de descricao')
        //aplicando filter,desc pesuisado == ao desc contido em despesa
          despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

      //valor
      if(despesa.valor != '') {
      console.log('Filtro de valor')
      //aplicando filter,valor pesuisado == ao valor contido em despesa
        despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
      }      

      console.log(despesasFiltradas)

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
       bd.gravar(despesa)

       document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
       document.getElementById('modal_titulo_div').className = 'modal-header text-success'
       document.getElementById('modal_conteudo').innerHTML = 'Despesa foi Cadastrada com sucesso!'
       document.getElementById('modal_btn').innerHTML = 'Voltar'
       document.getElementById('modal_btn').className = 'btn btn-success'
       
       //dialog de sucesso
       $('#modalRegistraDespesa').modal('show')

       //faz a limpeza dos campos de cadastrar despesas , para inserir o prox.
       ano.value = ''
       mes.value = ''
       dia.value = ''
       tipo.value = ''
       descricao.value = ''
       valor.value = ''

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
    
  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')

  //percorrer o array despesas, listando cada despesas de forma dinamica
  despesas.forEach(function(d) {
    //  console.log(d)====================================-----------

    //criando a linha (tr)
    let linha = listaDespesas.insertRow()

    //criar as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

  
    //ajustar o tipo
    switch(d.tipo) {

      case '1': d.tipo = 'Alimentação'
          break
      case '2': d.tipo = 'Educação'
          break
      case '3': d.tipo = 'Lazer'
          break
      case '4': d.tipo = 'Saúde'
          break
      case '5': d.tipo = 'Transporte'
          break
    }

    linha.insertCell(1).innerHTML = d.tipo

    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor
    
  });

}
//funcao pesquisar despesas------------------
//que aciona o metodo pesquisar do (obj bd)---------------
function pesquisarDespesa() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value


  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  bd.pesquisar(despesa)


}








