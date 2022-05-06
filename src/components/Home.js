import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import apiAccess from './communication/apiAccess';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


const Home = () => {
    const [search, setSearch] = useState('');
    const [radius, setRadius] = useState('null');
    const [maxResults, setMaxResults] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryVal, setCategoryVal] = useState('null');
    const [sortVal, setSortVal] = useState('null');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    let onSearchChanged = (e) => {
        setSearch(e.target.value);
    }

    let onRadiusChanged = (e) => {
        setRadius(e.target.value);

    }

    let onResultsChanged = (e) => {
        setMaxResults(e.target.value);

    }

    

    let onCategoryValChanged = (e) => {
        setCategoryVal(e.target.value);

    }

    let onSortChanged = (e) =>{
        setSortVal(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position=>{
                var latitude= position.coords.latitude ;
                var longitude= position.coords.longitude;
                let user_location = latitude +':::'+longitude;
                apiAccess.search(search, user_location, radius, maxResults, categoryVal, sortVal)
                .then(x=>{
                    setSearchResult(x);
                    console.log(x);

                })
            });
          } else {
           alert( "Geolocation is not supported by this browser.");
          }

        

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

        <div>
            <Button variant="light" onClick={() => navigate("/addplace")} >Add Place</Button>


            <Form onSubmit={onSubmitHandler}>

                <Form.Group className="mb-3" >
                    <Form.Label><h1>Search for Places</h1></Form.Label>
                    <Form.Control required type="text" placeholder="Enter a place name or category" value={search} onChange={onSearchChanged} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Maximum Results to Return</Form.Label>
                    <Form.Control required type="number" placeholder="Maximum Results to Return" value={maxResults} onChange={onResultsChanged} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Radius Search (Optional)</Form.Label>
                    <Form.Control type="number" placeholder="Radius Search" value={radius} onChange={onRadiusChanged} />
                </Form.Group>

                

                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Choose Category (Optional)</Form.Label>
                    <Form.Control as="select" onChange={onCategoryValChanged}>
                        <option value='null'></option>
                        {category.map((x) => (<option value={x.name} >{x.name}</option>))}

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicSelect">
                    <Form.Label>Sort By (Optional)</Form.Label>
                    <Form.Control as="select" onChange={onSortChanged}>
                        <option value='null'></option>
                        <option value='0'>Best Matched</option>
                        <option value='1'>Minimum Distance</option>
                        <option value='2'>Highest Rated</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Search
                </Button>

            </Form>

            <Container>
            <Row xs={1} md={3} className="g-4 text-center">
                {searchResult.map((x, index) => (
                    <Col key={index}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={`http://localhost:4000/image/${x.photo_id}`}/>
                            <Card.Body>
                                <Card.Title>{x.location_name}</Card.Title>
                                <Card.Text>
                                   Latitude: {x.latitude}
                                   <br></br>
                                   Longitude: {x.longitude}
                                   <br></br>
                                   Distance: {x.distance}
                                   <br/>
                                   Average Rating: { Math.round(x.avg * 10) / 10}
                                   <br/>
                                   Category: {x.category_name}
                                </Card.Text>
                                <Button onClick={()=>navigate('/updateplace/'+x.location_id)} >Update</Button>
                                <br></br>
                                <br></br>
                                <Button>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
        </div>

    );
}

export default Home;