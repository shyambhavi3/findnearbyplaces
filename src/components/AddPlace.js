import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import apiAccess from './communication/apiAccess';
//make sure logged in
//add photos
//make category required 
const AddPlace = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryVal, setCategoryVal] = useState([]);
    const navigate = useNavigate();

    let onNameChanged = (e) => {
        setName(e.target.value);
    }

    let onLatitudeChanged = (e) => {
        setLatitude(e.target.value);
    }

    let onLongitudeChanged = (e) => {
        setLongitude(e.target.value);
    }

    let onDescriptionChanged = (e) => {
        setDescription(e.target.value);
    }

    let onCategoryValChanged = (e) => {
        setCategoryVal(e.target.value);
    }




    useEffect(() => {
        apiAccess.getCategory()
            .then(x => setCategory(x.category))
            .catch(e => {
                console.log(e);
                alert('Something went wrong.')
            })
    }, []);

    return (
        <Form >


            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Name" value={name} onChange={onNameChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Latitude</Form.Label>
                <Form.Control required type="number" placeholder="Latitude" value={latitude} onChange={onLatitudeChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Longitude</Form.Label>
                <Form.Control required type="number" placeholder="Longitude" value={longitude} onChange={onLongitudeChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control required type="text" placeholder="Description" value={description} onChange={onDescriptionChanged} />
            </Form.Group>

            <Form.Select aria-label="Default select example">
                <option>Choose Category</option>
                {category.map((x) => (<option value={categoryVal} onChange={onCategoryValChanged}>{x.name}</option>))}
    
            </Form.Select>

            <Button variant="light" onClick={() => navigate("/addcategory")} >Add Category</Button>

            <br></br>

    

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

}

export default AddPlace;