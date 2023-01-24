import React, { useState, useEffect } from "react";
import axios from "axios";

import Coin from "../Coin/Coin";
import Watchlist from "../Watchlist/Watchlist";

import "./CoinList.css";

const CoinList = () => {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	const getCoins = async () => {
		let res = await axios.get(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
		);
		setCoins(res.data);
	};

	useEffect(() => {
		getCoins();
	}, []);

	const onChange = (e) => setSearch(e.target.value);

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	const [watchlist, setWatchlist] = useState([]);
	const [isWatchlistView, setWatchlistView] = useState(false);
	const addToWatchlist = (id, name, price, symbol, priceChange) => {
		const arr = watchlist;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === id) return;
		}
		arr.push({
			id: id,
			name: name,
			price: price,
			symbol: symbol,
			priceChange: priceChange,
		});
		setWatchlist(arr);
	};

	return (
		<div className="coin-list">
			<div className="coin-search">
				<h1 className="coin-search-text">Crypto Tracker</h1>
				<form>
					<input
						className="coin-search-input"
						type="text"
						onChange={onChange}
						disabled={isWatchlistView}
						placeholder="Search..."
					/>
				</form>
			</div>
			{!isWatchlistView && (
				<div>
					<button className="switch-button" onClick={() => setWatchlistView(true)}>
						Switch to Watchlist
					</button>
					<Coin
						name="Name"
						price=" Price"
						marketcap=" Market Cap"
						volume=" Volume"
						image="https://clipground.com/images/blank-transparent-png-3.png"
					/>
					{filteredCoins.map((coin) => {
						return (
							<Coin
								key={coin.id}
								id={coin.id}
								name={coin.name}
								price={coin.current_price}
								symbol={coin.symbol}
								marketcap={coin.market_cap}
								volume={coin.total_volume}
								image={coin.image}
								priceChange={coin.price_change_percentage_24h}
								addToWatchlist={addToWatchlist}
							/>
						);
					})}
				</div>
			)}
			{isWatchlistView && (
				<Watchlist list={watchlist} setList={setWatchlist} setView={setWatchlistView} />
			)}
		</div>
	);
};

export default CoinList;
