import React, { useState } from "react";
import axios from "axios";
import { SignInPage } from "@toolpad/core";
import { Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [passw, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const alertBox = () =>{
    return(
        <div>
            {alert && (
            <Alert severity={alert.type} sx={{mb:2}}>
                {alert.message}
            </Alert>
            )}
        </div>
    )
  }
  

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, passw });
      setAlert({type:'success', message:'Usuário logado com sucesso!'});
      login();
      navigate('/init');
    } catch (errorMessage) {
      console.error('Error: ', errorMessage);
      setAlert({type:'error', message:'Login falhou. Verifique seu email ou senha.'})
    }
  };


  return (
    <Container>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: { onChange: (e) => setEmail(e.target.value), value: email },
          passwordField: { onChange: (e) => setPassword(e.target.value), value: passw }
        }}
        slots={{
            subtitle:alertBox
        }}
      />
    </Container>
  );
}
