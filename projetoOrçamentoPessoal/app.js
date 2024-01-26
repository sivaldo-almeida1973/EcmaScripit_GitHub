function cadastrarDespesas() {//ligada ao botao index.html
  //criar uma variavel para referenciar
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')//.value
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  //recupera os dados
  console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
  // console.log(mes)
}