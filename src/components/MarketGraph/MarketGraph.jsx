import {React, useState, useMemo, useEffect, Text} from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import "./MarketGraph.css"
import TimeFilter, { TimeOptions } from "../TimeFilter/TimeFilter";

const MarketGraph = () => {

    const [timeView, setTimeView] = useState(TimeOptions.P1M);
    const coin = useParams().coin;
    var [{ data, loading, error }] = useAxios({
        url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timeView}`,
        method: "GET",
    });

    const [about, setAbout] = useState({});
    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false")
        .then(res => {
            setAbout(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    if (typeof data === 'undefined') data = {"prices":[[1, 1]]};

    const mappedData = useMemo(() => {
        return data.prices ? data.prices.map((ele) => ({
            date: new Date(ele[0]),
            price: ele[1],
        })) : [];
    }, [data]);

    var coinData = [];
    var len = data.prices.length;
    for (var i = 0; i < len; i++)
    {
        coinData.push({
            "time": parseFloat(parseFloat(data.prices[i][0]).toFixed(4)),
            "price": parseFloat(parseFloat(data.prices[i][1]).toFixed(5)),
        });
    }
    coinData.sort((a, b) => a.time - b.time);

    if (timeView === TimeOptions.P1M || timeView === TimeOptions.P3M || timeView === TimeOptions.P1Y || timeView === TimeOptions.ALL)
    {
        for (var i = 0; i < coinData.length; i++)
        {
            var date = new Date(coinData[i].time);
            var newdate = date.toDateString().slice(3);
            if (timeView !== TimeOptions.ALL && i !== coinData.length - 1) newdate = newdate.slice(0, -5);
            coinData[i].time = newdate;
        }
    }

    return (
        <div className="market-view">
            <div className="coin-header">
                <h1>{about.name} ({about.symbol?.toUpperCase()})</h1>
            </div>
            <div className="coin-graph">
                <LineChart width={1000} height={500} data={coinData}>
                    <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" tickCount={8} domain={['auto', 'auto']} />
                    <Tooltip 
                        formatter={(value, name, props) => [`$${value}`, "Price"]} 
                        labelStyle={{color: "#afafb6", fontStyle:"italic"}}
                        contentStyle={{background: "inherit", fontStyle:"italic"}}  
                    />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                </LineChart>
            </div>
            <TimeFilter stateChanger={setTimeView} />
        </div>
    );
}

export default MarketGraph;

