import { useState, useEffect } from "react";
import axios from "axios";
import CategReg from "../components/CategReg";
import RemoveCateg from "../components/RemoveCateg";
import EditCateg from "../components/EditCateg";
import { Typography } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Box, Checkbox, Button } from "@mui/material";
import {Chip} from "@mui/material";

function isActive(value){
    if(value === "ativo"){
        return true;
    }
    else{
        return false;
    }
}

function showStatus(value){
    if(value){
        return(
            <Chip variant="outlined" label="ATIVO" color="success" />
        )
    }
    else{
        return(
            <Chip variant="outlined" label="INATIVO" color="error" />
        )
    }
}


export default function CategoriesPage(){
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        axios.get('http://54.161.150.185:3000/show-categ')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <Typography variant="h6">Categorias</Typography>
                <CategReg />
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome da Categoria</TableCell>
                            <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>Status</TableCell>
                            <TableCell align="center" >Operações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id_categoria}>
                                <TableCell>{category.categoria}</TableCell>
                                <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>{showStatus(isActive(category.status))}</TableCell>
                                <TableCell align="center">
                                    <EditCateg categ={category}/>
                                    <RemoveCateg categ={category}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}