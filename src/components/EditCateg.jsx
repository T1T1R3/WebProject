import React from "react";
import { Button } from "@mui/material";

const EditCateg = (id_categ) => {
    return(
        <>
            <Button variant="outlined" color='black' onClick={() => console.log(id_categ)}>Editar</Button>
        </>
    )
}

export default EditCateg;