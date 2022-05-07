import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiAccess from './communication/apiAccess';

const AddReview = () => {
    const { id } = useParams();
    const [text, setText] = useState('');
    const [rating, setRating] = useState('1');
    const [image, setImage] = useState([]);
    const navigate = useNavigate();

    let onTextChanged = (e) => {
        setText(e.target.value);
    }

    let onRatingChanged = (e) => {
        setRating(e.target.value);
    }

    let onImageChanged = (e) => {
        setImage(e.target.files[0]);
    }

    let OnSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", image);
        
       
        
        apiAccess.addReview(id,text,rating)
        .then(x=>{
            let review_id= x.id;
            formData.append("review_id", review_id);
            apiAccess.saveImage(formData)
            .then(x=>{ alert('Added Successfully!');
            console.log(x)});
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });  
        


    }

    return (
        <Form onSubmit={OnSubmitHandler}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Review</Form.Label>
                <Form.Control required type="text" placeholder="Review" value={text} onChange={onTextChanged} />
            </Form.Group>

            <Form.Group controlId="formBasicSelect">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select" onChange={onRatingChanged}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>


                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Add Image</Form.Label>
                <Form.Control required type="file" onChange={onImageChanged} />
            </Form.Group>

            <Button variant="primary" type="submit" >
                Submit
            </Button >

        </Form>


    )

}

export default AddReview;