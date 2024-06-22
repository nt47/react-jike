import { Link, useNavigate } from "react-router-dom";

const P404 = () => {
    const navigate = useNavigate();
    return <div>
        404 Not Found
        <br />
        {/* <Link to='/'>Back</Link> */}
        <button onClick={() => navigate('/')}>Back</button>
    </div>
}

export default P404;