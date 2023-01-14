import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts";

import "./MarketGraph.css";
import TimeFilter, { TimeOptions } from "../TimeFilter/TimeFilter";

const MarketGraph = () => {
	const [timeView, setTimeView] = useState(TimeOptions.P1M);
	const coin = useParams().coin;

	var [data, setData] = useState(TimeOptions.P1M);
	useEffect(() => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timeView}`
			)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => console.log(err));
	}, [coin, timeView]);

	const [about, setAbout] = useState({});
	useEffect(() => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
			)
			.then((res) => {
				setAbout(res.data);
			})
			.catch((err) => console.log(err));
	}, [coin]);

	var coinData = [];
	var len = data.prices?.length;
	for (let i = 0; i < len; i++) {
		coinData.push({
			time: parseFloat(parseFloat(data.prices[i][0]).toFixed(4)),
			price: parseFloat(parseFloat(data.prices[i][1]).toFixed(5)),
		});
	}
	coinData.sort((a, b) => a.time - b.time);

	for (let i = 0; i < coinData.length; i++) {
		var date = new Date(coinData[i].time);
		var newdate;
		if (
			timeView === TimeOptions.P1M ||
			timeView === TimeOptions.P3M ||
			timeView === TimeOptions.P1Y ||
			timeView === TimeOptions.ALL
		) {
			newdate = date.toDateString().slice(4);
			if (timeView !== TimeOptions.ALL && i !== coinData.length - 1)
				newdate = newdate.slice(0, -5);
		} else if (timeView === TimeOptions.P1D) {
			newdate = date.toTimeString().split(" ")[0].slice(0, -3);
		} else if (timeView === TimeOptions.P7D) {
			newdate = date.toLocaleString().split(",");
			newdate =
				date.toDateString().slice(4, -5) + newdate[1].slice(0, -6);
		}
		coinData[i].time = newdate;
	}

	return (
		<div className="market-view">
			<div className="coin-header">
				<img src={about.image?.small} alt="crypto" />
				<h1 className="coin-header-text">
					{about?.name} ({about.symbol?.toUpperCase()})
				</h1>
			</div>
			<div className="graph-container">
				<div className="coin-graph">
					<LineChart width={1000} height={500} data={coinData}>
						<CartesianGrid stroke="#555" strokeDasharray="5 5" />
						<XAxis
							dataKey="time"
							tick={{ transform: "translate(0, 5)" }}
						/>
						<YAxis
							type="number"
							tickCount={8}
							domain={["auto", "auto"]}
							tick={{ transform: "translate(-5, 0)" }}
						/>
						<Tooltip
							formatter={(value, name, props) => [
								`$${value}`,
								`${
									name.charAt(0).toUpperCase() + name.slice(1)
								}`,
							]}
							labelStyle={{
								color: "#afafb6",
								fontStyle: "italic",
							}}
							contentStyle={{
								background: "inherit",
								fontStyle: "italic",
							}}
						/>
						<Line
							type="monotone"
							dataKey="price"
							stroke="#8884d8"
							dot={false}
						/>
					</LineChart>
				</div>
				<TimeFilter stateChanger={setTimeView} />
			</div>
		</div>
	);
};

export default MarketGraph;
