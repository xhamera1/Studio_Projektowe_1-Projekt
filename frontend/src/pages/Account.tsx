// const Account = () => {
//   return <h1>Account Page</h1>;
// };
//
// export default Account;

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NavBar from "../components/NavBar.tsx";
import { Avatar, Card, CardContent } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useQuery } from "@tanstack/react-query";
import { authenticationService } from "../services/authentificationService.ts";

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
    const { user } = useApplicationContext();
    const { getTokenValue } = useAuthenticationContext();

    // If we already have a user in application context (saved after login), show it.
    // Otherwise, try to fetch by username extracted from JWT.
    const token = getTokenValue();
    const usernameFromToken = token ? (parseJwtPayload(token)?.sub || parseJwtPayload(token)?.username) : null;

    const { data: fetchedUser, isLoading, isError } = useQuery(
        ['user', usernameFromToken],
        () => authenticationService.getUser(usernameFromToken as string, token || undefined),
        {
            enabled: !user && !!usernameFromToken,
            retry: false,
        }
    );

    const displayUser = user || fetchedUser;

    return (
        <><NavBar /><Stack spacing={8}>
            <div>
                <Typography variant="h4">Account</Typography>
            </div>
            <Grid container spacing={3}>
                <Grid
                    size={{
                        lg: 4,
                        md: 6,
                        xs: 12,
                    }}
                >
                    <Card>
                        <CardContent>
                            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                                <div>
                                    <Avatar src={displayUser?.avatar || '../assets/avatar.png'} sx={{ height: '80px', width: '80px' }} />
                                </div>
                                <Stack spacing={2} sx={{ textAlign: 'center' }}>
                                    <Typography color="text.secondary" variant="body2">{displayUser.username}</Typography>
                                    <Typography variant="h5">{displayUser ? `${displayUser.firstName} ${displayUser.lastName}` : (isLoading ? 'Loading...' : 'Unknown user')}</Typography>
                                    <Typography color="text.secondary" variant="body2">{displayUser.email}</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                        <Divider />
                    </Card>
                </Grid>
                <Grid
                    size={{
                        lg: 8,
                        md: 6,
                        xs: 12,
                    }}
                >
                    {/* Account details / edit form could go here */}
                </Grid>
            </Grid>
            {isError && <Typography color="error">Failed to load account details.</Typography>}
        </Stack></>
    );
}

export default Account;