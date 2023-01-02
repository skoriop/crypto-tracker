import React from "react";
import "./Coin.css";

const Coin = ({
    name,
    price,
    symbol,
    marketcap,
    volume,
    image,
    priceChange
}) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="crypto" />
                    <h1>{name}</h1>
                    <p className="coin-symbol">{symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">${price}</p>
                    <p className="coin-volume">${volume.toLocaleString()}</p>
                    {
                        typeof priceChange !== "undefined" ?
                            priceChange < 0 ?
                                <p className="coin-percent red">{priceChange.toFixed(4)}%</p>
                            :
                                <p className="coin-percent green">{priceChange.toFixed(4)}%</p>
                        : <p className="coin-percent red"></p>
                    }
                    <p className="coin-marketcap">${marketcap.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default Coin;