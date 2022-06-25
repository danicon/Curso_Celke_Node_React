document.getElementById('exemplo-um').innerHTML = 'inserir texto exemplo 1'

function exemploDois() {
    var nomeElemento = document.getElementsByName("curso")
    console.log(nomeElemento)
}

function exemploTres() {
    var nomeTag = document.getElementsByTagName('span')
    console.log(nomeTag)
}

function exemploQuatro() {
    var nomeTagLista = document.getElementsByTagName('li')
    console.log(nomeTagLista)

}

function exemploCinco() {
    var nomeClass = document.getElementsByClassName('produto')
    console.log(nomeClass)

}