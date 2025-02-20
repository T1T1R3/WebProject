import React from "react";
import { Button } from "@mui/material";

const RemoveCateg = (id_categ) => {
    
    return(
        <>
            <Button sx={{marginLeft:1}} variant="contained" color="error" onClick={() => console.log(id_categ)}>Remover</Button>
        </>
    )
}

export default RemoveCateg;