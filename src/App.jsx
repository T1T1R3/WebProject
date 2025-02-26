import React from "react";
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Chip, Button } from "@mui/material";
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "./components/AuthContext";


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
        kind:'divider',
    },
    {
        segment:'register',
        title: 'Cadastro',
        icon:<AddBoxIcon/>,
        children:[
            {
                segment:'categories',
                title:'Categorias',
                icon: <CategoryIcon/>,
            },
            {
                segment:'suppliers',
                title:'Fornecedores',
                icon: <AddShoppingCartIcon/>,
            },
            {
                segment:'products',
                title:'Produtos',
                icon: <ShoppingBasketIcon/>,
            },
            {
                segment:'requests',
                title:'Requisições',
                icon: <ReceiptIcon/>,
            },

        ]
    },
    {
        segment:'reports',
        title:'Relatórios',
        icon:<DescriptionIcon/>,
        children:[

        ]

    },
    {
        segment:'chars',
        title:'Gráficos',
        icon:<BarChartIcon/>,
    }


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

function LogoutButton(){
    const {logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () =>{
        logout();
        navigate('/');
    }

    return(
        <Button onClick={handleLogout}>Sair</Button>
    )
}

function HelloUser(){
    const {username} = useAuth();
    return <Typography fontWeight={500}>Bem-Vindo, {username}! </Typography>
}


function ToolBarItems(){

    return(
        <>
            <HelloUser/>
            <LogoutButton/>
            <ThemeSwitcher/>
        </>
    )
}

const App = () => {
    const {username} = useAuth();

    return (
        <>
            <AppProvider navigation={NavigationMenu}>
                <DashboardLayout
                slots={{
                    appTitle:AppTitleValue,
                    toolbarActions:ToolBarItems
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