import React, {useState} from 'react';

function App() {

  const [nome, setNome] = useState('Daniel')

  return (
    <div>
      <p>{nome}</p>
      <button onClick={() => setNome("Daniel Alferes")}>Alterar</button>
    </div>
  );
}

export default App;
