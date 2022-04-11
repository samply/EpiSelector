import '../App.css';
import {Link} from 'react-router-dom';

function Nav() {
    const navStyle={
        color:'white'
    };

    return (
        <nav>
            <h3>Navigation</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/mainpage'>
                    <li>Mainpage</li>
                </Link>
                <Link style={navStyle} to='/betapage'>
                    <li>Betapage</li>
                </Link>

            </ul>
        </nav>
    );
}

export default Nav;
