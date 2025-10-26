import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post('/auth/signup', { name, email, password, role });
      localStorage.setItem('tm_token', res.data.token);
      localStorage.setItem('tm_user', JSON.stringify(res.data.user));
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Role dropdown */}
        <TextField
          select
          label="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        {err && <Typography color="error">{err}</Typography>}

        <Button variant="contained" onClick={submit}>
          Create account
        </Button>
        <Button onClick={() => nav('/signin')}>Already have an account?</Button>
      </Box>
    </Container>
  );
}
