import "./TimeFilter.css";

export const TimeOptions = {
    P1D: "1",
    P7D: "7",
    P1M: "30",
    P3M: "120",
    P1Y: "365",
    ALL: "max",
}

const TimeFilter = ({stateChanger}) => {
    return (
        <div className="time-options-group">
        {
            Object.entries(TimeOptions).map((a, b) =>
                <button key={a[1]} className='time-option' onClick={() => stateChanger(a[1])}>{a[0]}</button>
            )
        }
        </div>
    );
}

export default TimeFilter;