import React from "react";
import { Zoom } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref){
    return <Zoom direction="up" ref={ref} {...props} />;
})

export default Transition;