function nome_funcao(){
    alert("Login ou senha incorreta")
}

function somar(a, b) {
    var total = a + b;
    alert("Valor da soma: " + total)
}

function desconto(a, b) {
    var totalDesc = a - b;
    return totalDesc
    // document.write("Valor de desconto: " + totalDesc)
}

var resultDesc = desconto(7, 5);
document.write("Valor de desconto: " + resultDesc)