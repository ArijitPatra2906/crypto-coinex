import React from 'react'
import Banner from '../Components/Banner/Banner';
import CoinsTable from '../Components/CoinsTable';
import CurrencyConverter from '../Components/CurrencyConverter';
import News from "../Components/News";
const Homepage = () => {
  return (
    <>
    <Banner/>
    <CoinsTable/>
    <CurrencyConverter/>
    <News/>
    </>
  )
}

export default Homepage;