import '../App.css';
import MainpageNav from "../components/MainpageNav";
import {Link} from 'react-router-dom';

function Mainpage() {
    return (
        <div className="Mainpage">
            <h1>Mainpage</h1>
            <MainpageNav/>
            <Link to='/betapage'><button>Starte Beobachtungsassistent</button></Link>
        </div>
    );
}

export default Mainpage;
