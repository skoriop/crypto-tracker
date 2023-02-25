import WatchlistCard from "../WatchlistCard/WatchlistCard";

import "./Watchlist.css";

const Watchlist = ({ list, setList, setView }) => {
	const removeCallback = (id) => {
		let arr = [];
		for (let i = 0; i < list.length; i++) {
			if (list[i].id !== id) arr.push(list[i]);
		}
		setList(arr);
	};

	return (
		<div className="watchlist-container">
			<h1 className="watchlist-title">Watchlist</h1>
			<button className="switch-button" onClick={() => setView(false)}>
				Switch Back
			</button>
			{list.map((coin) => (
				<WatchlistCard
					key={coin.id}
					id={coin.id}
					name={coin.name}
					price={coin.price}
					symbol={coin.symbol}
					priceChange={coin.priceChange}
					removeCallback={removeCallback}
				/>
			))}
		</div>
	);
};

export default Watchlist;
