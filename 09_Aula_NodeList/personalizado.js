document.getElementById('exemplo-um').innerHTML = 'inserir texto exemplo 1'

function exemploDois() {
    var nomeElemento = document.getElementsByName("curso")
    console.log(nomeElemento)

    console.log("Tamanho do NodeList: " + nomeElemento.length)

    console.log("Elemento 0: " + nomeElemento[0]['value'])
    console.log("Elemento 1: " + nomeElemento[1]['value'])
    console.log("Elemento 2: " + nomeElemento[2]['value'])

    for(var i=0; i < nomeElemento.length; i++) {
        console.log(nomeElemento[i]['value'])

    }
}

function exemploTres() {
    var nomeTag = document.getElementsByTagName('span')
    console.log(nomeTag)

    console.log("Tamanho do NodeList: " + nomeTag.length)

    console.log("Elemento 0: " + nomeTag[0]['innerText'])
    console.log("Elemento 1: " + nomeTag[1]['innerText'])
    console.log("Elemento 2: " + nomeTag[2]['innerText'])

    for(var i=0; i < nomeTag.length; i++) {
        console.log(nomeTag[i]['innerText'])

    }
}

function exemploQuatro() {
    var nomeTagLista = document.getElementsByTagName('li')
    console.log(nomeTagLista)

    console.log("Tamanho do NodeList: " + nomeTagLista.length)

    console.log("Elemento 0: " + nomeTagLista[0]['innerHTML'])
    console.log("Elemento 1: " + nomeTagLista[1]['innerHTML'])
    console.log("Elemento 2: " + nomeTagLista[2]['innerHTML'])

    for(var i=0; i < nomeTagLista.length; i++) {
        console.log(nomeTagLista[i]['innerHTML'])

    }

}

function exemploCinco() {
    var nomeClass = document.getElementsByClassName('produto')
    console.log(nomeClass)

    console.log("Tamanho do NodeList: " + nomeClass.length)

    console.log("Elemento 0: " + nomeClass[0]['innerHTML'])
    console.log("Elemento 1: " + nomeClass[1]['innerHTML'])
    console.log("Elemento 2: " + nomeClass[2]['innerHTML'])

    for(var i=0; i < nomeClass.length; i++) {
        console.log(nomeClass[i]['innerHTML'])

    }

}