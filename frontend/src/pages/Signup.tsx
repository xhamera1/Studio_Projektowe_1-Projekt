import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {type SignupRequest, useSignup} from "../hooks/useSignup.ts";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    overflow: 'visible',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function Signup() {
    const { isAuthenticated } = useAuthenticationContext();
    const { mutate: signup, isPending } = useSignup();
    // const { login } = useContext(AuthContext);
    // const navigate = useNavigate()
    const [credentials, setCredentials] = useState<SignupRequest>({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
    });
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');

    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const firstName = document.getElementById('firstName') as HTMLInputElement;
        const lastName = document.getElementById('lastName') as HTMLInputElement;

        let isValid = true;

        if (!username.value || username.value.length < 3) {
            setUsernameError(true);
            setUsernameErrorMessage('Username must be at least 3 characters long..');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!password.value || password.value.length < 11) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 11 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!firstName.value || /\d/.test(firstName.value)) {
            setFirstNameError(true);
            setFirstNameErrorMessage('Please enter a valid first name.');
            isValid = false;
        }

        if (!lastName.value || /\d/.test(lastName.value)) {
            setLastNameError(true);
            setLastNameErrorMessage('Please enter a valid last name.');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateInputs()) {
            signup(credentials);
        }
    };

    if (isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return (

        <><CssBaseline enableColorScheme/><SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{display: 'flex', flexDirection: 'column', gap: 2}}
                >
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            required
                            fullWidth
                            id="username"
                            placeholder="username"
                            name="username"
                            autoComplete="username"
                            variant="outlined"
                            error={usernameError}
                            helperText={usernameErrorMessage}
                            onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                            color={passwordError ? 'error' : 'primary'}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            variant="outlined"
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            color={passwordError ? 'error' : 'primary'}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="email"
                            placeholder="email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            variant="outlined"
                            error={emailError}
                            helperText={emailErrorMessage}
                            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                            color={emailError ? 'error' : 'primary'}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="firstName"
                            placeholder="first name"
                            type="text"
                            id="firstName"
                            autoComplete="given-name"
                            variant="outlined"
                            error={firstNameError}
                            helperText={firstNameErrorMessage}
                            onChange={e => setCredentials({ ...credentials, firstName: e.target.value })}
                            color={firstNameError ? 'error' : 'primary'}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <TextField
                            required
                            fullWidth
                            name="lastName"
                            placeholder="last name"
                            type="text"
                            id="lastName"
                            autoComplete="family-name"
                            error={lastNameError}
                            helperText={lastNameErrorMessage}
                            onChange={e => setCredentials({ ...credentials, lastName: e.target.value })}
                            color={lastNameError ? 'error' : 'primary'}/>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {isPending ? "Signing up..." : "Sign Up"}
                    </Button>
                </Box>

                {/*{isError && (*/}
                {/*    <Alert severity="error">*/}
                {/*        Registration failed. Please check your credentials.*/}
                {/*    </Alert>*/}
                {/*)}*/}

                <Divider>
                    <Typography sx={{color: 'text.secondary'}}>or</Typography>
                </Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography sx={{textAlign: 'center'}}>
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            variant="body2"
                            sx={{alignSelf: 'center'}}
                        >
                            Log in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer></>

    );
}