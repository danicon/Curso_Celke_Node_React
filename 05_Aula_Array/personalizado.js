var frutas = ["Abacate", "Abacaxi", "Amora", "Açai", "Cereja", "Figo"];

// Qnt de itens
console.log("Qnt de tipo de frutas: " + frutas.length)

// Aceesar item
console.log("Primeiro tipo: " + frutas[0])
console.log("Acessar um item Array: " + frutas[2])

// ultimo
console.log("Ultimo tipo: " + frutas[frutas.length-1]) 

//add item array
frutas.push("Maça");

frutas.unshift("Kiwi")

//Remover no final
frutas.pop()

//Remover no primeiro
frutas.shift();

//Remover pela posição (pos -> posicao inicial, n -> qnts) 
frutas.splice(2, 3)


// Ler array
frutas.forEach(function(item, indice, array){
    console.log(item, indice)
})

var carros = ['Voyage', 'Virtu', 'Jetta', 'A1','A2','A3',]

//add item array
carros.push("A4");

//Remover pela posição (pos -> posicao inicial, n -> qnts) 
carros.splice(2, 1)

// Ler array
carros.forEach(function(item, indice, array){
    console.log(item, indice, array)
})

