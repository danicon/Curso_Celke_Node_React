import React from 'react';

import {Container, Header, Menu, Conteudo} from './styles';

function App() {
  return (
    <Container>
      <Header>
        <p>Logo</p>
      </Header>
      <Menu>
        Menu
      </Menu>
      <Conteudo>
        <span>Listar Usuários</span>
      </Conteudo>
    </Container>
  );
}

export default App;
