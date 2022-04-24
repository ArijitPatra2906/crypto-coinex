import React from 'react'
import { Container,makeStyles,Typography } from "@material-ui/core"
import Carousel from './Carousel';


const useStyles = makeStyles((theme)=>({

    banner:{
        backgroundImage: "url(https://ak.picdn.net/shutterstock/videos/31479028/thumb/1.jpg)",
    },

    bannerContent:{
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            justifyContent: "space-around",
          },

          tagline: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          },

        }
));


function Banner () {

    const classes = useStyles();
  return (
    <div className={classes.banner}>
    <Container className={classes.bannerContent}>
    <div className={classes.tagline}>

    <Typography
    variant="h4"
    style={{
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Montserrat",
    }}
  >
    Crypto Coinex
  </Typography>
  <Typography
  variant="subtitle2"
  style={{
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "Montserrat",
  }}
>
  Update yourself Regarding all crypto currency
</Typography>
    </div>

   <Carousel/>
    </Container>
    </div>
  );
}

export default Banner;
