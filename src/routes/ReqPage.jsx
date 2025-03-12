import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse, Box, Checkbox, Button } from "@mui/material";
import {Chip} from "@mui/material";

function showStatus(value){
    if(value === "Em Aprovação"){
        return(
            <Chip variant="outlined" label="EM APROVAÇÃO" color="warning" />
        )
    }
    else if(value === "Aprovada"){
        return(
            <Chip variant="outlined" label="APROVADO" color="success" />
        )
    }
    else{
        return(
            <Chip variant="outlined" label="REPROVADO" color="error" />
        )
    }
}


export default function ReqPage(){
    const [Req, setReq] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:3000/show-requisitions')
        .then(response => {
            setReq(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }, [])

    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                <Typography variant="h6">Requisições</Typography>

            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >Cód. Produto</TableCell>
                            <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>Status</TableCell>
                            <TableCell align="center" >Qtd.</TableCell>
                            <TableCell align="center" >Valor</TableCell>
                            <TableCell align="center" >Tipo</TableCell>
                            <TableCell align="center" >Requerente</TableCell>
                            <TableCell align="center" >Aprovador</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Req.map((requisition) => (
                            <TableRow key={requisition.idrm}>
                                <TableCell align="center">{requisition.cod_produto}</TableCell>
                                <TableCell align="center" sx={{maxWidth:'200px', minWidth:'200px'}}>{showStatus(requisition.situacao)}</TableCell>
                                <TableCell align="center">{requisition.qtde}</TableCell>
                                <TableCell align="center">{requisition.valor}</TableCell>
                                <TableCell align="center">{requisition.tipo}</TableCell>
                                <TableCell align="center">{requisition.user_requisicao}</TableCell>
                                <TableCell align="center">{requisition.user_aprovador}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}