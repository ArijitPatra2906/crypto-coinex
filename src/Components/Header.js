import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import {
    createTheme,
    makeStyles,
    ThemeProvider,
  } from "@material-ui/core/styles";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";

const useStyels = makeStyles(() =>({
    tittle:{
        flex:1,
        color:"gold",
        fontWeight:"bold",
        cursor:"pointer",
    }
}))

const Header = () => {

    const classes = useStyels();

    const navigate = useNavigate();

    const {currency,setCurrency} = CryptoState();

    // console.log(currency);

    const darkTheme = createTheme({
        palette: {
         primary: {
         main: "#fff",
        },
        type:"dark",
    },
});

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static' border='10px solid blue'>
        <Container>
        <Toolbar>
        
        <Typography onClick={() => navigate("/")} className={classes.tittle} variant="h6">Crypto Coinex</Typography>
        
        <Select variant='outlined' style={{width:90,height:35,marginLeft:15}} value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <MenuItem value={"USD"}>USD</MenuItem>
        <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
        </Toolbar>
        </Container>
    
    </AppBar>
    </ThemeProvider>
  )
}

export default Header;

