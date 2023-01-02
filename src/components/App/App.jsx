import { Routes, Route } from "react-router-dom";

import './App.css';
import MarketGraph from '../MarketGraph/MarketGraph';
import CoinList from '../CoinList/CoinList';

function App() {
  return (
    <div>
       <Routes>
          <Route exact path="/" element={<CoinList />} />
          <Route path="/:coin" element={<MarketGraph />} />
        </Routes>
    </div>
  );
}

export default App;