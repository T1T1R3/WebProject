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


export default function ProductsPage(){
    const [Products, setProducts] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:3000/show-products')
        .then(response => {
            setProducts(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <Typography variant="h6">Produtos</Typography>

            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome do Produto</TableCell>
                            <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>Status</TableCell>
                            <TableCell align="center" >Código</TableCell>
                            <TableCell align="center" >Quant.</TableCell>
                            <TableCell align="center" >Tipo</TableCell>
                            <TableCell align="center" >Val. Compra</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Products.map((product) => (
                            <TableRow key={product.id_estoque}>
                                <TableCell>{product.produto}</TableCell>
                                <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>{showStatus(isActive(product.status))}</TableCell>
                                <TableCell>{product.codigo}</TableCell>
                                <TableCell align="center">{product.saldo}</TableCell>
                                <TableCell>{product.tipo}</TableCell>
                                <TableCell align="center">{product.preco_compra}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}