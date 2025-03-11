import React from "react";
import { Typography, TextField, Container, Box, Button, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const CategReg = () =>{
    const [open, setOpen] = React.useState(false);
    const [categ, setCateg] = React.useState({
        nomeCateg: '',
        statusCateg: ''
    });
    const [selectedOption, setSelectedOption] = React.useState('');
    const handleClickOpen = () =>{ setOpen(true); }
    const handleClose = () =>{
        setOpen(false);
        setCateg({
            nomeCateg: '',
            statusCateg: ''
        })
    }

    const handleSubmit = (categ) => {
        axios.post('http://54.161.150.185:3000/add-categ', categ)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error: ', error);
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(event.target.value == "Ativo" || event.target.value == "Inativo"){
            setSelectedOption(event.target.value);
        }
        setCateg(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    return(
    <>
        <Button variant="contained" onClick={handleClickOpen}>Acrescentar categoria</Button>
        <Dialog open={open} onClose={handleClose} fullWidth sx={{display:'flex', justifyContent:'center'}}>
            <DialogTitle variant="h5" fontWeight='500' sx={{alignSelf:'flex-start'}}>Cadastro de categoria</DialogTitle>
            <DialogContent sx={{alignSelf:'flex-start', display:'flex', flexDirection:'column', gap:'10px'}}>
                <Typography variant="p" fontWeight='500'>Nome da categoria</Typography>
                    <TextField name="nomeCateg" value={categ.nomeCateg} onChange={handleChange}  sx={{minWidth:'400px'}} label='Insira o nome da categoria' />
                <Typography variant="p" fontWeight='500'>Status</Typography>        
                <FormControl sx={{minWidth:'130px'}} >
                    <Select sx={{maxWidth:'100px'}} name="statusCateg" value={categ.statusCateg} onChange={handleChange}>
                        <MenuItem value={"ativo"}>Ativo</MenuItem>
                        <MenuItem value={"inativo"}>Inativo</MenuItem>
                    </Select>
                </FormControl>
                <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                    <Button onClick={handleClose} sx={{maxWidth:'100px', marginTop:'10px'}} color="primary">Fechar</Button>
                    <Button onClick={() => handleSubmit(categ) && handleClose} sx={{maxWidth:'100px', marginTop:'10px'}} variant="contained" color="primary">Cadastrar</Button>
                </div>
            </DialogContent>
        </Dialog>
     </>
    )
}

export default CategReg;