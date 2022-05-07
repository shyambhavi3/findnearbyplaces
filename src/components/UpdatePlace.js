import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from './communication/apiAccess';

const UpdatePlace = () => {
    const { id } = useParams();
    const [name, setName] = useState(undefined);
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [category, setCategory] = useState([]);
    const [categoryVal, setCategoryVal] = useState(undefined);
    const [image, setImage] = useState([]);
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

        for (let x in category) {

            if (category[x].name === e.target.value) {
                console.log(category[x].id);
                setCategoryVal(x.id);
            }

        }

    }

    let onImageChanged = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    let OnSubmitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", image);
        let place_id = id;

        apiAccess.updatePlace(place_id, name, categoryVal, latitude, longitude, description)
            .then(x => {

                let photo_id = x.photo_id;
                formData.append("photo_id", photo_id);
                if (image != []) {
                    apiAccess.updateImage(formData)
                        .then(x => console.log(x));

                } else {
                    console.log(x);
                }

            })
            .catch(e => {
                console.log(e);
                alert('Something went wrong!');
            });
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

        <Form onSubmit={OnSubmitHandler}>
            <p>The place will not be updated if you are not the person who added it initially.</p>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" value={name} onChange={onNameChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="number" placeholder="Latitude" value={latitude} onChange={onLatitudeChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="number" placeholder="Longitude" value={longitude} onChange={onLongitudeChanged} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" value={description} onChange={onDescriptionChanged} />
            </Form.Group>

            <Form.Group controlId="formBasicSelect">
                <Form.Label>Choose Category</Form.Label>
                <Form.Control as="select" onChange={onCategoryValChanged}>
                    <option value=''></option>
                    {category.map((x) => (<option value={x.name} >{x.name}</option>))}

                </Form.Control>
            </Form.Group>

            <Button variant="light" onClick={() => navigate("/addcategory")} >Add Category</Button>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add Image</Form.Label>
                <Form.Control type="file" onChange={onImageChanged} />
            </Form.Group>

            <Button variant="primary" type="submit" >
                Submit
            </Button >


        </Form>



    )
}

export default UpdatePlace;