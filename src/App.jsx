import React from "react";
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Chip } from "@mui/material";
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import BugReportIcon from '@mui/icons-material/BugReport';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet } from 'react-router-dom';


const NavigationMenu = [
    {
        kind:'header',
        title:'Menu',
    },
    {
        segment:'init',
        title: 'Página inicial',
        icon: <DashboardIcon/>,
    },
    {
        segment:'categories',
        title:'Categorias',
        icon: <BugReportIcon/>,
    },


]

function AppTitleValue(){
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}>
            <InventoryIcon color="primary"/>
            <Typography variant="h6" fontWeight='700'>
                Sistema de Gestão
            </Typography>
            <Chip size="small" label="BETA" color="info" />
        </div>
    )
}

const App = () => {
    return (
        <>
            <AppProvider navigation={NavigationMenu}>
                <DashboardLayout
                slots={{
                    appTitle:AppTitleValue
                }}
                >
                    <PageContainer>
                        <Outlet/>
                    </PageContainer>
                </DashboardLayout>
            </AppProvider>
        </>
    );
};

export default App;