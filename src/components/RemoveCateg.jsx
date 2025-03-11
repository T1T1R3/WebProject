import React, { useEffect } from "react";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const RemoveCateg = ({categ}) => {
    const [open, setOpen] = React.useState(false);
    const [selectedCateg, setSelectedCateg] = React.useState({
        id_categoria: '',
        categoria: '',
        status: ''
    });

    const handleOpen =() => {
        setOpen(true);
        setSelectedCateg(categ);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedCateg({
            id_categoria: '',
            categoria: '',
            status: ''
        });
    }

    const handleDelete = (categ) =>{
        axios.delete('http://54.161.150.185:3000/remove-categ', {
            data:{id_categoria:categ.id_categoria}
        })
        .then(response =>{
            console.log(response);
            window.location.reload();
        })
        .catch(error =>{
            console.error('There was an error: ', error);
        });
        handleClose();
    }



    
    return(
        <>
            <Button sx={{marginLeft:1}} variant="contained" color="error" onClick={handleOpen}>Remover</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle variant="h5" fontWeight="500">Confirmação</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" fontWeight="500">Tem certeza que deseja remover "{selectedCateg.categoria}"?</Typography>
                    <div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px', gap:'10px'}}>
                        <Button>Cancelar</Button>
                        <Button variant="contained" onClick={() => handleDelete(selectedCateg)}>Remover</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default RemoveCateg;