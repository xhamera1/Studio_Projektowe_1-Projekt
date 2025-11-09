import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Alert} from "@mui/material";
import {useSignupForm} from "../../hooks/useSignupForm.ts";

const SignupForm = () => {
  const {
    credentials,
    errors,
    isPending,
    submitError,
    handleChange,
    handleSubmit,
  } = useSignupForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      {submitError && <Alert severity="error">{submitError}</Alert>}
      <TextField
        error={!!errors.username}
        helperText={errors.username}
        id="username"
        label="Username"
        type="text"
        name="username"
        autoComplete="username"
        autoFocus
        required
        fullWidth
        variant="outlined"
        value={credentials.username}
        onChange={handleChange}
      />
      <TextField
        error={!!errors.password}
        helperText={errors.password}
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        required
        fullWidth
        variant="outlined"
        value={credentials.password}
        onChange={handleChange}
      />
      <TextField
        error={!!errors.email}
        helperText={errors.email}
        name="email"
        label="Email"
        type="email"
        id="email"
        autoComplete="email"
        required
        fullWidth
        variant="outlined"
        value={credentials.email}
        onChange={handleChange}
      />
      <TextField
        error={!!errors.firstName}
        helperText={errors.firstName}
        name="firstName"
        label="First Name"
        type="text"
        id="firstName"
        autoComplete="given-name"
        required
        fullWidth
        variant="outlined"
        value={credentials.firstName}
        onChange={handleChange}
      />
      <TextField
        error={!!errors.lastName}
        helperText={errors.lastName}
        name="lastName"
        label="Last Name"
        type="text"
        id="lastName"
        autoComplete="family-name"
        required
        fullWidth
        variant="outlined"
        value={credentials.lastName}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth variant="contained" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignupForm;
