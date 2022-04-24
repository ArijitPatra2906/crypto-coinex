import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = ({coin}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);


  const { currency,symbol } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });


  const classes = useStyles();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        Popular Cryptocurrency Details
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "Profit/Loss", "Market Cap"].map((head) => (
                    <TableCell align={"center"}
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: 14,
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      
                      
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                
                .map((row) => {
                
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 5,
                      }}
                    >
                    <img
                          src={row?.image}
                          alt={row.name}
                          height="40"
                          style={{ marginLeft:0, marginBottom: 5}}
                        />
                        <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 18,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" ,fontSize: 10}}>
                          {row.name}
                        </span>
                      </div>
                        </TableCell>

                        <TableCell align="center">
                        {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        
                        </TableCell>
                        <TableCell
                          align="center"
                          justifyContent="center"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+" }
                          {row.price_change_percentage_24h.toFixed(2)}% 
                          <p style={{color:"#eee",fontSize:10,alignItems:"left"}}>in last 24hrs</p>
                        </TableCell>
                        <TableCell align="center">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -4)
                          )}
                          M
                        </TableCell>
                        
                  </TableRow>
                );
              })}
            </TableBody>
              
            </Table>
          )}
        </TableContainer>
        <Pagination
        count={(handleSearch()?.length / 10).toFixed(0)}
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          alignItems:"center",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
