import { useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from './communication/apiAccess';


const Login = (props) => {
    const { from } = useParams();
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
        apiAccess.login(email, password)
        .then(x => {
            if(x.done) {
                props.customerLoggedIn(email);
                if(from){
                    if(from=='addplace'){
                        navigate('/addplace')
                    }else{
                        navigate('/addreview/'+from)
                    }
                }else{
                    navigate('/');
                    
                }
                    
                
            } else {
                alert('The credentials are not valid!');
            }
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });         
    }

    return (
        <Form onSubmit={onSubmitHandler}>

           
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChanged}/>            
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChanged}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign in
            </Button>
        </Form>
    );
}

export default Login;
