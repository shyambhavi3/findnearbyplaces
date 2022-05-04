
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Menu from './components/Menu';
import { useState } from 'react';
import AddPlace from './components/AddPlace';
import AddCategory from './components/AddCategory'

function App() {
  const [customer, setCustomer] = useState(localStorage.getItem('customer'));

  let customerLoggedInHandler = (customerEmail) => {
    localStorage.setItem('customer', customerEmail);
    setCustomer(customerEmail);
  }

  let customerLoggedOutHandler = () => {
    localStorage.removeItem('customer');
    setCustomer(undefined);

  }
  return (
    <HashRouter>

    <Container fluid>

   

        <Menu customer={customer} customerLoggedOut = {customerLoggedOutHandler}/>

    <Routes>

    <Route exact path='/' element= {<Home/>}>
    

    </Route>

    <Route exact path='/register' element={<Register/>}>
    

    </Route>

    <Route exact path='/login' element={<Login customerLoggedIn={customerLoggedInHandler} />}>
    

    </Route>

    

    <Route exact path='/addplace' element={<AddPlace  />}>
    

    </Route>

    <Route exact path='/addcategory' element={<AddCategory />}>
    

    </Route>





    </Routes>
    

      
    </Container>
    </HashRouter>
  );
}

export default App;
