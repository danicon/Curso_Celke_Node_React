var cadeira = {
    cor: "Preta",
    altura: 118,
    largura: 74,
    profundidade: 64
};

document.write("Cor da cadeira: " + cadeira.cor + "<br>" )
document.write("Altura da cadeira: " + cadeira.altura + "<br><br>" )

cadeira.cor = "Branca";
document.write("Cor da cadeira: " + cadeira.cor + "<br><br>" )

cadeira.peso = 17;
document.write("Peso da cadeira: " + cadeira.peso + "<br><br>" )

document.write("Profundidade da cadeira: " + cadeira.profundidade + "<br>" )
delete cadeira.profundidade;
document.write("Profundidade da cadeira: " + cadeira.profundidade + "<br><hr>" )

var mesa = new Object();
mesa.cor = "Preta";
mesa.largura = 220;

document.write("Cor da mesa: " + mesa.cor + "<br>" )
document.write("Largura da mesa: " + mesa.largura + "cm<br>" )
