import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Avatar} from "@mui/material";
import Card from "../components/Card.tsx"
import Divider from "@mui/material/Divider";
import {useApplicationContext} from "../contexts/ApplicationContextProvider.tsx";
import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {authenticationService} from "../services/authenticationService.ts";
import Box from "@mui/material/Box";
import SideMenu from "../components/sidebar/SideMenu.tsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

/* Parse a JWT without extra deps: split and base64-decode the payload to read claims.
   This is used to extract the username from the token when needed. */
function parseJwtPayload(token: string) {
    try {
        const parts = token.split('.');
        if (parts.length < 2) return null;
        const payload = parts[1];
        // base64url to base64
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}


const Account = () => {
    const {user} = useApplicationContext();
    const {getTokenValue} = useAuthenticationContext();

    // If we already have a user in application context (saved after login), show it.
    // Otherwise, try to fetch by username extracted from JWT.
    const token = getTokenValue();
    const usernameFromToken = token ? (parseJwtPayload(token)?.sub || parseJwtPayload(token)?.username) : null;

    const {data: fetchedUser, isError} = useQuery(
        ['user', usernameFromToken],
        () => authenticationService.getUser(usernameFromToken as string, token || undefined),
        {
            enabled: !user && !!usernameFromToken,
            retry: false,
        }
    );

    const displayUser = user || fetchedUser;

    return (
        <><Card variant="outlined" sx={{maxWidth: 360}}>
            <SideMenu/>
            <Box sx={{p: 2}}>
                <Stack
                    direction="column"
                    sx={{justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}
                >
                    <div>
                        <Avatar src={displayUser?.avatar || '../assets/avatar.png'}
                                sx={{height: '80px', width: '80px'}}/>
                    </div>
                    <Button variant={"outlined"}>Change avatar</Button>
                    <Typography gutterBottom variant="h4" component="div">
                        {displayUser.username}
                    </Typography>

                    <TextField
                        id="outlined-read-only-input"
                        label="First name"
                        defaultValue={displayUser.firstName}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Last name"
                        defaultValue={displayUser.lastName}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Email"
                        defaultValue={displayUser.email}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Stack>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Stack
                    direction="column"
                    sx={{justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}
                >
                    <Typography gutterBottom variant="body2">
                        More data here in the future
                    </Typography>
                    <Button variant={"outlined"}>Delete account</Button>
                </Stack>
            </Box>
            {isError && <Typography color="error">Failed to load account details.</Typography>}
        </Card></>
    );
}

export default Account;