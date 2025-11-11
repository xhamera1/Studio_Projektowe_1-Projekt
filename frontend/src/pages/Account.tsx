import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Avatar} from "@mui/material";
import Card from "../components/Card.tsx"
import Divider from "@mui/material/Divider";
import {useApplicationContext} from "../contexts/ApplicationContextProvider.tsx";
import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {useQuery, useMutation} from "@tanstack/react-query";
import {authenticationService} from "../services/authenticationService.ts";
import {useNavigate} from 'react-router-dom';
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

    const {setUser} = useApplicationContext();

    const displayUser = user || fetchedUser;

    // local editable form state
    const [isEditing, setIsEditing] = React.useState(false);
    const [form, setForm] = React.useState({
        username: displayUser?.username || '',
        firstName: displayUser?.firstName || '',
        lastName: displayUser?.lastName || '',
        email: displayUser?.email || ''
    });

    React.useEffect(() => {
        if (displayUser) {
            setForm({
                username: displayUser.username,
                firstName: displayUser.firstName || '',
                lastName: displayUser.lastName || '',
                email: displayUser.email || ''
            });
        }
    }, [displayUser]);

    const navigate = useNavigate();
    const { clearAuthentication } = useAuthenticationContext();

    // mutation to update user
    const updateMutation = useMutation({
        mutationFn: (data: {originalUsername:string; body: Partial<{username:string; firstName:string; lastName:string; email:string}>}) => {
            return authenticationService.updateUser(data.originalUsername, data.body, token || undefined);
        },
        onSuccess: (updatedUser: any) => {
            // update local app context and exit edit mode
            setUser(updatedUser);
            setIsEditing(false);
        },
        onError: (err: any) => {
            console.error('Update failed', err);
            alert('Failed to update account');
        }
    });

    // mutation to delete user
    const deleteMutation = useMutation({
        mutationFn: (usernameToDelete: string) => authenticationService.deleteUser(usernameToDelete, token || undefined),
        onSuccess: () => {
            // clear auth and app user and navigate away
            clearAuthentication();
            setUser(null);
            navigate('/signup');
        },
        onError: (err:any) => {
            console.error('Delete failed', err);
            alert('Failed to delete account');
        }
    });

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
                        {displayUser?.username}
                    </Typography>
                    <TextField
                        id="firstName"
                        label="First name"
                        value={form.firstName}
                        onChange={e => setForm(prev => ({...prev, firstName: e.target.value}))}
                        InputProps={{ readOnly: !isEditing }}
                        fullWidth
                    />
                    <TextField
                        id="lastName"
                        label="Last name"
                        value={form.lastName}
                        onChange={e => setForm(prev => ({...prev, lastName: e.target.value}))}
                        InputProps={{ readOnly: !isEditing }}
                        fullWidth
                    />
                    <TextField
                        id="email"
                        label="Email"
                        value={form.email}
                        onChange={e => setForm(prev => ({...prev, email: e.target.value}))}
                        InputProps={{ readOnly: !isEditing }}
                        fullWidth
                    />
                    <Box sx={{display: 'flex', gap: 1}}>
                        {!isEditing ? (
                            <Button variant="contained" onClick={() => setIsEditing(true)}>Edit user data</Button>
                        ) : (
                            <>
                                <Button variant="contained" onClick={() => {
                                    // call update with original username
                                    const original = displayUser?.username as string;
                                    updateMutation.mutate({ originalUsername: original, body: { username: form.username, firstName: form.firstName, lastName: form.lastName, email: form.email } });
                                }} disabled={updateMutation.isLoading}>Save</Button>
                                <Button variant="outlined" onClick={() => { setIsEditing(false); setForm({ username: displayUser?.username || '', firstName: displayUser?.firstName || '', lastName: displayUser?.lastName || '', email: displayUser?.email || '' }); }}>Cancel</Button>
                            </>
                        )}
                    </Box>
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
                            <Button variant={"outlined"} color="error" onClick={() => {
                                if (!displayUser) return;
                                if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
                                deleteMutation.mutate(displayUser.username);
                            }}>Delete account</Button>
                </Stack>
            </Box>
            {isError && <Typography color="error">Failed to load account details.</Typography>}
        </Card></>
    );
}

export default Account;