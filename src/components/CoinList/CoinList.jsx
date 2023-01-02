import React, {useState, useEffect} from "react";
import axios from "axios";

import Coin from "../Coin/Coin";

function CoinList()
{
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(res => {
            setCoins(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    const onChange = e => setSearch(e.target.value);
    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    console.log(filteredCoins);
    return (
        <div className='coin-list'>
            <div className='coin-search'>
                <h1 className='coin-search-text'>Search a currency</h1>
                <form>
                    <input
                        className='coin-search-input'
                        type='text'
                        onChange={onChange}
                        placeholder='Search...'
                    />
                </form>
            </div>
            {filteredCoins.map(coin => {
                return (
                    <Coin
                        key={coin.id}
                        name={coin.name}
                        price={coin.current_price}
                        symbol={coin.symbol}
                        marketcap={coin.total_volume}
                        volume={coin.market_cap}
                        image={coin.image}
                        priceChange={coin.price_change_percentage_24h}
                    />
                );
            })}
        </div>
    );
}

export default CoinList;