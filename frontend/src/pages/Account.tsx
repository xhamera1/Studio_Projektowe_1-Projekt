import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NavBar from "../components/NavBar.tsx";
import {Avatar} from "@mui/material";
import Card from "../components/Card.tsx"
import Divider from "@mui/material/Divider";
import {useApplicationContext} from "../contexts/ApplicationContextProvider.tsx";
import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {useQuery} from "@tanstack/react-query";
import {authenticationService} from "../services/authentificationService.ts";
import Box from "@mui/material/Box";
import SideMenu from "../components/SideMenu.tsx";

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


// const Account = () => {
//     const {user} = useApplicationContext();
//     const {getTokenValue} = useAuthenticationContext();
//
//     // If we already have a user in application context (saved after login), show it.
//     // Otherwise, try to fetch by username extracted from JWT.
//     const token = getTokenValue();
//     const usernameFromToken = token ? (parseJwtPayload(token)?.sub || parseJwtPayload(token)?.username) : null;
//
//     const {data: fetchedUser, isLoading, isError} = useQuery(
//         ['user', usernameFromToken],
//         () => authenticationService.getUser(usernameFromToken as string, token || undefined),
//         {
//             enabled: !user && !!usernameFromToken,
//             retry: false,
//         }
//     );
//
//     const displayUser = user || fetchedUser;
//
//     return (
//         <><NavBar/><Stack spacing={8}>
//             <div>
//                 <Typography variant="h4">Account</Typography>
//             </div>
//             <Grid container spacing={3}>
//                 <Grid
//                     size={{
//                         lg: 4,
//                         md: 6,
//                         xs: 12,
//                     }}
//                 >
//                     <Card>
//                         <CardContent>
//                             <Stack spacing={2} sx={{alignItems: 'center'}}>
//                                 <div>
//                                     <Avatar src={displayUser?.avatar || '../assets/avatar.png'}
//                                             sx={{height: '80px', width: '80px'}}/>
//                                 </div>
//                                 <Stack spacing={2} sx={{textAlign: 'center'}}>
//                                     <Typography color="text.secondary"
//                                                 variant="body2">{displayUser.username}</Typography>
//                                     <Typography
//                                         variant="h5">{displayUser ? `${displayUser.firstName} ${displayUser.lastName}` : (isLoading ? 'Loading...' : 'Unknown user')}</Typography>
//                                     <Typography color="text.secondary" variant="body2">{displayUser.email}</Typography>
//                                 </Stack>
//                             </Stack>
//                         </CardContent>
//                         <Divider/>
//                     </Card>
//                 </Grid>
//                 <Grid
//                     size={{
//                         lg: 8,
//                         md: 6,
//                         xs: 12,
//                     }}
//                 >
//                     {/* Account details / edit form could go here */}
//                 </Grid>
//             </Grid>
//             {isError && <Typography color="error">Failed to load account details.</Typography>}
//         </Stack></>
//     );
// }

const Account = () => {
    const {user} = useApplicationContext();
    const {getTokenValue} = useAuthenticationContext();

    // If we already have a user in application context (saved after login), show it.
    // Otherwise, try to fetch by username extracted from JWT.
    const token = getTokenValue();
    const usernameFromToken = token ? (parseJwtPayload(token)?.sub || parseJwtPayload(token)?.username) : null;

    const {data: fetchedUser, isLoading, isError} = useQuery(
        ['user', usernameFromToken],
        () => authenticationService.getUser(usernameFromToken as string, token || undefined),
        {
            enabled: !user && !!usernameFromToken,
            retry: false,
        }
    );

    const displayUser = user || fetchedUser;

    return (
        <><NavBar/><Card variant="outlined" sx={{maxWidth: 360}}>
            <SideMenu/>
            <Box sx={{p: 2}}>
                <Stack
                    direction="column"
                    sx={{justifyContent: 'space-between', alignItems: 'center'}}
                >
                    <div>
                        <Avatar src={displayUser?.avatar || '../assets/avatar.png'}
                                sx={{height: '80px', width: '80px'}}/>
                    </div>
                    <Typography gutterBottom variant="h4" component="div">
                        {displayUser.username}
                    </Typography>

                    <Typography
                        variant="h5">{displayUser ? `${displayUser.firstName} ${displayUser.lastName}` : (isLoading ? 'Loading...' : 'Unknown user')}</Typography>
                    <Typography color="text.secondary" variant="body2">{displayUser.email}</Typography>
                </Stack>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Typography gutterBottom variant="body2">
                    More data here in the future
                </Typography>
            </Box>
            {isError && <Typography color="error">Failed to load account details.</Typography>}
        </Card></>
    );
}

export default Account;