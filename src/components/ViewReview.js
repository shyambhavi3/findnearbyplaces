import apiAccess from './communication/apiAccess';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const ViewReview = () => {
    const { id } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        apiAccess.getReview(id)
            .then(x => setSearchResult(x.result))
            .catch(e => {
                console.log(e);
                alert('Something went wrong.')
            })
    }, []);


   return( <Container>
        <Row xs={1} md={3} className="g-4 text-center">
            {searchResult.map((x, index) => (
                <Col key={index}>
                    <Card className="h-100">
                        <Card.Img variant="top" src={`http://localhost:4000/image/${x.photo_id}`} />
                        <Card.Body>
                            
                            <Card.Text>
                                Review: {x.text}
                                <br></br>
                                Rating: {x.rating}
                               
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>

    </Container>)
}

export default ViewReview;