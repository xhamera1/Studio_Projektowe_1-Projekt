import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const Container = styled(Stack)(({theme}) => ({
    marginLeft: theme.spacing(30),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default Container;