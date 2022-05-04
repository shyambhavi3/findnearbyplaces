import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from './communication/apiAccess'


const Register = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    let onEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    let onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

   

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.addCustomer(email, password)
        .then(x => navigate('/login'))
        .catch(e => 
            {
                console.log(e);
                alert('Registeration failed.');
            }
            );        
    }


    return (
        <Form onSubmit={onSubmitHandler}>


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChanged}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChanged}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Register;
