import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import Button from "@mui/material/Button";

const NavBarLoggedIn = () => {
    const { logout } = useContext(AuthContext)
    return (
        <nav>
            <Button onClick={() => logout()}>Logout</Button>
        </nav>
    )
}

export default NavBarLoggedIn;