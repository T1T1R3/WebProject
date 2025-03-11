import React, { useState } from "react";
import axios from "axios";
import { SignInPage } from "@toolpad/core";
import { Container, Alert, Checkbox, FormControlLabel, Button } from "@mui/material";
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
      const response = await axios.post('http://127.0.0.1:3000/login', { email, passw });
      const user = response.data;
      setAlert({type:'success', message:'Usuário logado com sucesso!'});
      login(user);
      navigate('/init');
    } catch (errorMessage) {
      console.error('Error: ', errorMessage);
      setAlert({type:'error', message:'Login falhou. Verifique seu email ou senha.'})
    }
  };

  const TitleLogin = ()=>{
    return <h2 style={{ marginBottom: 8 }}>Entrar</h2>;
  }

  function RememberMe() {
    return (
      <FormControlLabel
        control={
          <Checkbox
            name="tandc"
            value="true"
            color="primary"
            sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
          />
        }
        slotProps={{
          typography: {
            fontSize: 14,
          },
        }}
        color="textSecondary"
        label="Lembrar de mim"
      />
    );
  }

  function CustomButton() {
    return (
      <Button
        type="submit"
        variant="contained"
        color="info"
        disableElevation
        fullWidth
        sx={{ my: 2 }}
      >
        Login
      </Button>
    );
  }

  return (
    <Container>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: {variant:'standard', onChange: (e) => setEmail(e.target.value), value: email },
          passwordField: {label:'Senha', variant:'standard', onChange: (e) => setPassword(e.target.value), value: passw }
        }}
        slots={{
            title:TitleLogin,
            subtitle:alertBox,
            rememberMe:RememberMe,
            submitButton:CustomButton,
        }}
      />
    </Container>
  );
}
