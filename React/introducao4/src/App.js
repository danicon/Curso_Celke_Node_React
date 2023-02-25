import React from 'react';

import MenuBootstrap from './components/Menu'

import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>    
      <MenuBootstrap />
      <Container>
        <Button variant="outline-success">Cadastrar</Button>
      </Container>
    </>
  );
}

export default App;
