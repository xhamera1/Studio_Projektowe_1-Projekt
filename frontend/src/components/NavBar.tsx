import { Link } from 'react-router-dom';

const NavBar = () => {
    return <nav>
            <Link to="/login">Login</Link> | <Link to="/register">Sign up</Link>
        </nav>;
}

export default NavBar;
