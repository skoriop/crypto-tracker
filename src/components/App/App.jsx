import { Routes, Route } from "react-router-dom";

import MarketGraph from "../MarketGraph/MarketGraph";
import CoinList from "../CoinList/CoinList";

const App = () => {
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
