import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from './communication/apiAccess';



const AddCategory = ()=>{
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

  

    let onCategoryChanged = (e) => {
        setCategory(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.addCategory(category)
        .then(x => {
            navigate('/addplace')
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });         
    }

    return (
        <Form onSubmit={onSubmitHandler}>

           
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Category name</Form.Label>
                <Form.Control  required type="text" placeholder="Category name" value={category} onChange={onCategoryChanged}/>            
            </Form.Group>

        

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddCategory;