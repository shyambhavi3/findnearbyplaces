
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';

function App() {
  return (
    <HashRouter>

    <Container fluid>

    <Row>
          <Col>
            <Header />
          </Col>
        </Row>

        <Menu/>

    <Routes>

    <Route exact path='/' element= {<Home/>}>
    

    </Route>

    <Route exact path='/register' element={<Register/>}>
    

    </Route>

    <Route exact path='/login' element={<Login/>}>
    

    </Route>





    </Routes>
    

      
    </Container>
    </HashRouter>
  );
}

export default App;
