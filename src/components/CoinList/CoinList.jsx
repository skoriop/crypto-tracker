import React, {useState, useEffect} from "react";
import axios from "axios";

import Coin from "../Coin/Coin";
import "./CoinList.css"

function CoinList()
{
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false")
        .then(res => {
            setCoins(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    const onChange = e => setSearch(e.target.value);

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="coin-list">
            <div className="coin-search">
                <h1 className="coin-search-text">Crypto Dashboard</h1>
                <form>
                    <input
                        className="coin-search-input"
                        type="text"
                        onChange={onChange}
                        placeholder="Search..."
                    />
                </form>
            </div>
            <Coin
                name="Name"
                price=" Price"
                marketcap=" Market Cap"
                volume=" Volume"
                image="https://clipground.com/images/blank-transparent-png-3.png"
            />
            {filteredCoins.map(coin => {
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
                    />
                );
            })}
        </div>
    );
}

export default CoinList;