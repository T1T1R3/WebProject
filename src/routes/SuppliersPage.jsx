import { useState, useEffect } from "react";
import axios from "axios";
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


export default function SuppliersPage(){
    const [Suppliers, setSuppliers] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:3000/show-suppliers')
        .then(response => {
            setSuppliers(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <Typography variant="h6">Fornecedores</Typography>

            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Fornecedor</TableCell>
                            <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>Status</TableCell>
                            <TableCell align="center" >Email</TableCell>
                            <TableCell align="center" >CNPJ</TableCell>
                            <TableCell align="center" >Telefone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Suppliers.map((supplier) => (
                            <TableRow key={supplier.id_fornecedor}>
                                <TableCell >{supplier.nome_fornecedor}</TableCell>
                                <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>{showStatus(isActive(supplier.status))}</TableCell>
                                <TableCell align="center">{supplier.email_fornecedor}</TableCell>
                                <TableCell>{supplier.cnpj}</TableCell>
                                <TableCell>{supplier.telefone   }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}