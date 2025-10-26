import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post('/auth/signin', { email, password });
      localStorage.setItem('tm_token', res.data.token);
      localStorage.setItem('tm_user', JSON.stringify(res.data.user));
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt:10 }}>
      <Typography variant="h5" align="center" gutterBottom>Sign In</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <Typography color="error">{err}</Typography>}
        <Button variant="contained" onClick={submit}>Sign In</Button>
        <Button onClick={()=>nav('/signup')}>Create account</Button>
      </Box>
    </Container>
  );
}
