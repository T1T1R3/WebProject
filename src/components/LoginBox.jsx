import React, { useState } from "react";
import { Container, Grid2 as Grid, Box, TextField, Button, Typography, Checkbox, FormControlLabel, Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

const LoginBox = () => {
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () =>{
        try{
            const response = await axios.post('http://54.161.150.185:3000/login', {email, passw});
            setAlert({type:'success', message:'Usuário logado com sucesso!'});
            setTimeout(() =>{
                setLoading(true);
            }, 1000)
            setTimeout(() => {
                navigate('/main');
            }, 2000);
            
        }catch(err){
            console.error(err);
            setAlert({type:'error', message:'Login falhou. Verifique seu email ou senha.'})
        }
    }



    return(
        <Container maxWidth="sm">
            {loading && <FullScreenLoader />}
            {alert && (
                <Alert severity={alert.type} sx={{mb:2}}>
                    {alert.message}
                </Alert>
            )}
            <Box sx={{bgcolor:'white', width:550, height:450, borderRadius:2, display:'grid', gridTemplateRows:'1fr 3fr 1fr'}}>
                <div style={{backgroundColor:'#F5F5F5', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Typography variant="h4" color='black' fontWeight='bold'>LOGIN</Typography>
                </div>
                <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center', flexDirection:'column', gap:12}}>
                    <TextField sx={{width:450, marginTop:8}} value={email} label="Endereço de email" onChange={(e) => setEmail(e.target.value)}/>   
                    <TextField type="password" sx={{width:450}} label="Senha" value={passw} onChange={(e) => setPassw(e.target.value)}/> 
                    <FormControlLabel sx={{alignSelf:'flex-start', marginLeft:5}}
                    control={
                        <Checkbox
                        name="rememberPassword"
                        color="primary"
                        />
                    }
                    label="Lembrar senha?"
                    /> 
                </div>
                <div style={{display:'flex', justifyContent:'flex-end', alignContent:'center', marginRight:50, height:'50%'}}>
                    <Button variant="contained" onClick={() => {handleSubmit()}}>Login</Button>
                </div>
            </Box>
        </Container>
    )
}

export default LoginBox;