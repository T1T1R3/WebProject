import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import axios from "axios";

export default function RegisterButton(){
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState(null);
    const [user, setUser] = React.useState({
        nome_usuario: '',
        email: '',
        senha: '',
        permissao:'1',
        status:'Ativo',
    });

    const handleClickOpen = () =>{
        setOpen(true);
        setAlert({type:"info", message:"Preencha os campos obrigatórios."});
    }

    const handleClose = () =>{
        setOpen(false);
        setAlert(null);
        setUser({
            nome_usuario: '',
            email: '',
            senha: '',
            permissao:'1',
            status:'Ativo',
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () =>{
        console.log(user);
        axios.post('http://54.161.150.185:3000/register', user)
            .then(response => {
                console.log(response);
                setAlert({ type: "success", message: "Usuário cadastrado com sucesso!" });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(error => {
                console.error('There was an error: ', error);
                if (error.response && error.response.status === 430) {
                    setAlert({ type: "error", message: "Email já está em uso. Tente outro email." });
                } else {
                    setAlert({ type: "error", message: "Erro ao registrar. Por favor, tente novamente." });
                }
            })
    }


    return(
        <>
            <Button onClick={handleClickOpen} variant="text" color="primary">Cadastrar</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h5" fontWeight='600' sx={{alignSelf:'center', padding:'40px'}}>Cadastro de usuário</DialogTitle>
                <DialogContent sx={{alignSelf:'center', display:'flex', flexDirection:'column', gap:'35px', padding:'48px'}}>
                    {alert && (
                        <Alert severity={alert.type} sx={{ mb: 2 }}>
                        {alert.message}
                        </Alert>
                    )}
                    <TextField name="nome_usuario" sx={{minWidth:'100px'}} variant="standard" label='Insira um nome de usuário*' onChange={handleChange} />
                    <TextField name="email" sx={{minWidth:'100px'}}  variant="standard" label='Email*' onChange={handleChange} />
                    <TextField name="senha" type="password" sx={{minWidth:'300px'}} variant="standard" label='Senha*' onChange={handleChange} />
                    <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSubmit} variant="contained">Registrar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}