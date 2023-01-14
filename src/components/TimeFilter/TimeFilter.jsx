import "./TimeFilter.css";

export const TimeOptions = {
	P1D: "1",
	P7D: "7",
	P1M: "30",
	P3M: "120",
	P1Y: "365",
	ALL: "max",
};

const TimeFilter = ({ stateChanger }) => {
	return (
		<div className="time-options">
			<br />
			<br />
			{Object.entries(TimeOptions)
				.slice(0, 3)
				.map((a, b) => (
					<button key={a[1]} onClick={() => stateChanger(a[1])}>
						{" "}
						{a[0].replace("P", "")}
					</button>
				))}
			<br />
			{Object.entries(TimeOptions)
				.slice(3)
				.map((a, b) => (
					<button key={a[1]} onClick={() => stateChanger(a[1])}>
						{" "}
						{a[0].replace("P", "")}
					</button>
				))}
		</div>
	);
};

export default TimeFilter;
