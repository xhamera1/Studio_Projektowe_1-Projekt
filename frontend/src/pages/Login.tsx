import * as React from 'react';
import {useState} from 'react';
import {Link as RouterLink, Navigate} from 'react-router-dom';
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
// import Alert from '@mui/material/Alert';
import {styled} from '@mui/material/styles';
import {useAuthenticationContext} from "../contexts/AuthenticationContextProvider.tsx";
import {type LoginRequest, useLogin} from "../hooks/useLogin.ts";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
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

export default function Login() {
    // const { login } = useContext(AuthContext);
    // const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginRequest>({
        username: '',
        password: '',
    });
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const {isAuthenticated} = useAuthenticationContext();
    const {mutate: login, isPending} = useLogin();

    /* This mutation sends credentials to the backend and, on success, retrieves and stores the token. */
    // const mutation = useMutation({
    //   mutationFn: (creds: { username: string; password: string }) => loginUser(creds),
    //   onSuccess: (res) => {
    //     const token = res?.token;
    //     if (token) {
    //       login(token);
    //       navigate('/', { replace: true });
    //     }
    //   },
    // });

    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        let isValid = true;

        if (!username.value || username.value.length < 3) {
            setUsernameError(true);
            setUsernameErrorMessage('Username must be at least 3 characters long.');
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

        return isValid;
    };

    /* This handler triggers the mutation with the current input values and prevents form navigation. */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateInputs()) {
            login(credentials);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return (
        <><CssBaseline enableColorScheme/><SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            error={usernameError}
                            helperText={usernameErrorMessage}
                            id="username"
                            type="username"
                            name="username"
                            placeholder="username"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            onChange={e => setCredentials((prev) => (
                                { ...prev, username: e.target.value }))}
                            color={usernameError ? 'error' : 'primary'}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            onChange={e => setCredentials((prev) => (
                                { ...prev, password: e.target.value }))}
                            color={passwordError ? 'error' : 'primary'}/>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                    >
                        {isPending ? 'Logging in...' : 'Log in'}
                    </Button>
                </Box>

                {/*{isError && (*/}
                {/*    <Alert severity="error">*/}
                {/*        Login failed. Please check your credentials.*/}
                {/*    </Alert>*/}
                {/*)}*/}

                <Divider>or</Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography sx={{textAlign: 'center'}}>
                        Don&apos;t have an account?{' '}
                        <Link
                            component={RouterLink}
                            to="/signup"
                            variant="body2"
                            sx={{alignSelf: 'center'}}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer></>
    );
}
