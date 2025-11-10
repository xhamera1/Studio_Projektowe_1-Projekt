import ListItem from "@mui/material/ListItem";
import {Link} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import SideMenu from "../../components/SideMenu.tsx";
import Container from "../../components/Container.tsx";
import NavBar from "../../components/NavBar.tsx";
import Divider from "@mui/material/Divider";

const questionnaires = [
    {text: 'Diabetes', link: 'diabetes'},
    {text: 'Habits', link: 'habits'},
    {text: 'HeartAttack', link: 'heart-attack'},
    {text: 'Stroke', link: 'stroke'}
];

const Questionnaires = () => {
    return <>
        <NavBar/>
        <SideMenu/>
        <Container>
        <h1>Make Prediction Page</h1>
        {questionnaires.map((item, index) => (
            <><ListItem key={index} disablePadding sx={{display: 'block'}}>
                <Link to={item.link}>
                    <ListItemButton selected={index === 0}>
                        <ListItemText primary={item.text}/>
                    </ListItemButton>
                </Link>
            </ListItem><Divider/></>
        ))}
    </Container>
    </>
};

export default Questionnaires;
