import React, {useState, useEffect} from 'react';

function App() {

  const [produtoId, setprodutoId] = useState(3)
  const [produtoNome, setprodutoNome] = useState('')
  const [data, setData] = useState({
    nome: "",
    preco: 249
  })

  function buscarProduto() {
    console.log("Procurar produto")
    // setprodutoId(4) // Ao citar novo valor executa novamente o userEffect
    setprodutoNome('Curso de React')
    setData({
      nome: "Curso de Node.js",
      preco: 245
    })
  }

  useEffect(() => {
    buscarProduto()
  },[produtoId])

  return (
    <div>
      <p>Listar produto</p>
      <p>{produtoNome}</p>
      <p>Preço: {data.preco}</p>
    </div>
  );
}

export default App;
