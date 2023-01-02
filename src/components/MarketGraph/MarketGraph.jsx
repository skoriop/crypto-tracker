import {React, useState, useMemo} from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import "./MarketGraph.css"

export const TimeFilters = {
    P1D: "1",
    P7D: "7",
    P1M: "30",
    P3M: "120",
    P1Y: "365",
    ALL: "max",
}

function MarketGraph(props)
{
    const [timeView, setTimeView] = useState(TimeFilters.P3M);
    const coin = useParams().coin;
    var [{ data, loading, error }] = useAxios({
        url: `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timeView}`,
        method: "GET",
    });
    
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
            "price": parseFloat(parseFloat(data.prices[i][1]).toFixed(2)),
        });
    }
    coinData.sort((a, b) => a.time - b.time);

    if (timeView === TimeFilters.P1M || timeView === TimeFilters.P3M || timeView === TimeFilters.P1Y || timeView === TimeFilters.ALL)
    {
        for (var i = 0; i < coinData.length; i++)
        {
            var date = new Date(coinData[i].time);
            var newdate = date.toDateString().slice(3);
            if (i !== coinData.length - 1) newdate = newdate.slice(0, -5);
            coinData[i].time = newdate;
        }
        console.log(coinData);
    }
    console.log(props);
    return (
        <div className="market-view">
            <h1 className="coin-name">{props.name}</h1>
            <div className="coin-graph">
                <LineChart width={1000} height={500} data={coinData}>
                    <CartesianGrid stroke="#555" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                </LineChart>
            </div>
        </div>
    );
}

export default MarketGraph;

