import "./WatchlistCard.css";

const WatchlistCard = ({ id, name, price, symbol, priceChange, removeCallback }) => {
	return (
		<div className="card-container">
			<h3 className="coin-name">{name}</h3>
			<h3 className="coin-symbol">{symbol}</h3>
			<h3 className="coin-price">$ {price.toFixed(3)}</h3>
			{priceChange < 0 ? (
				<h3 className="coin-pricechange red">{priceChange} %</h3>
			) : (
				<h3 className="coin-pricechange green">{priceChange} %</h3>
			)}
			<button className="coin-watchlist-button" onClick={() => removeCallback(id)}>
				Remove from Watchlist
			</button>
		</div>
	);
};

export default WatchlistCard;
