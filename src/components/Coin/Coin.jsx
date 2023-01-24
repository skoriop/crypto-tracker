import React from "react";
import { Link } from "react-router-dom";

import "./Coin.css";

const Coin = ({
	id,
	name,
	price,
	symbol,
	marketcap,
	volume,
	image,
	priceChange,
	addToWatchlist,
}) => {
	return (
		<div className="coin-container">
			<div className="coin-row">
				<div className="coin">
					<img src={image} alt="" />
					<h1>{id === undefined ? name : <Link to={`/${id}`}>{name}</Link>}</h1>
					<p className="coin-symbol">{symbol}</p>
				</div>
				<div className="coin-data">
					<p className="coin-price">${price}</p>
					<p className="coin-volume">${volume.toLocaleString()}</p>
					{typeof priceChange !== "undefined" ? (
						priceChange < 0 ? (
							<p className="coin-percent red">{priceChange.toFixed(4)}%</p>
						) : (
							<p className="coin-percent green">{priceChange.toFixed(4)}%</p>
						)
					) : (
						<p className="coin-percent red"></p>
					)}
					<p className="coin-marketcap">${marketcap.toLocaleString()}</p>
					{id !== undefined && (
						<button
							className="coin-watchlist-button"
							onClick={() => addToWatchlist(id, name, price, symbol, priceChange)}
						>
							Add to Watchlist
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Coin;
