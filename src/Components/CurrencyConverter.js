
import axios from "axios";
import React, { useState } from "react";
import ExchangeRate from "./ExchangeRate";

const CurrencyConverter = () => {
  const currencies = ["BTC", "INR", "ETH", "USD", "XRP", "LTC", "ADA"];

  const [chosenPrimary, setChosenPrimary] = useState("INR");
  const [chosenSecondary, setChosenSecondary] = useState("BTC");
  const [amount, setAmaount] = useState(1);

  console.log(amount);

  const convert = () => {
var options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {from_currency: chosenPrimary, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondary},
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': '1deb03e983msh4b47abda3c4dc6ap1ecb66jsnca8dd1259242'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
  }
  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>

      <div>
        <table>
          <tbody>
            <tr>
              <td>primary currency</td>

              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => setAmaount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={chosenPrimary}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setChosenPrimary(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>secondery currency</td>

              <td>
                <input type="number" name="currency-amount-2" value={""} />
              </td>
              <td>
                <select
                  value={chosenSecondary}
                  name="currency-option-2"
                  className="currency-options"
                  onChange={(e) => setChosenSecondary(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <button id="buttton" onClick={convert}>CONVERT</button>
      </div>

      <ExchangeRate />
    </div>
  );
};

export default CurrencyConverter;
