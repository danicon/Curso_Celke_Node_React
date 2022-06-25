function carConteudo() {
    document.getElementById('conteudo').innerHTML = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos id ex magni laboriosam est, alias aliquid voluptate iure modi corrupti porro consequatur, similique culpa non vero aliquam illo minus sapiente.";

}

function mouseOver() {
    document.getElementById('mouseAlt').innerHTML = 'Retire o mouse'
}

function mouseOut() {
    document.getElementById('mouseAlt').innerHTML = 'Passe o mouse'

}

function converterTexto() {
    var nome = document.getElementById('nome');
   nome.value =  nome.value.toUpperCase();

}

function validarSenha() {
    var senha = document.getElementById('senha').value;

    if(senha == "" || senha.length <= 5) {
        document.getElementById("erroSenha").innerHTML = "<span style='color: #ff0000;' >Preecha o campo senha com minimo 6 caracteres </span>"
    } else {
        document.getElementById("erroSenha").innerHTML = "<span style='color: #00ff00;' >Senha valida</span>"

    }
    
}