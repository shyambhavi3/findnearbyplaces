import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    return (

        <div>
             <Button variant="light" onClick={() => navigate("/addplace")} >Add Place</Button>

        </div>
    );
 }
 
 export default Home;