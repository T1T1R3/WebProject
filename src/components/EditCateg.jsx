import React, { useEffect } from "react";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const EditCateg = ({ categ }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCateg, setSelectedCateg] = React.useState({
    id_categoria: '',
    categoria: '',
    status: ''
  });

  const handleOpen = () => {
    setOpen(true);
    setSelectedCateg(categ);
    console.log(categ);
    console.log(selectedCateg);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSelectChange = (event) => {
    setSelectedCateg({ ...selectedCateg, status: event.target.value });
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>Editar</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h5" fontWeight="500">Editar categoria</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '10px' }}>
          <Typography variant="body1" fontWeight="500">Nome da categoria</Typography>
          <TextField sx={{ minWidth: '400px' }} value={selectedCateg.categoria}></TextField>

          <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
            <Typography variant="body1" fontWeight="500">Status</Typography>
            <FormControl>
              <Select sx={{maxWidth:'100px'}} value={selectedCateg.status} onChange={handleSelectChange}>
                <MenuItem value="ativo">Ativo</MenuItem>
                <MenuItem value="inativo">Inativo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained">Editar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCateg;
